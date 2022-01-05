import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, ActivityIndicator, Dimensions, Share, StatusBar, LogBox, Pressable } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../firebase';
import { useNavigation } from '@react-navigation/native';
import 'firebase/storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const storageRef = firebase.storage().ref();

// const photoRef = storageRef.child('photo.png');
// const imagesRef = storageRef.child('images/photo.png');

export default function PictureUpload({selectedMarker, hideUploadPicture}) {
  const [pickedImagePath, setPickedImagePath] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false);
  const [loadingPic, setLoadingPic] = useState({})
  const navigation = useNavigation();
  const imageRef = storageRef.child(selectedMarker + '.jpg');
  const user = firebase.auth().currentUser;

  useEffect(() => {
    const URL = imageRef.getDownloadURL()
    return () => {
      console.log(URL)
    }
  }, [])

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission denied.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    
    if (!result.cancelled) {
      setPickedImagePath(result.uri);
    }
  }

  const onBackButtonPress = () => {
    // navigation.navigate("MapScreen");
    hideUploadPicture()
  }

  const onCheckButtonPress = () => {
    // console.log(pickedImagePath)
    uploadImage()
    // imageRef.put(pickedImagePath, {contentType: 'image/jpg'})
    setPickedImagePath(null)
    hideUploadPicture()
  }

  // const saveImage = (uploadResult) => {
  //   setImage({
  //     image: uploadResult
  // }, setLoadingPic({
  //   loadingPic: true,
  // }))}

  const uploadImage = async () => {
    const response = await fetch(pickedImagePath)
    const blob = await response.blob();
    return imageRef.put(blob)
}

  // const handleImagePicked = async pickerResult => {
  //   // const uploadResult = await uploadImageAsync(pickerResult.uri)
  //   // console.log(pickerResult)
  //   // saveImage(uploadResult)
  //   // hideUploadPicture()
  //   setPickedImagePath(pickerResult.uri);
  // }

//   const handleImagePicked = async pickerResult => {
//     let uploadResponse, uploadResult;
//     try {
//       setState({
//         uploading: true
//       });

//       if (!pickerResult.cancelled) {
//         const uploadResponse = await uploadImageAsync(pickerResult.uri);
//         console.log(uploadResponse)
//         const uploadResult = await uploadResponse.json();
//         setState({
//           image: uploadResult.location
//         });

//         // console.log(uploadResponse)
//       }
//     } catch (e) {
//       // console.log({ uploadResponse });
//       // console.log({ uploadResult });
//       // console.log({ e });
//       // alert('Upload failed, sorry :(');
//     } finally {
//       setState({
//         uploading: false
//       });
//     }
//   };
// }

  // const takePhoto = async () => {
  //   const {
  //     status: cameraPerm
  //   } = await Permissions.askAsync(Permissions.CAMERA);

  //   const {
  //     status: cameraRollPerm
  //   } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

  //   // only if user allows permission to camera AND camera roll
  //   if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
  //     const pickerResult = await ImagePicker.launchCameraAsync({
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //     });

  //     handleImagePicked(pickerResult);
  //   }
  // };

  // const maybeRenderUploadingOverlay = () => {
  //   if (uploading) {
  //     return (
  //       <View
  //         style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
  //         <ActivityIndicator color="#fff" size="large" />
  //       </View>
  //     );
  //   }
  // };

  // const maybeRenderImage = () => {
  //   const {
  //     image
  //   } = photoURL;

  //   if (!image) {
  //     return;
  //   }

  //   return (
  //     <View>
  //       { loading ? (
  //         <Modal
  //           style={styles.maybeRenderContainer}>
  //           <View
  //             style={styles.maybeRenderImageContainer}>
  //             <Image source={{ uri: image }} style={styles.maybeRenderImage} />
  //           </View>

  //           <Text
  //             onPress={()=> setLoading(true), navigation.navigate('CentralMapScreen')}
  //             onLongPress={share}
  //             style={styles.maybeRenderImageText}>
  //             Approve
  //           </Text>
  //         </Modal>
  //       ) : (
  //         <></>
  //       )
  //     }</View>)}

  // const share = () => {
  //   Share.share({
  //     message: image,
  //     title: 'Check out this photo',
  //     url: image,
  //   });
  // };

  // const copyToClipboard = () => {
  //   Clipboard.setString(image);
  //   alert('Copied image URL to clipboard');
  // };

  const pickImage = async () => {
    // const {
    //   status: cameraRollPerm
    // } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    // if (cameraRollPerm === 'granted') {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      // handleImagePicked(pickerResult);
      setPickedImagePath(pickerResult.uri);
    // }
  };


// Can't use setState here


//   const uploadImageAsync = async (uri) => {
//     const blob = await new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.onload = function () {
//       resolve(xhr.response);
//     };
//     xhr.onerror = function (e) {
//       reject(new TypeError('Network request failed'));
//     };
//     xhr.responseType = 'blob';
//     xhr.open('GET', uri, true);
//     xhr.send(null);
//   });

//   const ref = firebase
//     .storage()
//     .ref()
//     .child('photo.png')
//     const snapshot = await ref.put(blob);
//     blob.close();
//     return await snapshot.ref.getDownloadURL()
// }

const uploadImageAsync = async (uri) => {
  const apiUrl = uri;
  const uriParts = uri.split('.');
  const fileType = uriParts[uriParts.length - 1];

  const formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });
  
  const options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  // console.log(formData)
  return fetch(apiUrl, options);
}

  return (
    <View style={styles.screen}>
      { !pickedImagePath ?
        <View style={{ flex: 1, justifyContent: 'space-between'}}>
          <Entypo
            name='camera'
            size={180}
            onPress={openCamera}
          />
          <AntDesign
          name='addfolder'
          size={180}
          onPress={pickImage}
          />
          <AntDesign
            name='back'
            size={180}
            onPress={() => onBackButtonPress()}
          />
        </View>
        :
        <View style={styles.imageContainer}>
          {
            pickedImagePath !== '' && <Image
            source={{ uri: pickedImagePath }}
            style={styles.image}
            />
          }
          <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <AntDesign
              name='close'
              size={180}
              onPress={() => setPickedImagePath(null)}
            />
            <AntDesign
              name='check'
              size={180}
              onPress={() => onCheckButtonPress()}
            />
          </View>
        </View>
      }
    </View>
  )}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: 'transparent',
    padding: 50,
  },
    buttonContainer: {
    width: 400,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: 'cover'
  },
});