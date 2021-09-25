import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from './components/Map'
import DrawerMenu from './components/DrawerMenu';
import firebase from 'firebase';

//Ignore timer warning in re: Firebase; fundamental incompatibility with React Native; placeholder solution while debugging
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer for a long period of time'])

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(setLoggedIn);
  }, []);

  // if (loggedIn) {
  //   return <HomeScreen />
  // } else {
  //    <Login /> 
  // }


  return (
    <React.Fragment>      
      <DrawerMenu/>
    </React.Fragment>
  );}


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
