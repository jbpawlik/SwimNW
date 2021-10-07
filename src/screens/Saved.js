import * as React from 'react';
import { View, Text, ImageBackground, StyleSheet } from "react-native";

export default function SavedScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ImageBackground 
        style={styles.image} 
        source={require('../assets/images/tidepool.jpg')}
      />
      <Text style={{fontSize:16,fontWeight:'700'}}>My Swims:</Text>
    </View>
  );
}

  const styles = StyleSheet.create({
    image: {
      width: 600,
      height: 1200,
      overflow: 'hidden',
      position: 'absolute',
    },
    
  })