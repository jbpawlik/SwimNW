import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from './components/Map'
import DrawerMenu from './components/DrawerMenu';



export default function App() {
  return (
    <React.Fragment>
      
      <DrawerMenu/>
      <Map/>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
