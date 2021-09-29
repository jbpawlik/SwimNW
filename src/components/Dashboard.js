import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, ImageBackground, Pressable } from 'react-native';
import firebase from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { navigation } from '../helpers/Navigate'
import { UrlTile } from 'react-native-maps';
export default class Dashboard extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      // uid: ''
    }
  }

  signOut = () => {
    const {navigation} = this.props;
    console.log('hello')

    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Signup')
    })
    // .catch(error => this.setState({ errorMessage: error.message }))
  }


  render() {
    // this.state = {
    //   displayName: firebase.auth().currentUser.displayName,
    //   uid: firebase.auth().currentUser.uid
    // }
    
    return (
      <View style={styles.container}>

        <ImageBackground 
          style={styles.image} 
          source={require('../assets/images/shroomlog.jpg')}
        />
        <Pressable
          title="Signout"
          color='#38A3EA'
          style={styles.button}
          onPress={() => this.signOut()}
        >
          <Text style={styles.textStyle}>LOG OUT</Text>
        </Pressable>
        
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,

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
  image: {
    width: 600,
    height: 1200,
    overflow: 'hidden',
    position: 'absolute',
  },
  button: {
    position:'absolute',
    minWidth: '100%',
    height: 100,
    backgroundColor: 'beige',
    opacity: .8,
  }
});