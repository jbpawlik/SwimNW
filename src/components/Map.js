import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


export default class Map extends Component {

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
      />
    );
  }
}

// const styles = {
//   snazzy : [
//     {
//         "featureType": "administrative.country",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "visibility": "simplified"
//             },
//             {
//                 "hue": "#ff0000"
//             }
//         ]
//     }
// ]
// }