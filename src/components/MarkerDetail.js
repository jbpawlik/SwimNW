import React, {useState, useEffect, useRef} from "react";
import {View, Text, Button, Image, ImageBackground, StyleSheet, Pressable, Alert} from 'react-native';
import firebase from "../firebase";
import EditMarker from "./EditMarker";

function MarkerDetail(props){
  // console.log(props)
  // const [state, setState] = useState({});
  const [markerDetails, setMarkerDetails] = useState([]);
  const markerID = props.selectedMarker[0];
  // const marker = firebase.firestore().collection('markers').doc(markerID).get().then((snapshot) => {setMarkerDetails(snapshot.data())});
  // const mounted = useRef(false);

  // const user = firebase.auth().currentUser;
  // if (user != null) {
  //   props.setUserID(user.uid)
  // }
  
  useEffect(() => {
    let isMounted = true;

    const getMarkerDetails = async () => {
      try {
        const marker = firebase.firestore().collection('markers').doc(markerID).get().then((snapshot) => {setMarkerDetails(snapshot.data())});
        if (isMounted) {
          setMarkerDetails(marker);
        }
      } catch (error) {
        Alert.alert(error)
      }
    };

    getMarkerDetails();
    return () => {
      isMounted = false;
    };
  }, []);

  // if (props.userID === markerDetails.userID) {
    return (
      <React.Fragment>
        <ImageBackground 
          style={styles.image} 
          source={require('../assets/images/tidepool.jpg')}
        />
        {/* <Button
          color="#3740FE"
          title="Back to Map"
          onPress={() => props.hideMarkerDetail()}
        /> */}
        <Text style={styles.detailText}>
          Name: {markerDetails.title}
        </Text>
        <Text style={styles.detailText}>
          Location: {markerDetails.location}
        </Text>
        <Text style={styles.detailText}>
          Type: {markerDetails.type}
          </Text>
        <Text style={styles.detailText}>
          Description: {markerDetails.description}
        </Text>
        <Text style={styles.detailText}>
          Season: {markerDetails.season}
        </Text>
        <Text style={styles.detailText}>
          Danger: {markerDetails.danger}
        </Text>
        <Text style={styles.detailText}>
          Secrecy: {markerDetails.secrecy}
        </Text>
        <View>
        <Pressable
            style={styles.button}
            title="Edit Marker"
            onPress={() => props.showEditMarkerForm()}
          >
            <Text style={styles.loginText}>Edit Marker</Text>
          </Pressable>
        <Pressable
            style={styles.button}
            title="Back to Map"
            onPress={() => props.hideMarkerDetail()}
          >
            <Text style={styles.loginText}>Back to Map</Text>
          </Pressable>
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

  inputStyle: {
    width: '100%',
    margin: 5,
    padding: 10,
    paddingTop: 15,
    textAlign: 'center',
    borderWidth: 10,
    borderColor: 'tan',
    // backgroundColor: 'beige',
    opacity: .8,
    fontSize: 20,
  },
  detailText: {
    color: '#211302',
    fontSize: 16,
    backgroundColor: 'beige',
    borderWidth: 1,
    borderColor: 'black',
    opacity: .8,
    paddingLeft: 15,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#211302',
    fontSize: 16,
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: 'beige',
    borderWidth: 10,
    borderColor: 'tan',
    opacity: .8,
    padding: 15,
    fontWeight: 'bold',
    lineHeight: 30,
  },
  image: {
    width: 600,
    height: 1200,
    overflow: 'hidden',
    position: 'absolute',
  },
  button: {
    // position:'absolute',
    minWidth: '100%',
    // backgroundColor: 'beige',
    opacity: .8,
  },
  image: {
    width: 600,
    height: 1200,
    overflow: 'hidden',
    position: 'absolute',
  },
})

export default MarkerDetail;