import React, { useState, useEffect, Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import Marker from './Marker';
import Markers from './Markers';
import firebase from '../firebase';

export default class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      markers:
      [
        {
          coordinate: {
            latitude: 45.5,
            longitude: -122.675
          },
          title: 'Test',
          description: 'Test'
        }
      ],
      region: {
        latitude: 45.5,
        longitude: -122.675,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1}
    }
    this.dbRef = firebase.firestore().collection('markers');
    this.markerArray = []
  }

  // getMarkers = () => {
  //   return this.dbRef
  // } 

  getMarkers = () => {
        this.dbRef.get()
            .then(snapshot => {
                snapshot.docs.forEach(marker => {
                    let currentID = marker.id
                    let appObj = { ...marker.data(), ['id']: currentID }
                    this.markerArray.push(appObj)
                    this.markerArray.push(marker.data())
            })
           console.log(this.markerArray)
        })
  }

  render() {
    const markers = this.getMarkers();
    console.log(this.markerArray)
    return (
      <MapView
         style={{ flex: 1 }}
         provider={PROVIDER_GOOGLE}
         showsUserLocation
         followUserLocation={true}
         initialRegion={{
         latitude: 45.5,
         longitude: -122.675,
         latitudeDelta: 0.1,
         longitudeDelta: 0.1}}
         customMapStyle={mapStyle}
         >
           {this.markerArray.map((marker, index) => (
           <Marker
           key={index}
          latitude={marker.latitude}
          longitude={marker.longitude}
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