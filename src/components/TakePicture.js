import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Row, Col } from 'react-native';
import { Camera } from 'expo-camera';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);

export default function TakePicture(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef();
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    onHandlePermission();
  }, []);

  const onHandlePermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType(prevCameraType =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const onSnap = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.7, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.base64;
  
      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
      }
    }
  };

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }


  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestPermissionsAsync();
  //     setHasPermission(status === 'granted');
  //   })();
  // }, []);

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.container}
        type={cameraType}
        onCameraReady={onCameraReady}
      />
    <View style={styles.container}>
      {isPreview && (
      <TouchableOpacity
        onPress={cancelPreview}
        style={styles.closeButton}
        activeOpacity={0.7}
      >
        <AntDesign name='close' size={32} color='#fff'/>
      </TouchableOpacity>
      )}
      {!isPreview && (
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={()=> props.hideTakePicture()}
            style={styles.bottomButtons}
          >
            <AntDesign name='caretleft' size={72} color='white'/>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={!isCameraReady}
            onPress={onSnap}
            style={styles.capture}
          />
          <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
            <MaterialIcons name='flip-camera-ios' size={80} color='white' />
          </TouchableOpacity>
        </View>
      )}
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  text: {
    color: '#fff'
  },
  button: {
    position: 'relative',
    borderRadius: 4,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100
  },
  camera: {
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
  },
  bottomButtonsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 28,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomButtons: {
    padding: 5,
  },
  capture: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 5,
    height: CAPTURE_SIZE,
    width: CAPTURE_SIZE,
    borderRadius: Math.floor(CAPTURE_SIZE / 2),
    marginLeft: 20,
    marginRight: 40,
  },
  closeButton: {
    position: 'absolute',
    top: 100,
    right: 20,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5A45FF',
    opacity: 0.7
  }
})