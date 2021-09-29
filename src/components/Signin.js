import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../firebase';

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
          source={require('../assets/images/shroomlog.jpg')}
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
          <Text style={styles.textStyle}>SIGN UP</Text>
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
    color: '#38A3EA',
    marginTop: 25,
    textAlign: 'center'
  },
  image: {
    width: 600,
    height: 1200,
    overflow: 'hidden',
    position: 'absolute',
  },
  textStyle: {
    flex: 1,
    fontSize: 52,
    fontWeight: 'bold',
    borderWidth: 10,
    borderColor: 'tan',
    textAlign: 'center',
    alignItems: 'center',
    color: '#211302',
    opacity: .6,
  },
  button: {
    // position:'absolute',
    minWidth: '100%',
    height: 100,
    backgroundColor: 'beige',
    opacity: .8,
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