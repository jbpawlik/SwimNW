import React, {useState} from "react";
import {View, Text, Button, Image} from 'react-native';
import firebase from "../firebase";
import EditMarker from "./EditMarker";

function MarkerDetail(props){
  const [markerDetails, setMarkerDetails] = useState([]);
  const markerID = props.selectedMarker[0];
  const marker = firebase.firestore().collection('markers').doc(markerID).get().then((snapshot) => {setMarkerDetails(snapshot.data())});
  const user = firebase.auth().currentUser;
  if (user != null) {
    props.setUserID(user.uid)
  }
  
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
        {props.userID === markerDetails.userID ? <Button
        color="#3740FE"
        title="Edit Swim"
        onPress={() => props.showMarkerEditForm()}
      /> : null}
      </View>
    </React.Fragment>
  );
}

export default MarkerDetail;