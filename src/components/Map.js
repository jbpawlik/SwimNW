import React, { useState, useEffect, Component } from 'react';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';
import {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import firebase from '../firebase';

export default class MapScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: 45.5,
        longitude: -122.675,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      },
      tempCoordinate: {}
    }
    this.dbRef = firebase.firestore().collection('markers');
    this.markerArray = [];
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
    // this.setState({tempCoordinate: event.nativeEvent.coordinate})
    // this.getTempCoordinate(event.nativeEvent.coordinate)
    this.props.setTempCoordinate(event.nativeEvent.coordinate)

    Alert.alert(
      "New Swim?",
      "Add a new swim?",
      [
        {
          text: 'Add New Swim',
          // onPress: () => this.props.navigation.navigate('Add Swim')
          // onPress: () => this.props.goToNewMarkerScreen()
          onPress: this.props.showReusableForm
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    )
  }

  render() {
    if (this.markerArray.length <= 1) {
      this.getMarkers()
    }
    return (
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followUserLocation={true}
        initialRegion = {this.state.region}
        radius={20}
        extent={200}
        clusterColor={'steelblue'}
        // initialRegion={{
        // latitude: 45.5,
        // longitude: -122.675,
        // latitudeDelta: 0.1,
        // longitudeDelta: 0.1}}
        customMapStyle={mapStyle}
        onLongPress={this.handlePress}
        >
          {this.markerArray.map((marker, index) => (
            <Marker 
            key={index}
            tracksViewChanges={false}
            coordinate={marker.coordinate}
            title={marker.title}
            />
          ))}
      </MapView>
    );
  }
}

const mapStyle = [
    {
        "featureType": "administrative.country",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "hue": "#ff0000"
            }
        ]
    }
]