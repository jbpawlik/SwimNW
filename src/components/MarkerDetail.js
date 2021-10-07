import React, {useState, useEffect, useRef} from "react";
import {View, Text, Button, Image, ImageBackground, StyleSheet, Pressable, Alert, ScrollView, Dimensions} from 'react-native';
import firebase from "../firebase";
import EditMarker from "./EditMarker";
import { Entypo, AntDesign } from '@expo/vector-icons'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function MarkerDetail(props){

  const [markerDetails, setMarkerDetails] = useState([]);
  const markerID = props.selectedMarker[0];
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(setLoggedIn);
  }, []);

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

  if (!loggedIn) {
    return (
      <React.Fragment>
        <ImageBackground
          style={styles.swimPic} 
          source={require('../assets/images/tidepool.jpg')}
        />
        <View style={styles.container}>
          <View style={styles.row}>
            <Entypo 
              name='camera'
              size={42}
              onPress={() => props.showUploadPicture()}
            />
            <Text style={styles.name}>
              {markerDetails.title}
            </Text>
          </View>
          <View style={styles.body}>
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
            <AntDesign 
              style={styles.arrow}
              name='back'
              size={120}
              onPress={() => props.hideMarkerDetail()}
            />
          </View>
        </View>
      </React.Fragment>
    )
  } else if (loggedIn) {
    const user = firebase.auth().currentUser;
    if (user.uid === markerDetails.userID) {
      return (
        <React.Fragment>
          <ImageBackground
            style={styles.swimPic} 
            source={require('../assets/images/tidepool.jpg')}
          />
          <View style={styles.container}>
          <View style={styles.row}>
            <Entypo 
              name='camera'
              size={42}
              onPress={() => props.showUploadPicture()}
            />
            <Text style={styles.name}>
              {markerDetails.title}
            </Text>
          </View>
          <View style={styles.body}> 
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
            <View style={styles.buttons}>
              <AntDesign 
                style={styles.arrow}
                name='back'
                size={120}
                onPress={() => props.hideMarkerDetail()}
              />
              <Pressable
                title="Edit Marker"
                onPress={() => props.showEditMarkerForm()}
              >
                <Text style={styles.loginText}>Edit Swim</Text>
              </Pressable>
              </View>
            </View>
          </View>
      </React.Fragment>
    );
  } else {
    return (
    <React.Fragment>
      <ImageBackground
        style={styles.swimPic} 
        source={require('../assets/images/tidepool.jpg')}
      />
      <View style={styles.container}>
        <View style={styles.row}>
          <Entypo 
            name='camera'
            size={42}
            onPress={() => props.showUploadPicture()}
          />
          <Text style={styles.name}>
            {markerDetails.title}
          </Text>
        </View>
          <View style={styles.body}>
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
            <AntDesign 
              style={styles.arrow}
              name='back'
              size={120}
              onPress={() => props.hideMarkerDetail()}
            />
          </View>
      </View>
    </React.Fragment>
    )}
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
  },
  body: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  view: {
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
    position: 'relative'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: '100%',
    backgroundColor: 'beige',
    minWidth: windowWidth,
  }, 
  swimPic: {
    overflow: 'hidden',
    position: 'absolute',
    minWidth: windowWidth,
    minHeight: windowHeight,
  },
  detailText: {
    color: '#211302',
    fontSize: 16,
    backgroundColor: 'beige',
    borderWidth: .5,
    lineHeight: 30,
    borderColor: 'black',
    paddingLeft: 15,
  },
  loginText: {
    color: '#211302',
    fontSize: 16,
    backgroundColor: 'beige',
    padding: 15,
    fontWeight: 'bold',
  },
  arrow: {
    color: '#211302',
    fontSize: 45,
    backgroundColor: 'beige',
    padding: 15,
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    backgroundColor: 'beige',
    justifyContent: 'space-evenly',
  },
})

export default MarkerDetail;