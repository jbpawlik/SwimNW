import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, ImageBackground, Pressable, Dimensions } from 'react-native';
import firebase from '../firebase';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    }
  }
  
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  userLogin = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log('User logged-in successfully!')
        this.setState({
          email: '',
          password: ''
        })
        this.props.navigation.navigate('Map')
      })
      .catch(error => alert(error))
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground 
          style={styles.image} 
          source={require('../assets/images/shroomtree.jpg')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />
        <Pressable
          color="#38A3EA"
          title="Signin"
          style={styles.loginText}
          onPress={() => this.userLogin()}
          >
          <Text style={styles.textStyle}>Sign In</Text>
        </Pressable>
        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Signup')}>
          Don't have account? Click here to signup
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
  },
  inputStyle: {
    width: '100%',
    margin: 20,
    padding: 10,
    paddingTop: 15,
    alignSelf: "center",
    borderWidth: 10,
    borderColor: 'tan',
    backgroundColor: 'beige',
    opacity: .9,
    fontSize: 20,
    textAlign: 'center',
  },
  image: {
    width: windowWidth,
    height: windowHeight,
    overflow: 'hidden',
    position: 'absolute',
  },
  textStyle: {
    fontSize: 24,
    padding: 4,
    fontWeight: 'bold',
    borderColor: 'tan',
    textAlign: 'center',
    color: '#211302',
    opacity: .7,
    paddingBottom: 20,
  },
  button: {
    minWidth: '100%',
    backgroundColor: 'beige',
    opacity: .8,
  },
  loginText: {
    color: '#211302',
    fontSize: 16,
    marginTop: 25,
    textAlign: 'center',
    backgroundColor: 'beige',
    borderWidth: 10,
    borderColor: 'tan',
    opacity: .8,
    paddingTop: 15,
  }
});