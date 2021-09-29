import React, {useState, useEffect} from "react";
import {View, Text, Button, Image, ImageBackground, StyleSheet} from 'react-native';
import firebase from "../firebase";
import EditMarker from "./EditMarker";

function MarkerDetail(props){
  // console.log(props)
  // const [state, setState] = useState({});
  const [markerDetails, setMarkerDetails] = useState([]);
  const markerID = props.selectedMarker[0];
  const marker = firebase.firestore().collection('markers').doc(markerID).get().then((snapshot) => {setMarkerDetails(snapshot.data())});
  // const user = firebase.auth().currentUser;
  // if (user != null) {
  //   props.setUserID(user.uid)
  // }

//   useEffect(() => {
//     anon();
//     return () => {
//       setState({});
//     };
// }, []);

// const anon = () => {
//   setState({})
// }

  // if (props.userID === markerDetails.userID) {
    return (
      <React.Fragment>
        <ImageBackground 
          style={styles.image} 
          source={require('../assets/images/tidepool.jpg')}
        />
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
          onPress={() => props.showEditMarkerForm()}
        />
        </View>
      </React.Fragment>
    );
//   } else {
//     return (
//       <React.Fragment>
//         <Button
//           color="#3740FE"
//           title="Back to Map"
//           onPress={() => props.hideMarkerDetail()}
//         />
//         <Text>
//           Name: {markerDetails.title}{'\n'}
//           Location:{markerDetails.location}{'\n'}
//           Type: {markerDetails.type}{'\n'}
//           Description: {markerDetails.description}{'\n'}
//           Season: {markerDetails.season}{'\n'}
//           Danger: {markerDetails.danger}{'\n'}
//           Secrecy: {markerDetails.secrecy}
//         </Text>
//       </React.Fragment>
//     );
//   }
}

const styles = StyleSheet.create({
  image: {
    width: 600,
    height: 1200,
    overflow: 'hidden',
    position: 'absolute',
  },
})

export default MarkerDetail;