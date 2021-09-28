import React, {useState, useEffect} from "react";
import {View, Text, Button, Image} from 'react-native';
import firebase from "../firebase";
import EditMarker from "./EditMarker";

function MarkerDetail(props){
  const [state, setState] = useState({});
  const [markerDetails, setMarkerDetails] = useState([]);
  const markerID = props.selectedMarker[0];
  const marker = firebase.firestore().collection('markers').doc(markerID).get().then((snapshot) => {setMarkerDetails(snapshot.data())});
  const user = firebase.auth().currentUser;
  if (user != null) {
    props.setUserID(user.uid)
  }
  
  useEffect(() => {
    myFunction();
    return () => {
      setState({}); // This worked for me
    };
}, []);

const myFunction = () => {
  setState({
      name: 'Jhon',
      surname: 'Doe',
  })
}

  if (props.userID === markerDetails.userID) {
    return (
      <React.Fragment>
        <Button
          color="#3740FE"
          title="Back to Map"
          onPress={() => props.hideMarkerDetail()}
        />
        <Text>
          Name: {markerDetails.title}{'\n'}
          Location:{markerDetails.location}{'\n'}
          Type: {markerDetails.type}{'\n'}
          Description: {markerDetails.description}{'\n'}
          Season: {markerDetails.season}{'\n'}
          Danger: {markerDetails.danger}{'\n'}
          Secrecy: {markerDetails.secrecy}
        </Text>
        <View>
        <Button
          color="#3740FE"
          title="Edit Swim"
          onPress={() => props.showMarkerEditForm()}
        />
        </View>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Button
          color="#3740FE"
          title="Back to Map"
          onPress={() => props.hideMarkerDetail()}
        />
        <Text>
          Name: {markerDetails.title}{'\n'}
          Location:{markerDetails.location}{'\n'}
          Type: {markerDetails.type}{'\n'}
          Description: {markerDetails.description}{'\n'}
          Season: {markerDetails.season}{'\n'}
          Danger: {markerDetails.danger}{'\n'}
          Secrecy: {markerDetails.secrecy}
        </Text>
      </React.Fragment>
    );
  }
}

export default MarkerDetail;