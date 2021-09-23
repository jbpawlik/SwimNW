import firebase from 'firebase/app'
import 'firebase/firestore';

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