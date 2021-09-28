import React, { useState, useEffect, Component, useRef, createRef } from 'react';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';
import {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import firebase from '../firebase';

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
      dataSource: []
    }
    this.dbRef = firebase.firestore().collection('markers');
    this.markerArray = [];
    this.user = firebase.auth().currentUser;
  }

  componentDidMount() {
    this.getMarkers()
  }


  getMarkers = async () => {
    this.dbRef.get()
        .then(snapshot => {
            snapshot.docs.forEach(marker => {
              if (!this.markerArray.includes(marker.id)) {
                let currentID = marker.id
                let appObj = { ...marker.data(), ['id']: currentID }
                this.markerArray.push(appObj)
                // Was generating duplicate information
                // this.markerArray.push(marker.data())
              }
        })
        this.setState({markerArray: this.markerArray})
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

  markerPress = (event) => {
    const user = firebase.auth().currentUser;
    const coord = event.nativeEvent.coordinate.latitude
    this.props.selectedMarker.shift()
    this.dbRef.get()
      .then(snapshot => {
        snapshot.docs.forEach(marker => {
          if (marker._delegate._document.data.value.mapValue.fields.coordinate.mapValue.fields.latitude['doubleValue'] == coord) {
            const markerID = marker._delegate._document.key.path.segments[6]
            this.props.selectedMarker.push(markerID)
            this.props.showMarkerDetail() 
          }
        })
      })
    }

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
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
            />
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