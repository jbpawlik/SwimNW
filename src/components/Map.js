import React, { useState, useEffect, Component } from 'react';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';
import {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
// import Marker from './Marker';
// import Markers from './Markers';
import firebase from '../firebase';


export default class MapScreen extends React.Component {

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
        longitudeDelta: 0.1
      },
      tempCoordinate: {}
    }
    // this.handlePress = this.handlePress.bind(this);
    this.dbRef = firebase.firestore().collection('markers');
    this.markerArray = [];
    this.arrayLength = this.markerArray.length;
  }

  // componentDidUpdate() {
  //   if (this.arrayLength !== this.markerArray.length) {
  //   this.setState({arrayLength: this.markerArray.length})
  //   }
  // }

  // shouldComponentUpdate(nextProps) {
  //   return nextProps.markerArray !== this.props.markerArray
  // }

  setArrayLength = () => {
    // console.log(this.markerArray.length)
    this.setState({arrayLength: this.markerArray.length})
    // console.log(this.arrayLength)
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
        this.setState({arrayLength: this.markerArray.length})

        // return this.markerArray;
    })
  }

  // this.getMarkers();
  
  //Working handlePress function that needs to be updated to use Firestore collection instead of state
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
          onPress: () => this.props.goToNewMarkerScreen()
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    )

    //Saves markers to state (obsolete)
    // this.setState({
    //   markers: [
    //     ...this.state.markers,
    //     { coordinate: event.nativeEvent.coordinate,
    //     title: 'newMarker',
    //     description: 'test'
    //     }
    //   ]
    //     })
    //     console.log(this.state.markers)
  }

  render() {
    if (this.markerArray.length <= 1) {
      this.getMarkers()
      // console.log(markers)
    } else if (this.arrayLength !== this.markerArray.length) {
      // console.log(this.markerArray[0].latitude)
    } else {
      // console.log(markers)
    }
    console.log(this.props)
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
           {/* Works
           <Marker 
           title={'Test'}
           coordinate={{latitude: 45.5, longitude: -122.675}}
           /> */}

          {/* Works
           {this.state.markers.map((marker, index) => (
              <Marker 
              coordinate={marker.coordinate}
              title={marker.title}
              />
           ))} */}
           {this.markerArray.map((marker, index) => (
             <Marker 
             key={index}
             tracksViewChanges={false}
             coordinate={marker.coordinate}
             title={marker.title}
             />
           ))
           }
           {/* {this.markerArray.map((marker, index) => (
           <Marker
            key={index}
            coordinate={{latitude: `${marker.latitude}`, longitude: `${marker.longitude}`}}
            //   latitude={marker.latitude}
            // longitude={marker.longitude}
            title={marker.title}
          />
           ))} */}
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



// import * as React from 'react';
// import { View, Text } from "react-native";
// import Map from '../components/Map';

// export default function MapScreen() {
//     return (
//       <Map/>
//       // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       //   <Text style={{fontSize:16,fontWeight:'700'}}>Map</Text>
//       // </View>
//     );
//   }