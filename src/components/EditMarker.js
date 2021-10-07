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
    flex: 1,
  },
  form: {
    position: 'absolute',
    bottom: 0,
  },
  inputStyle: {
    width: '100%',
    padding: 10,
    paddingTop: 15,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'beige',
    fontSize: 20,
  },
  picker: {
    margin: 5,
    padding: 10,
    paddingTop: 15,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black',
    height: 50,
    flex: 1,
  },
  pickers: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth,
    justifyContent: 'space-evenly',
    backgroundColor: 'beige',
  },
  loginText: {
    textAlign: 'center',
    color: '#211302',
    fontSize: 16,
    alignItems: 'center',
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
    justifyContent: 'center'
  },
  buttons: {
    flexDirection: 'row',
    backgroundColor: 'beige',
    justifyContent: 'space-evenly',
  },
});
