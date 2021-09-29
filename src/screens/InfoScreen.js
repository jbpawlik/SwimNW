import React, {Container} from "react";
import {View, Text, StyleSheet, ImageBackground} from 'react-native'

export default function InfoScreen() {
  return (
    <React.Fragment>
      <View style={styles}>
      <ImageBackground 
          style={styles.image} 
          source={require('../assets/images/elkrock.jpg')}
        />
        <Text style={styles.info}>
          SwimNW is a resource for hydrophiles in the Pacific Northwest. The map shows swims of all different types, from community pools to hot springs.{'\n'}Users that create an account can add, edit, and delete swims.{'\n'}Users who contribute high-quality content will receive access to Protected swims. These are swims that others have chosen to keep out of the public eye.{'\n'}Users may also create Private swims, which will only be visible to them. You can see all of your swims in the My Swims tab.
        </Text>
      </View>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 600,
    height: 1200,
    overflow: 'hidden',
    position: 'absolute',
  },
  info: {
    
  }
})