import React, {useState, useEffect} from 'react';
import { View, Text } from "react-native";
import firebase from '../firebase';

export default function ProfileScreen() {
  const [loggedIn, setLoggedIn] = useState(false);
  const user = firebase.auth().currentUser.email;

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(setLoggedIn);
  }, []);

    if (loggedIn) {
      return (
        <View>
          <Text>{user}</Text>
        </View>
      )
    }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{fontSize:16,fontWeight:'700'}}>Profile Screen</Text>
      </View>
    );
  }