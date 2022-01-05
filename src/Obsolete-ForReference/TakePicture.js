import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../firebase';

// // Upload to Firebase:
// // // Create a root reference
// const storageRef = firebase.storage().ref();
// // // Create a reference to 'photo.jpg'
// const imagesRef = storageRef.child('photo.jpg');;
// // // Create a reference to 'images/photo.jpg'
// const savedImagesRef = storageRef.child('images/photo.jpg');
// // // While the file names are the same, the references point to different files
// imagesRef.name === savedImagesRef.name;           // true
// imagesRef.fullPath === savedImagesRef.fullPath;   // false 


export default function TakePictureScreenFunc({route, navigation}) {
  const [pickedImagePath, setPickedImagePath] = useState('');

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
      // setPickedImagePath(result.uri);
    }
  }

  // Haven't saved yet - don't need to
  const uploadBlob = (file) => {
    savedImagesRef.put(file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
    // [END storage_upload_blob]
  }

  const onBackButtonPress = () => {
    navigation.navigate("CentralMapScreen");
  }

  const onCheckButtonPress = () => {
    // navigation.navigate('GeotagScreen', {pickedImagePath})
  }

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
            onPress={openCamera} title="Take a photo"
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
  }
});


// // import React, { Component, useState, useEffect } from 'react';
// // import { ActivityIndicator, Button, Clipboard, Image, Share, StatusBar, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
// // // import * as Permissions from 'expo-permissions';
// // import * as ImagePicker from 'expo-image-picker';
// // import { AntDesign, Entypo } from '@expo/vector-icons';
// // import colors from '../colors'
// // import { getStorage, ref } from "firebase/storage";
// // import firebase from '../firebase';

// // // const storageRef = firebase.storage().ref();
// // // const photoRef = storageRef.child('photo.png');
// // // const mountainImagesRef = storageRef.child('images/photo.png');

// // const TakePictureScreenFunc = ({route, navigation}) => {
// //   const [photoURL, setPhotoUrl] = useState('');
// //   const [image, setImage] = useState(null)
// //   const [uploading, setUploading] = useState(false);
// //   const [loadingPic, setLoadingPic] = useState({})
// //   const user = firebase.auth().currentUser;


// //   const onBackButtonPress = () => {
// //     navigation.navigate("CentralMapScreen");
// //   }

// //   const saveImage = (uploadResult) => {
// //     setImage({
// //       image: uploadResult
// //   }, setLoadingPic({
// //     loadingPic: true,
// //   }))}


// //   const handleImagePicked = async pickerResult => {
// //     const uploadResult = await uploadImageAsync(pickerResult.uri)
// //     // console.log(uploadResult)
// //     saveImage(uploadResult, navigation.navigate('GeotagScreen', {image}))
// //   }

// //   const takePhoto = async () => {
// //     // const {
// //     //   status: cameraPerm
// //     // } = await Permissions.askAsync(Permissions.CAMERA);

// //     // const {
// //     //   status: cameraRollPerm
// //     // } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

// //     // only if user allows permission to camera AND camera roll
// //     // if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
// //       const pickerResult = await ImagePicker.launchCameraAsync({
// //         allowsEditing: true,
// //         aspect: [4, 3],
// //       });

// //       handleImagePicked(pickerResult);
// //     // }
// //   };

// //   const maybeRenderUploadingOverlay = () => {
// //     if (uploading) {
// //       return (
// //         <View
// //           style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
// //           <ActivityIndicator color="#fff" size="large" />
// //         </View>
// //       );
// //     }
// //   };

// //   const maybeRenderImage = () => {
// //     const {
// //       image
// //     } = photoURL;

// //     if (!image) {
// //       return;
// //     }

// //     return (
// //       <View>
// //         { loading ? (
// //           <Modal
// //             style={styles.maybeRenderContainer}>
// //             <View
// //               style={styles.maybeRenderImageContainer}>
// //               <Image source={{ uri: image }} style={styles.maybeRenderImage} />
// //             </View>

// //             <Text
// //               onPress={()=> setLoading(true), navigation.navigate('CentralMapScreen')}
// //               onLongPress={share}
// //               style={styles.maybeRenderImageText}>
// //               Approve
// //             </Text>
// //           </Modal>
// //         ) : (
// //           <></>
// //         )
// //       }</View>)}

// //   const share = () => {
// //     Share.share({
// //       message: image,
// //       title: 'Check out this photo',
// //       url: image,
// //     });
// //   };

// //   const copyToClipboard = () => {
// //     Clipboard.setString(image);
// //     alert('Copied image URL to clipboard');
// //   };



// //   // _pickImage = async () => {
// //   //   // const {
// //   //   //   status: cameraRollPerm
// //   //   // } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

// //   //   // only if user allows permission to camera roll
// //   //   // if (cameraRollPerm === 'granted') {
// //   //     let pickerResult = await ImagePicker.launchImageLibraryAsync({
// //   //       allowsEditing: true,
// //   //       aspect: [4, 3],
// //   //     });

// //   //     this._handleImagePicked(pickerResult);
// //   //   // }
// //   // };

// // //   _handleImagePicked = async pickerResult => {
// // //     let uploadResponse, uploadResult;
// // //     try {
// // //       this.setState({
// // //         uploading: true
// // //       });

// // //       if (!pickerResult.cancelled) {
// // //         const uploadResponse = await uploadImageAsync(pickerResult.uri);
// // //         console.log(uploadResponse)
// // //         const uploadResult = await uploadResponse.json();
// // //         this.setState({
// // //           image: uploadResult.location
// // //         });

// // //         // console.log(uploadResponse)
// // //       }
// // //     } catch (e) {
// // //       // console.log({ uploadResponse });
// // //       // console.log({ uploadResult });
// // //       // console.log({ e });
// // //       // alert('Upload failed, sorry :(');
// // //     } finally {
// // //       this.setState({
// // //         uploading: false
// // //       });
// // //     }
// // //   };
// // // }


// // // Can't use setState here


// // async function uploadImageAsync(uri) {
// //   const blob = await new Promise((resolve, reject) => {
// //     const xhr = new XMLHttpRequest();
// //     xhr.onload = function () {
// //       resolve(xhr.response);
// //     };
// //     xhr.onerror = function (e) {
// //       reject(new TypeError('Network request failed'));
// //     };
// //     xhr.responseType = 'blob';
// //     xhr.open('GET', uri, true);
// //     xhr.send(null);
// //   });

// //   const ref = firebase
// //     .storage()
// //     .ref()
// //     .child('photo.png')
// //     const snapshot = await ref.put(blob);
// //     blob.close();
// //     return await snapshot.ref.getDownloadURL()
// // }

// // // async function uploadImageAsync(uri) {
// // //   // console.log(uri)
// // //   let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';
// // //   let uriParts = uri.split('.');
// // //   let fileType = uriParts[uriParts.length - 1];

// // //   let formData = new FormData();
// // //   formData.append('photo', {
// // //     uri,
// // //     name: `photo.${fileType}`,
// // //     type: `image/${fileType}`,
// // //   });
  
// // //   let options = {
// // //     method: 'POST',
// // //     body: formData,
// // //     headers: {
// // //       Accept: 'application/json',
// // //       'Content-Type': 'multipart/form-data',
// // //     },
// // //   };
// // //   // console.log(formData)
// // //   return fetch(apiUrl, options);
// // // }

// //     return (
// //       <View style={styles.view}>
// //         <Entypo
// //           name='camera'
// //           size={120}
// //           onPress={() => takePhoto()} title="Take a photo"
// //         />
// //         {/* <AntDesign
// //           name='addfolder'
// //           size={120}
// //           onPress={this._pickImage}
// //         /> */}
// //         <AntDesign
// //           name='back'
// //           size={120}
// //           onPress={() => onBackButtonPress()}
// //         />
// //         {maybeRenderImage()}
// //         {maybeRenderUploadingOverlay()}
// //         <StatusBar barStyle="default" />
// //       </View>
// //     );
// //   }

  

// // const styles = StyleSheet.create({
// //   container: {
// //     alignItems: 'center',
// //     flex: 1,
// //     justifyContent: 'center',
// //   },
// //   exampleText: {
// //     fontSize: 20,
// //     marginBottom: 20,
// //     marginHorizontal: 15,
// //     textAlign: 'center',
// //   },
// //   maybeRenderUploading: {
// //     alignItems: 'center',
// //     backgroundColor: 'rgba(0,0,0,0.4)',
// //     justifyContent: 'center',
// //   },
// //   maybeRenderContainer: {
// //     borderRadius: 3,
// //     elevation: 2,
// //     marginTop: 30,
// //     shadowColor: 'rgba(0,0,0,1)',
// //     shadowOpacity: 0.2,
// //     shadowOffset: {
// //       height: 4,
// //       width: 4,
// //     },
// //     shadowRadius: 5,
// //     width: 250,
// //   },
// //   maybeRenderImageContainer: {
// //     borderTopLeftRadius: 3,
// //     borderTopRightRadius: 3,
// //     overflow: 'hidden',
// //   },
// //   maybeRenderImage: {
// //     height: 250,
// //     width: 250,
// //   },
// //   maybeRenderImageText: {
// //     paddingHorizontal: 10,
// //     paddingVertical: 10,
// //   },
// //   view: {
// //     flex: 1,
// //     alignItems: "center",
// //     justifyContent: "space-evenly",
// //     backgroundColor: colors.gold,
// //   },
// // });

// // export default TakePictureScreenFunc;



// Obsolete class-based TakePicture screen
// import React, { useState, useEffect, useRef } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Row, Col } from 'react-native';
// import { Camera } from 'expo-camera';
// import { AntDesign, MaterialIcons } from '@expo/vector-icons';

// const WINDOW_HEIGHT = Dimensions.get('window').height;
// const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);

// export default function TakePicture(props) {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);
//   const cameraRef = useRef();
//   const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
//   const [isPreview, setIsPreview] = useState(false);
//   const [isCameraReady, setIsCameraReady] = useState(false);

//   useEffect(() => {
//     onHandlePermission();
//   }, []);

//   const onHandlePermission = async () => {
//     const { status } = await Camera.requestPermissionsAsync();
//     setHasPermission(status === 'granted');
//   };

//   const onCameraReady = () => {
//     setIsCameraReady(true);
//   };

//   const switchCamera = () => {
//     if (isPreview) {
//       return;
//     }
//     setCameraType(prevCameraType =>
//       prevCameraType === Camera.Constants.Type.back
//         ? Camera.Constants.Type.front
//         : Camera.Constants.Type.back
//     );
//   };

//   const onSnap = async () => {
//     if (cameraRef.current) {
//       const options = { quality: 0.7, base64: true };
//       const data = await cameraRef.current.takePictureAsync(options);
//       const source = data.base64;
  
//       if (source) {
//         await cameraRef.current.pausePreview();
//         setIsPreview(true);
//       }
//     }
//   };

//   const cancelPreview = async () => {
//     await cameraRef.current.resumePreview();
//     setIsPreview(false);
//   };

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text style={styles.text}>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Camera
//         ref={cameraRef}
//         style={styles.container}
//         type={cameraType}
//         onCameraReady={onCameraReady}
//       />
//     <View style={styles.container}>
//       {isPreview && (
//       <TouchableOpacity
//         onPress={cancelPreview}
//         style={styles.closeButton}
//         activeOpacity={0.7}
//       >
//         <AntDesign name='close' size={32} color='#fff'/>
//       </TouchableOpacity>
//       )}
//       {!isPreview && (
//         <View style={styles.bottomButtonsContainer}>
//           <TouchableOpacity
//             activeOpacity={0.7}
//             onPress={()=> props.hideTakePicture()}
//             style={styles.bottomButtons}
//           >
//             <AntDesign name='caretleft' size={72} color='white'/>
//           </TouchableOpacity>
//           <TouchableOpacity
//             activeOpacity={0.7}
//             disabled={!isCameraReady}
//             onPress={onSnap}
//             style={styles.capture}
//           />
//           <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
//             <MaterialIcons name='flip-camera-ios' size={80} color='white' />
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject
//   },
//   text: {
//     color: '#fff'
//   },
//   button: {
//     position: 'relative',
//     borderRadius: 4,
//     backgroundColor: '#ccc',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 100
//   },
//   camera: {
//     height: '100%',
//   },
//   buttonContainer: {
//     position: 'absolute',
//     bottom: 0,
//   },
//   bottomButtonsContainer: {
//     position: 'absolute',
//     flexDirection: 'row',
//     bottom: 28,
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   bottomButtons: {
//     padding: 5,
//   },
//   capture: {
//     backgroundColor: 'white',
//     borderRadius: 5,
//     borderColor: 'gray',
//     borderWidth: 5,
//     height: CAPTURE_SIZE,
//     width: CAPTURE_SIZE,
//     borderRadius: Math.floor(CAPTURE_SIZE / 2),
//     marginLeft: 20,
//     marginRight: 40,
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 100,
//     right: 20,
//     height: 50,
//     width: 50,
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#5A45FF',
//     opacity: 0.7
//   }
// })