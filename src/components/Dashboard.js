import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, ImageBackground, Pressable, Dimensions } from 'react-native';
import firebase from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { UrlTile } from 'react-native-maps';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Account', {screen: 'Signup'})
    })
    .catch(error => Alert.alert(error.message))
  }

  render() {
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
    height: windowHeight,
    width: windowWidth,
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