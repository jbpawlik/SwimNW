import React, { Component } from 'react';
import { StyleSheet, Dimensions, Text, View, TextInput, Button, Alert, ActivityIndicator, Pressable, ImageBackground } from 'react-native';
import firebase from '../firebase';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default class Signup extends Component {

  constructor() {
    super();
    this.state = { 
      displayName: '',
      email: '', 
      password: '',
    }
    this.users = firebase.firestore().collection('users');
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = () => {
    if (this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signup!')
    } else if (this.state.password.length < 7 ) {
      Alert.alert('Password must be 6+ characters')
    } else {
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        const user = res.user;
        console.log(user)
        this.users.add({
          uid: user.uid,
          displayName: this.state.displayName,
          email: user.email,
          admin: false,
          trust: 0,
        })
        res.user.updateProfile({
          displayName: this.state.displayName
        })
        console.log('User registered successfully!')
        this.setState({
          displayName: '',
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('Signin')
      })
      .catch(error => alert(error))
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground 
          style={styles.image} 
          source={require('../assets/images/elkrock.jpg')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Name"
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal(val, 'displayName')}
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
          minLength={6}
          maxLength={15}
          secureTextEntry={true}
        />   
        <Pressable
          color="#38A3EA"
          style={styles.button}
          title="Signup"
          onPress={() => this.registerUser()}
        >
          <Text style={styles.textStyle}>SIGN UP</Text>
        </Pressable>
        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Signin')}>
          Registered?{'\n'} Click here to login
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
    opacity: .8,
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
    borderWidth: 10,
    borderColor: 'tan',
    textAlign: 'center',
    alignItems: 'center',
    color: '#211302',
    opacity: .6,
    paddingTop: 20,
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