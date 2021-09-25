// import React from "react";
// import PropTypes from "prop-types";

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../firebase';

export default class ReusableForm extends React.Component {

  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('markers');
    this.state = { 
      title: '',
      // latitude: null, 
      // longitude: null,
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  addMarker = () => {
    
    if (this.state.title === '') {
      Alert.alert('Fill out all required fields')
    } else {
      this.dbRef.add({
        title: this.state.title,
        // latitude: parseFloat(this.state.latitude), 
        // longitude: parseFloat(this.state.longitude),
        coordinate: this.props.tempCoordinate
        // coordinate: {latitude: parseFloat(this.state.latitude), longitude: parseFloat(this.state.longitude)}
      })
      // this.props.navigation.navigate('Map')
      this.props.hideReusableForm()
    }
    }

  render() {
    // if(this.state.isLoading){
    //   return(
    //     <View style={styles.preloader}>
    //       <ActivityIndicator size="large" color="#9E9E9E"/>
    //     </View>
    //   )
    // }
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Title"
          value={this.state.title}
          onChangeText={(val) => this.updateInputVal(val, 'title')}
        />
        {/* <TextInput
          style={styles.inputStyle}
          keyboardType='numeric'
          placeholder={this.state.tempCoordinate}
          value={this.state.latitude}
          onChangeText={(val) => this.updateInputVal(val, 'latitude')}
        />
        <TextInput
          style={styles.inputStyle}
          keyboardType='numeric'
          placeholder="Longitude"
          value={this.state.longitude}
          onChangeText={(val) => this.updateInputVal(val, 'longitude')}
        />    */}
        <Button
          color="#3740FE"
          title="Add Marker"
          onPress={() => this.addMarker()}
        />
        <Button
          color="#3740FE"
          title="Back to Map"
          onPress={() => this.props.hideReusableForm()}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});
