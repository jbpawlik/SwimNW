// import React from "react";
// import PropTypes from "prop-types";

import React, { Component, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import firebase from '../firebase';
import {Picker} from '@react-native-picker/picker'


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
      type: '',
      season: '',
      danger: '',
      secrecy: '',
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
          source={require('../assets/images/tidepool.jpg')}
        />
          <Button
            color="#3740FE"
            title="Back to Map"
            onPress={() => this.props.hideEditMarkerForm()}
          />

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
            title="Edit Marker"
            onPress={() => this.editMarker()}
          />
          <Button
            color="#3740FE"
            title="Delete Marker"
            onPress={() => this.deleteMarker()}
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
  image: {
    width: 600,
    height: 1200,
    overflow: 'hidden',
    position: 'absolute',
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
