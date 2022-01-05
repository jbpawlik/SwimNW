// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Image, Button } from 'react-native';
// import { AntDesign, Entypo } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
// import colors from '../colors'
// import firebase from '../firebase';

// // // Upload to Firebase:
// // // // Create a root reference
// // const storageRef = firebase.storage().ref();
// // // // Create a reference to 'photo.jpg'
// // const imagesRef = storageRef.child('photo.jpg');;
// // // // Create a reference to 'images/photo.jpg'
// // const savedImagesRef = storageRef.child('images/photo.jpg');
// // // // While the file names are the same, the references point to different files
// // imagesRef.name === savedImagesRef.name;           // true
// // imagesRef.fullPath === savedImagesRef.fullPath;   // false 


// export default function TakePictureScreenFunc({route, navigation}) {
//   // const [pickedImagePath, setPickedImagePath] = useState('');

//   const { pickedImagePath } = route.params
//   console.log(pickedImagePath)
  
//   const openCamera = async () => {
//     // const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

//     // if (permissionResult.granted === false) {
//     //   alert("Permission denied.");
//     //   return;
//     // }

//     // const result = await ImagePicker.launchCameraAsync();

//     // if (!result.cancelled) {
//     //   // setPickedImagePath(result.uri);
//     // }
//   }

//   // Haven't saved yet - don't need to
//   const uploadBlob = (file) => {
//     savedImagesRef.put(file).then((snapshot) => {
//       console.log('Uploaded a blob or file!');
//     });
//     // [END storage_upload_blob]
//   }

//   const onBackButtonPress = () => {
//     navigation.navigate("CentralMapScreen");
//   }

//   const onCheckButtonPress = () => {
//     // console.log(pickedImagePath)
//     navigation.navigate('GeotagScreen', {pickedImagePath})
//   }

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

//   return (
//     <View style={styles.screen}>
//       { !pickedImagePath ?
//         <View style={{ flex: 1, justifyContent: 'space-between'}}>
//           <Entypo
//             name='camera'
//             size={180}
//             onPress={openCamera} title="Take a photo"
//           />
//           <AntDesign
//             name='back'
//             size={180}
//             onPress={() => onBackButtonPress()}
//           />
//         </View>
//         :
//         <View style={styles.imageContainer}>
//           {
//             pickedImagePath !== '' && <Image
//             source={{ uri: pickedImagePath }}
//             style={styles.image}
//             />
//           }
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
//             <AntDesign
//               name='close'
//               size={180}
//               onPress={() => setPickedImagePath(null)}
//             />
//             <AntDesign
//               name='check'
//               size={180}
//               onPress={() => onCheckButtonPress()}
//             />
//           </View>
//         </View>
//       }
//     </View>
//   )}

// const styles = StyleSheet.create({
//   screen: {
//     alignItems: 'center',
//     flex: 1,
//     justifyContent: "space-between",
//     backgroundColor: 'transparent',
//     padding: 50,
//   },
//   //   buttonContainer: {
//   //   width: 400,
//   //   flexDirection: 'row',
//   //   justifyContent: 'space'
//   // },
//   imageContainer: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'space-evenly',
//   },
//   image: {
//     width: 400,
//     height: 300,
//     resizeMode: 'cover'
//   }
// });

// // const styles = StyleSheet.create({
// //   screen: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   buttonContainer: {
// //     width: 400,
// //     flexDirection: 'row',
// //     justifyContent: 'space-around'
// //   },
// //   imageContainer: {
// //     padding: 30
// //   },
// //   image: {
// //     width: 400,
// //     height: 300,
// //     resizeMode: 'cover'
// //   }
// // });

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