// import React from "react";
// import PropTypes from "prop-types";
import MapScreen from '../screens/MapScreen'

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../firebase';

export default class NewMarker extends MapScreen {

  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('markers');
    this.state = { 
      title: '',
      latitude: null, 
      longitude: null,
      // isLoading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  addMarker = () => {
    // if(this.state.email === '' && this.state.password === '') {
    //   Alert.alert('Enter details to signup!')
    // } else {
      // this.setState({
      //   isLoading: true,
      // })
      // firebase
      // .auth()
      // .createUserWithEmailAndPassword(this.state.email, this.state.password)
      // .then((res) => {
      //   res.user.updateProfile({
      //     displayName: this.state.displayName
      //   })
      //   console.log('User registered successfully!')
      //   this.setState({
      //     isLoading: false,
      //     displayName: '',
      //     email: '', 
      //     password: ''
      //   })
      //   this.props.navigation.navigate('Profile')
      // })
      // .catch(error => this.setState({ errorMessage: error.message }))
      if (this.state.title === '' || this.state.latitude === '' || this.state.longitude === '' ) {

        Alert.alert('Fill out all required fields')

    } else {
      this.dbRef.add({
        title: this.state.title,
        latitude: parseFloat(this.state.latitude), 
        longitude: parseFloat(this.state.longitude),
        coordinate: this.props.tempCoordinate
        // coordinate: {latitude: parseFloat(this.state.latitude), longitude: parseFloat(this.state.longitude)}
      })
      this.props.navigation.navigate('Map')
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
          // required='true'
          placeholder="Title"
          value={this.state.title}
          onChangeText={(val) => this.updateInputVal(val, 'title')}
        />      
        <TextInput
          style={styles.inputStyle}
          // required='true'
          keyboardType='numeric'
          placeholder="Latitude"
          value={this.state.latitude}
          onChangeText={(val) => this.updateInputVal(val, 'latitude')}
        />
        <TextInput
          style={styles.inputStyle}
          // required='true'
          keyboardType='numeric'
          placeholder="Longitude"
          value={this.state.longitude}
          onChangeText={(val) => this.updateInputVal(val, 'longitude')}
          // maxLength={15}
          // secureTextEntry={true}
        />   
        <Button
          color="#3740FE"
          title="Add Marker"
          onPress={() => this.addMarker()}
        />

        {/* <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Signin')}>
          Already Registered? Click here to login
        </Text> */}
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

// function ReusableForm(props) {
//   return (
//     <React.Fragment>
//       <form onSubmit={props.formSubmissionHandler}>
//         <input
//           type='text'
//           name='name'
//           placeholder='Name' />
//         {/* <input
//           type='text'
//           name='location'
//           placeholder='Location' />
//         <textarea
//           name='issue'
//           placeholder='Describe your issue.' /> */}
//         <button type='submit'>{props.buttonText}</button>
//       </form>
//     </React.Fragment>
//   );
// }

// ReusableForm.propTypes = {
//   formSubmissionHandler: PropTypes.func,
//   buttonText: PropTypes.string
// };

// export default ReusableForm;



// import React from "react";
// import PropTypes from "prop-types";
// import ReusableForm from "./ReusableForm";
// import { useFirestore } from 'react-redux-firebase'


// function NewMarkerForm(props){
//   const firestore = useFirestore();

//   function addMarkerToFirestore(event) {
//     event.preventDefault();

//     props.onNewMarkerCreation();

//     return firestore.collection('markers').add(
//       {
//         name: event.target.name.value,
//         timeCreated: firestore.FieldValue.serverTimestamp()
//       }
//     );
//   }
  
//   return (
//     <React.Fragment>
//       <ReusableForm 
//         formSubmissionHandler={addMarkerToFirestore}
//         buttonText="Help!" 
//       />
//     </React.Fragment>
//   );
// }

// NewMarkerForm.propTypes = {
//   onNewMarkerCreation: PropTypes.func
// };

// export default NewMarkerForm;
