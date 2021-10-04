// import React from "react";
// import PropTypes from "prop-types";

import React, { Component, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, ImageBackground, Pressable, ScrollView, Dimensions } from 'react-native';
import firebase from '../firebase';
import {Picker} from '@react-native-picker/picker'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class ReusableForm extends React.Component {

  constructor(props) {
    const user = firebase.auth().currentUser;
    super(props);
    this.dbRef = firebase.firestore().collection('markers');
    this.state = {
      title: '',
      location: '',
      description: '',
      type: '',
      season: '',
      danger: '',
      secrecy: '',
      userID: user.uid
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  addMarker = () => {
    if (this.state.title === '') {
      Alert.alert('Please fill out all fields')
    } else {
      this.dbRef.add({
        title: this.state.title,
        coordinate: this.props.tempCoordinate,
        location: this.state.location,
        description: this.state.description,
        type: this.state.type,
        season: this.state.season,
        danger: this.state.danger,
        secrecy: this.state.secrecy,
        userID: this.state.userID,
        admin: false,
        trusted: false
      })
      this.props.hideReusableForm()
    }
    }

  render() {
    return (
      <React.Fragment>
        <View style={styles.container}>
          <ImageBackground 
            style={styles.image} 
            source={require('../assets/images/tidepool.jpg')}
          />
          <View style={styles.form}>
            <TextInput
              style={styles.inputStyle}
              placeholder="Name (required)"
              value={this.state.title}
              onChangeText={(val) => this.updateInputVal(val, 'title')}
            />
            <TextInput
              style={styles.inputStyle}
              placeholder="Address or Directions"
              value={this.state.location}
              onChangeText={(val) => this.updateInputVal(val, 'location')}
            />
            <TextInput
              style={styles.inputStyle}
              placeholder="Description"
              value={this.state.description}
              onChangeText={(val) => this.updateInputVal(val, 'description')}
            />
            <View style={styles.pickers}>
              <Picker
                style={styles.picker}
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
                style={styles.picker}
                selectedValue={this.state.type}
                onValueChange={(val, index) =>
                  this.updateInputVal(val, 'type')
                }>
                <Picker.Item label="Pool" value="Pool"/>
                <Picker.Item label="Lake" value="Lake"/>
                <Picker.Item label="River" value="River"/>
                <Picker.Item label="Hot Spring" value="Hot Spring"/>
                <Picker.Item label="Other" value="Other"/>
              </Picker>
            </View>
          <View style={styles.pickers}>
            <Picker
              style={styles.picker}
              selectedValue={this.state.danger}
              onValueChange={(val, index) =>
                this.updateInputVal(val, 'danger')
              }>
              <Picker.Item label="Low Risk" value="Low Risk" />
              <Picker.Item label="Moderate Risk" value="Moderate Risk" />
              <Picker.Item label="High Risk" value="High Risk" />
            </Picker>
            <Picker
              style={styles.picker}
              selectedValue={this.state.secrecy}
              onValueChange={(val, index) =>
                this.updateInputVal(val, 'secrecy')
              }>
              <Picker.Item label="Public" value="Public" />
              <Picker.Item label="Protected" value="Protected" />
              <Picker.Item label="Private" value="Private" />
            </Picker>
          </View>
          <View style={styles.buttons}>
              <Pressable
                  // style={styles.button}
                  title="Add Marker"
                  onPress={() => this.addMarker()}
              >
                <Text style={styles.loginText}>Add Marker</Text>
              </Pressable>
              <Pressable
                  // style={styles.button}
                  title="Back to Map"
                  onPress={() => this.props.hideReusableForm()}
                >
                  <Text style={styles.loginText}>Back to Map</Text>
                </Pressable>
              </View>
          </View>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    justifyContent: "center",
    flex: 1,
  },
  form: {
    position: 'absolute',
    bottom: 0,
    flexGrow: 1
  },
  inputStyle: {
    width: '100%',
    // margin: 5,
    padding: 10,
    paddingTop: 15,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'beige',
    opacity: .8,
    fontSize: 20,
  },
  picker: {
    margin: 5,
    padding: 10,
    paddingTop: 15,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black',
    // backgroundColor: 'beige',
    // opacity: .8,
    // fontSize: 20,
    height: 50,
    flex: 1,
  },
  pickers: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth,
    justifyContent: 'space-evenly',
    backgroundColor: 'beige',
    opacity: .8,
  },
  loginText: {
    textAlign: 'center',
    color: '#211302',
    fontSize: 16,
    alignItems: 'center',
    marginTop: 5,
    // backgroundColor: 'beige',
    // borderWidth: 1,
    // borderColor: 'tan',
    // opacity: .8,
    padding: 10,
    fontWeight: 'bold',
  },
  image: {
    width: windowWidth,
    height: windowHeight,
    overflow: 'hidden',
    position: 'absolute',
  },
  button: {
    // position:'absolute',
    minWidth: '100%',
    backgroundColor: 'beige',
    opacity: .8,
  },
  // preloader: {
  //   left: 0,
  //   right: 0,
  //   top: 0,
  //   bottom: 0,
  //   position: 'absolute',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: '#fff'
  // },
  buttons: {
    flexDirection: 'row',
    // position:'absolute',
    backgroundColor: 'beige',
    justifyContent: 'space-evenly',
    padding: 10,
    opacity: .8,
  },
});
