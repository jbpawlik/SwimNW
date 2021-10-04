// import React from "react";
// import PropTypes from "prop-types";

import React, { Component, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, ImageBackground, Pressable, ScrollView, Dimensions } from 'react-native';
import firebase from '../firebase';
import {Picker} from '@react-native-picker/picker'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class EditMarker extends React.Component {

  constructor(props) {
    const user = firebase.auth().currentUser;
    super(props);
    this.markerTitle2 = [];
    this.markerID = this.props.selectedMarker[0];
    this.marker = firebase.firestore().collection('markers').doc(this.markerID);

    this.state = { 
      title: '',
      location: '',
      description: '',
      type: 'Pool',
      season: '',
      danger: '',
      secrecy: 'Public',
    }
  }

  // componentDidMount(){
  //   this.marker = firebase.firestore().collection('markers').get().then(snapshot => { snapshot.docs.forEach(marker => { if (marker._delegate._document.key.path.segments[6] === this.markerID ) {

  //      this.markerTitle2.push(marker._delegate._document.data.value.mapValue.fields.title['stringValue'])}})}).then(console.log(this.markerTitle2))
  // }

  // componentDidMount = () => {
  //   this.markerTitle2.push(markerTitle2: firebase.firestore().collection('markers').doc(this.markerID).get().then(querySnapshot => { return querySnapshot._delegate._document.data.value.mapValue.fields.title['stringValue'];
  //   }))
  // }

  
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  deleteMarker = () => {
      this.marker.delete();
      this.props.hideEditMarkerForm();
  }
    

  editMarker = () => {
    console.log(this.marker)
    if (this.state.title === '') {
      Alert.alert('Fill out all required fields')
    } else {
      this.marker.update({
        title: this.state.title,
        location: this.state.location,
        description: this.state.description,
        type: this.state.type,
        season: this.state.season,
        danger: this.state.danger,
        secrecy: this.state.secrecy,
      })
      this.props.hideEditMarkerForm()
    }
  }

  render() {
    return (
      <React.Fragment>
        <View style={styles.container}>
            <ImageBackground 
              style={styles.image} 
              source={require('../assets/images/elkrock.jpg')}
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
              style={styles.button}
              title="Update"
              onPress={() => this.editMarker()}
            >
              <Text style={styles.loginText}>Update</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              title="Delete"
              onPress={() => this.deleteMarker()}
            >
              <Text style={styles.loginText}>Delete</Text>
            </Pressable>
            </View>
            <View style={styles.buttons}>
            <Pressable
              style={styles.button}
              title="Back to Swim"
              onPress={() => this.props.hideEditMarkerAndGoBackToMarkerDetail()}
            >
              <Text style={styles.loginText}>Back to Swim</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              title="Back to Map"
              onPress={() => this.props.hideEditMarkerForm()}
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
  },
  form: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: 25,
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
    // opacity: .8,
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
    // opacity: .8,
  },
  loginText: {
    textAlign: 'center',
    color: '#211302',
    fontSize: 16,
    alignItems: 'center',
    // marginTop: 5,
    // backgroundColor: 'beige',
    // borderWidth: 1,
    // borderColor: 'tan',
    // opacity: .8,
    width: windowWidth/2,
    padding: 15,
    fontWeight: 'bold',
    borderWidth: 1,

  },
  image: {
    width: windowWidth,
    height: windowHeight,
    overflow: 'hidden',
    position: 'absolute',
  },
  button: {
    // position:'absolute',
    // minWidth: '100%',
    // opacity: .8,
    justifyContent: 'center'
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
    // padding: 10,
    // opacity: .8,
  },
});
