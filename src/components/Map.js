import React, { useState, useEffect, Component, useRef, createRef} from 'react';
import { Alert, Platform, StyleSheet, Text, View, Dimensions } from 'react-native';
import {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import firebase from '../firebase';
import { MaterialCommunityIcons, Feather, FontAwesome5, Entypo } from '@expo/vector-icons';

const {width, height} = Dimensions.get('window')

export default class Map extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: 45.559797,
        longitude: -117.939148,
        latitudeDelta: 20,
        longitudeDelta: 10
      },
      tempCoordinate: {},
    }
    this.dbRef = firebase.firestore().collection('markers');
    this.storageRef = firebase.storage();
    this.markerArray = [];
    this.imageURLArray = [];
    this.user = firebase.auth().currentUser;
    this.users = firebase.firestore().collection('users');
  }

  componentDidMount() {
    this.getMarkers()
    this.getImages()
    console.log(this.markerArray)
  }

  componentWillUnmount() {
    this.setState({})
  }

  getMarkers = async () => {
    this.dbRef.get()
      .then(snapshot => {
          snapshot.docs.forEach(marker => {
            if (!this.markerArray.includes(marker.id)) {
              let appObj = { ...marker.data(), ['id']: marker.id }
              this.markerArray.push(appObj)
            }
        })
      this.setState({markerArray: this.markerArray})
    })
  }

  //saves image URLs to an array for use in other areas
  getImages = async () => {
    this.storageRef.ref().listAll().then((result) => {
      result.items.forEach((imageRef) => {
        imageRef.getDownloadURL().then((url) => {
          this.imageURLArray.push({id: imageRef._delegate._location.path_.slice(0, -4), URL: url})
        })
      })
      this.setState({imageURLArray: this.imageURLArray})
    })
  }

  handlePress = (event) => {
    const user = firebase.auth().currentUser;
    if (user) {
      this.props.setTempCoordinate(event.nativeEvent.coordinate)

      Alert.alert(
        "New Swim?",
        "Add a new swim?",
        [
          {
            text: 'Add New Swim',
            onPress: this.props.showReusableForm
          },
          {
            text: 'Cancel',
            style: 'cancel'
          }
        ]
      )
    }
  }

  markerPress = async (event) => {
    const coord = event.nativeEvent.coordinate.latitude
    this.props.selectedMarker.shift()
    this.dbRef.get()
      .then(snapshot => {
        snapshot.docs.forEach(marker => {
          // if (marker._delegate._document.data.value.mapValue.fields.coordinate.mapValue.fields.latitude['doubleValue'] == coord) {
          if (marker.data().coordinate.latitude == coord) {
            this.props.selectedMarker.push(marker.id)
            this.props.showMarkerDetail()
          }
        })
      })
    }

  render() {
    return (
      <MapView
        style={{ flex: 1}}
        //provider={PROVIDER_GOOGLE}
        showsUserLocation
        followUserLocation={true}
        initialRegion = {this.state.region}
        radius={20}
        extent={200}
        mapType={'standard'}
        clusterColor={'steelblue'}
        customMapStyle={mapStyle}
        onLongPress={this.handlePress}
        onMarkerPress={this.markerPress}
        >
          {this.markerArray.map((marker, index) => (
            <Marker 
            key={index}
            tracksViewChanges={false}
            coordinate={marker.coordinate}
            title={marker.title}
            onLongPress={this.markerPress}
            >
            {marker.type == 'Hot Spring' ? <MaterialCommunityIcons
              name="hot-tub"
              size={42}
              color="orangered"
            /> : null}
            {marker.type == 'Pool' ? <FontAwesome5
              name="swimming-pool"
              size={42}
              color="turquoise"
            /> : null}
            {marker.type == 'Lake' ? <MaterialCommunityIcons
              name="water"
              size={42}
              color="blue"
            /> : null}
            {marker.type == 'River' ? <Entypo
              name="air"
              size={42}
              color="darkcyan"
            /> : null}
            {marker.type == 'Other' ? <FontAwesome5
              name="water"
              size={42}
              color="dodgerblue"
            /> : null}
            {marker.type == '' ? <FontAwesome5
              name="water"
              size={42}
              color="dodgerblue"
            /> : null}
            </Marker>
          ))}
      </MapView>
    );
  }
}

const mapStyle = [
  {
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "simplified",
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "stylers": [
      {
        "weight": "1"
      }
    ]
  },
  {
    "featureType": "road",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },

  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#73BFFB"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#7392FB",
      }
    ]
  }
]