import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from './components/Map'
import DrawerMenu from './components/DrawerMenu';
import firebase from 'firebase';


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
