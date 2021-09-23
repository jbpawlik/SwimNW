import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import Marker from './Marker';
import Markers from './Markers';

export default class Map extends Component {

  
  state = {
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

  render() {
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
           {this.state.markers.map((marker, index) => (
           <Marker
           key={index}
          coordinate={marker.coordinate}
          title={marker.name}
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