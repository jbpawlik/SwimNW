// import React from "react";
// import PropTypes from "prop-types";

import React, { Component, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../firebase';
import {Picker} from '@react-native-picker/picker'


export default class ReusableForm extends React.Component {

  constructor() {
    const user = firebase.auth().currentUser;
    // const address = this.props.tempCoordinate
    super();
    this.dbRef = firebase.firestore().collection('markers');
    
    this.state = { 
      title: '',
      location: '',
      description: '',
      type: '',
      season: '',
      danger: '',
      secrecy: 'Public',
      userID: user.uid
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  // this.marker.addressForCoordinate(
  //   return this.tempCoordinate
  // );

  addMarker = () => {
    const address = this.props.tempCoordinate
    console.log(this.props.tempCoordinate)
    console.log(address)
    if (this.state.title === '') {
      Alert.alert('Fill out all required fields')
    } else {
      this.dbRef.add({
        title: this.state.title,
        coordinate: this.props.tempCoordinate,
        location: this.state.location,
        description: this.state.description,
        address: addressForCoordinate(this.props.tempCoordinate),
        type: this.state.type,
        season: this.state.season,
        danger: this.state.danger,
        secrecy: this.state.secrecy,
        markerID: Math.floor(Math.random() * (10000000 - 0) + 0),
        userID: this.state.userID
      })
      // this.props.navigation.navigate('Map')
      this.props.hideReusableForm()
    }
    }

  render() {
    return (
      <React.Fragment>
        <View>
          <Button
            color="#3740FE"
            title="Back to Map"
            onPress={() => this.props.hideReusableForm()}
          />
        </View>
        <View style={styles.container}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Name (required)"
            value={this.state.title}
            onChangeText={(val) => this.updateInputVal(val, 'title')}
          />
          <TextInput
            style={styles.inputStyle}
            multiline = {true}
            numberOfLines = {4}
            placeholder="Address or Directions"
            value={this.state.location}
            onChangeText={(val) => this.updateInputVal(val, 'location')}
          />
          <TextInput
            style={styles.inputStyle}
            multiline = {true}
            numberOfLines = {4}
            placeholder="Description"
            value={this.state.description}
            onChangeText={(val) => this.updateInputVal(val, 'description')}
          />
          <Picker
            selectedValue={this.state.season}
            onValueChange={(val, index) =>
              this.updateInputVal(val, 'season')
            }>
            <Picker.Item label="Year-Round" value="Year-Round"/>
            <Picker.Item label="Spring to Fall" value="Spring to Fall"/>
            <Picker.Item label="Spring to Summer" value="Spring to Summer"/>
            <Picker.Item label="Summer" value="Summer"/>
            <Picker.Item label="Late Summer" value="Late Summer"/>
            <Picker.Item label="Summer to Fall" value="Summer to Fall"/>
            <Picker.Item label="Only on the Hottest Days" value="Only on the Hottest Days"/>
          </Picker>
          <Picker
            selectedValue={this.state.type}
            onValueChange={(val, index) =>
              this.updateInputVal(val, 'type')
            }>
            <Picker.Item label="Pool" value="Pool"/>
            <Picker.Item label="Lake" value="Lake"/>
            <Picker.Item label="River" value="River"/>
            <Picker.Item label="Hot Spring" value="Hot Spring"/>
            <Picker.Item label="Pond" value="Pond"/>
            <Picker.Item label="Waterfall" value="Waterfall"/>
          </Picker>
          <Picker
            selectedValue={this.state.danger}
            onValueChange={(val, index) =>
              this.updateInputVal(val, 'danger')
            }>
            <Picker.Item label="Low Risk" value="Low Risk" />
            <Picker.Item label="Moderate Risk" value="Moderate Risk" />
            <Picker.Item label="High Risk" value="High Risk" />
          </Picker>
          <Picker
            selectedValue={this.state.secrecy}
            onValueChange={(val, index) =>
              this.updateInputVal(val, 'secrecy')
            }>
            <Picker.Item label="Public" value="Public" />
            <Picker.Item label="Protected" value="Protected" />
            <Picker.Item label="Private" value="Private" />
          </Picker>
          <Button
            color="#3740FE"
            title="Add Marker"
            onPress={() => this.addMarker()}
          />
        </View>
      </React.Fragment>
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
