import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, ActivityIndicator, Dimensions, Share, StatusBar, LogBox, Pressable } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../firebase';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// const storageRef = firebase.storage().ref();
// const photoRef = storageRef.child('photo.png');
// const imagesRef = storageRef.child('images/photo.png');

export default function PictureUpload({route, hideUploadPicture}) {
  const [pickedImagePath, setPickedImagePath] = useState('');
  const [photoURL, setPhotoUrl] = useState('');
  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false);
  const [loadingPic, setLoadingPic] = useState({})
  const navigation = useNavigation();

  const user = firebase.auth().currentUser;

  // const { pickedImagePath } = route.params
  // console.log(pickedImagePath)
  
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

  // // Haven't saved yet - don't need to
  // const uploadBlob = (file) => {
  //   savedImagesRef.put(file).then((snapshot) => {
  //     console.log('Uploaded a blob or file!');
  //   });
  //   // [END storage_upload_blob]
  // }

  const onBackButtonPress = () => {
    navigation.navigate("CentralMapScreen");
  }

  const onCheckButtonPress = () => {
    setPickedImagePath(null)
    hideUploadPicture()
  }

  const saveImage = (uploadResult) => {
    setImage({
      image: uploadResult
  }, setLoadingPic({
    loadingPic: true,
  }))}


  const handleImagePicked = async pickerResult => {
    const uploadResult = await uploadImageAsync(pickerResult.uri)
    // console.log(uploadResult)
    saveImage(uploadResult)
    hideUploadPicture()
  }

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

  const maybeRenderUploadingOverlay = () => {
    if (uploading) {
      return (
        <View
          style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      );
    }
  };

  const maybeRenderImage = () => {
    const {
      image
    } = photoURL;

    if (!image) {
      return;
    }

    return (
      <View>
        { loading ? (
          <Modal
            style={styles.maybeRenderContainer}>
            <View
              style={styles.maybeRenderImageContainer}>
              <Image source={{ uri: image }} style={styles.maybeRenderImage} />
            </View>

            <Text
              onPress={()=> setLoading(true), navigation.navigate('CentralMapScreen')}
              onLongPress={share}
              style={styles.maybeRenderImageText}>
              Approve
            </Text>
          </Modal>
        ) : (
          <></>
        )
      }</View>)}

  const share = () => {
    Share.share({
      message: image,
      title: 'Check out this photo',
      url: image,
    });
  };

  const copyToClipboard = () => {
    Clipboard.setString(image);
    alert('Copied image URL to clipboard');
  };

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

      handleImagePicked(pickerResult);
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
  console.log(uri)
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

//     return (
//       <View style={styles.view}>
//         <Entypo
//           name='camera'
//           size={120}
//           onPress={() => takePhoto()} title="Take a photo"
//         />
//         {/* <AntDesign
//           name='addfolder'
//           size={120}
//           onPress={this._pickImage}
//         /> */}
//         <AntDesign
//           name='back'
//           size={120}
//           onPress={() => onBackButtonPress()}
//         />
//         {maybeRenderImage()}
//         {maybeRenderUploadingOverlay()}
//         <StatusBar barStyle="default" />
//       </View>
//     );
//   }

  

  //   return (
  //     <View style={styles.view}>
  //       <Entypo
  //         name='camera'
  //         size={120}
  //         onPress={() => takePhoto()} title="Take a photo"
  //       />
  //       {/* <AntDesign
  //         name='addfolder'
  //         size={120}
  //         onPress={this._pickImage}
  //       /> */}
  //       <AntDesign
  //         name='back'
  //         size={120}
  //         onPress={() => onBackButtonPress()}
  //       />
  //       {maybeRenderImage()}
  //       {maybeRenderUploadingOverlay()}
  //       <StatusBar barStyle="default" />
  //     </View>
  //   );
  // }

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
          {maybeRenderImage()}
          {maybeRenderUploadingOverlay()}
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
  exampleText: {
    fontSize: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  maybeRenderUploading: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  maybeRenderContainer: {
    borderRadius: 3,
    elevation: 2,
    marginTop: 30,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    width: 250,
  },
  maybeRenderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: 'hidden',
  },
  maybeRenderImage: {
    height: 250,
    width: 250,
  },
  maybeRenderImageText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "gold",
  },
});


// import * as ImagePicker from "expo-image-picker";
// import * as firebase from "../firebase";
// import React from "react";
// import { ActivityIndicator, Dimensions, Button, Image, Share, StatusBar, StyleSheet, Text, View, LogBox, Pressable } from "react-native";
// import { Entypo, AntDesign } from '@expo/vector-icons'
// import * as Clipboard from "expo-clipboard";
// import uuid from "uuid";
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
// // import {getStorage, ref} from "firebase/firebase-storage"

// export default class PictureUpload extends React.Component {
//   state = {
//     image: null,
//     uploading: false,
//   };

//   async componentDidMount() {
//     if (Platform.OS !== "web") {
//       const {
//         status,
//       } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== "granted") {
//         alert("Sorry, we need camera roll permissions to make this work!");
//       }
//     }
//   }

//   render() {
//     let { image } = this.state;

//     return (  
//       <View style={styles.view}>
//         <Entypo 
//           name='camera'
//           size={120}
//           onPress={this._takePhoto} title="Take a photo"
//         />
//         <AntDesign
//           name='addfolder'
//           size={120}
//           onPress={this._pickImage}
//         />
//         {!!image && (
//           <Text
//             style={{
//               fontSize: 20,
//               marginBottom: 20,
//               textAlign: "center",
//               marginHorizontal: 15,
//             }}
//           >
//             Example: Upload ImagePicker result
//           </Text>
//         )}
//         <AntDesign 
//           name='back'
//           size={120}
//           onPress={() => this.props.hideUploadPicture()}
//         />
//         {this._maybeRenderImage()}
//         {this._maybeRenderUploadingOverlay()}
//         <StatusBar barStyle="default" />
//       </View>
//     );
//   }

//   _maybeRenderUploadingOverlay = () => {
//     if (this.state.uploading) {
//       return (
//         <View
//           style={[
//             StyleSheet.absoluteFill,
//             {
//               backgroundColor: "rgba(0,0,0,0.4)",
//               alignItems: "center",
//               justifyContent: "center",
//             },
//           ]}
//         >
//           <ActivityIndicator color="#fff" animating size="large" />
//         </View>
//       );
//     }
//   };

//   _maybeRenderImage = () => {
//     let { image } = this.state;
//     if (!image) {
//       return;
//     }

//     return (
//       <View
//         style={{
//           marginTop: 30,
//           width: 250,
//           borderRadius: 3,
//           elevation: 2,
//         }}
//       >
//         <View
//           style={{
//             borderTopRightRadius: 3,
//             borderTopLeftRadius: 3,
//             shadowColor: "rgba(0,0,0,1)",
//             shadowOpacity: 0.2,
//             shadowOffset: { width: 4, height: 4 },
//             shadowRadius: 5,
//             overflow: "hidden",
//           }}
//         >
//           <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
//         </View>
//         <Text
//           onPress={this._copyToClipboard}
//           onLongPress={this._share}
//           style={{ paddingVertical: 10, paddingHorizontal: 10 }}
//         >
//           {image}
//         </Text>
//       </View>
//     );
//   };

//   _share = () => {
//     Share.share({
//       message: this.state.image,
//       title: "Check out this photo",
//       url: this.state.image,
//     });
//   };

//   _copyToClipboard = () => {
//     Clipboard.setString(this.state.image);
//     alert("Copied image URL to clipboard");
//   };

//   _takePhoto = async () => {
//     let pickerResult = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//     });

//     this._handleImagePicked(pickerResult);
//   };

//   _pickImage = async () => {
//     let pickerResult = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//     });

//     this._handleImagePicked(pickerResult);
//   };

//   _handleImagePicked = async (pickerResult) => {
//     try {
//       this.setState({ uploading: true });
//       if (!pickerResult.cancelled) {
//         const uploadUrl = await uploadImageAsync(pickerResult.uri);
//         this.setState({ image: uploadUrl });
//         console.log(this.state)
//       }
//     } catch (e) {
//       console.log(e);
//       alert("Upload failed, sorry :(");
//     } finally {
//       this.setState({ uploading: false });
//     }
//   };
// }

// async function uploadImageAsync(uri) {
//   const blob = await new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.onload = function () {
//       resolve(xhr.response);
//     };
//     xhr.onerror = function (e) {
//       console.log(e);
//       reject(new TypeError("Network request failed"));
//     };
//     xhr.responseType = "blob";
//     xhr.open("GET", uri, true);
//     xhr.send(null);
//   });

//   const ref = firebase.storage().ref().child(uuid.v4());
//   const snapshot = await ref.put(blob);

//   blob.close();

//   return await snapshot.ref.getDownloadURL();
// }

// styles = StyleSheet.create({
//   view: {
//     width: windowWidth,
//     height: windowHeight,
//     alignItems: "center",
//     justifyContent: "space-evenly",
//     backgroundColor: 'beige',
//   },
// })