import firebase from 'firebase/app'
import 'firebase/firestore';
import {REACT_APP_FIREBASE_API_KEY, REACT_APP_FIREBASE_AUTH_DOMAIN, REACT_APP_FIREBASE_DATABASE_URL, REACT_APP_FIREBASE_PROJECT_ID, REACT_APP_FIREBASE_SENDER_ID, REACT_APP_FIREBASE_STORAGE_BUCKET, REACT_APP_FIREBASE_APP_ID} from '@env'


// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID 
// }


const firebaseConfig = {
  apiKey: "AIzaSyAtp7rpL40bUmkI-GWk771_xF1SltIRtz0",
  authDomain: "swimnw.firebaseapp.com" ,
  databaseURL: "https://SwimNW.firebaseio.com",
  projectId: "swimnw",
  storageBucket: "swimnw.appspot.com",
  messagingSenderId: "638140442903",
  appId: "1:638140442903:web:8b7e88477773bc04166f52"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;