import React, {Component} from "react";
import {StyleSheet, Image, Icon, View} from "react-native"
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Account from "../screens/Account";
import { MaterialCommunityIcons, Feather, FontAwesome5, Entypo } from '@expo/vector-icons';
import DrawerItems from '../constants/DrawerItems';
import InfoScreen from '../screens/InfoScreen';
import SettingsScreen from '../screens/Settings';
import SavedScreen from '../screens/Saved';
import ReferScreen from '../screens/Refer';
import MapScreen from "../screens/MapScreen";
import { withRouter } from "react-router";

const Drawer = createDrawerNavigator();

export default function DrawerMenu() {

  return (
    <React.Fragment>
      <NavigationContainer>
        <Drawer.Navigator 
          drawerType='slide'
          initialRouteName="Map"
          screenOptions={{
            headerShown: true,
            headerTransparent: true,

            // headerLeft: ()=> (
            //   <View>
            //   <FontAwesome5
            //         name="water"
            //         size={24}
            //         color='black'
            //         onPress={() => Drawer.openDrawer()}
            //       />
            //   </View>
            // ),
            // title: '',
            // drawerLabel: '',
            headerTitleAlign: 'center',
            activeTintColor: '#e91e63',
            headerTitleContainerStyle: {
              display: 'none',
            },
            headerLeftContainerStyle: {
              backgroundColor: '#73BFFB',
              borderRadius: 10,
              marginRight: 260,
              marginLeft: 40,
            },
            itemStyle: { marginVertical: 10 },
          }}>
          {
            DrawerItems.map(drawer=>
            <Drawer.Screen 
              key={drawer.name}
              name={drawer.name}
              component={
                drawer.name==='Map'? MapScreen 
                : drawer.name==='SwimNW' ? InfoScreen 
                : drawer.name==='Settings' ? SettingsScreen
                : drawer.name==='My Swims' ? SavedScreen
                : Account
              }
              options={{
                drawerIcon:({focused})=>
                drawer.iconType==='Entypo' ?
                  <MaterialCommunityIcons
                    name="map"
                    size={24}
                    color={focused ? "#e91e63" : "black"}
                  />
                :
                drawer.iconType==='Material' ? 
                  <MaterialCommunityIcons 
                      name={drawer.iconName}
                      size={24} 
                      color={focused ? "#e91e63" : "black"} 
                  />
                :
                drawer.iconType==='Feather' ?
                  <Feather 
                    name={drawer.iconName}
                    size={24} 
                    color={focused ? "#e91e63" : "black"} 
                  /> 
                :
                  <FontAwesome5 
                    name={drawer.iconName}
                    size={24} 
                    color={focused ? "#e91e63" : "black"} 
                  />
                }}
            />
           )
          }
        </Drawer.Navigator>
      </NavigationContainer>
    </React.Fragment>
  )
}
