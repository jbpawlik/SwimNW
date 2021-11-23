import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Map from './components/Map'
import DrawerMenu from './components/DrawerMenu';
import firebase from '../src/firebase';
import 'react-native-gesture-handler';

// Instead of vvv, go to node_modules/react-native/Libraries/Core/JSTimers.js and update to const MAX_TIMER_DURATION_MS = 10000 * 1000;
// Ignore timer warning in re: Firebase; fundamental incompatibility with React Native; placeholder solution while debugging (remove on iOS)
// import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['Setting a timer for a long period of time'])

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(setLoggedIn);
  }, []);

  return (
    <React.Fragment>
      <StatusBar hidden/>
      <DrawerMenu/>
    </React.Fragment>
  );}