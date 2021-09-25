import React, {Component} from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Account from "../screens/Account";
import { MaterialCommunityIcons, Feather, FontAwesome5, Entypo } from '@expo/vector-icons';
import DrawerItems from '../constants/DrawerItems';
import ProfileScreen from '../screens/Profile';
import SettingsScreen from '../screens/Settings';
import SavedScreen from '../screens/Saved';
import ReferScreen from '../screens/Refer';
import MapScreen from "../screens/MapScreen";

const Drawer = createDrawerNavigator();

export default function DrawerMenu() {

  return (
    <React.Fragment>
      <NavigationContainer>
        <Drawer.Navigator 
          // drawerType='front'
          initialRouteName="Map"
          screenOptions={{
            // drawerType: 'slide',
            activeTintColor: '#e91e63',
            itemStyle: { marginVertical: 10 },
          }}>
          {
            DrawerItems.map(drawer=>
            <Drawer.Screen 
              key={drawer.name}
              name={drawer.name}
              component={
                drawer.name==='Map'? MapScreen 
                : drawer.name==='Profile' ? ProfileScreen 
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
            />)
          }
        </Drawer.Navigator>
      </NavigationContainer>
    </React.Fragment>
  )
}
