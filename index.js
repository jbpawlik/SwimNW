import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import React from 'react';
import ReactDOM from 'react-dom';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import firebase from "./firebase";
import App from './src/App';
import 'firebase/auth';


//You turned off dispatch: store.dispatch below

const rrfProps = {
  firebase,
  config: {
        userProfile: "users",
        useFirestoreForProfile: true,
    },
  dispatch: '',
  createFirestoreInstance
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
