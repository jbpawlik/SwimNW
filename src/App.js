import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from './components/Map'
import Menu from './components/Menu';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from './screens/Profile';
import SettingsScreen from './screens/Settings';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import SavedScreen from './screens/Saved';
import ReferScreen from './screens/Refer';
import DrawerItems from './constants/DrawerItems';
import Header from './components/Header';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <React.Fragment>
      <NavigationContainer>
        <Drawer.Navigator 
          drawerType="front"
          initialRouteName="Profile"
          screenOptions={{
            activeTintColor: '#e91e63',
            itemStyle: { marginVertical: 10 },
          }}>
          {
            DrawerItems.map(drawer=>
            <Drawer.Screen 
              key={drawer.name}
              name={drawer.name}
              component={
                drawer.name==='Profile' ? ProfileScreen 
                : drawer.name==='Settings' ? SettingsScreen 
                : drawer.name==='Saved Items' ? SavedScreen
                : ReferScreen
              }
              options={{
                drawerIcon:({focused})=>
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
                  
                  
                  // ,
                  // headerShown: true,
                  // header: ({ navigation, route, options }) => {
                  //   const title =
                  //     options.headerTitle !== undefined
                  //     ? options.headerTitle
                  //     : options.title !== undefined
                  //     ? options.title 
                  //     : route.name;
                      
                  //     return (
                  //       <Header screen={title}/>
                  //     )
                      
                  // }
                  

                  //Shows up but doesn't do anything
                  // ,
                  // header: ({ navigation, route, options }) => {
                  //   const title =
                  //   options.headerTitle !== undefined
                  //   ? options.headerTitle
                  //   : options.title !== undefined
                  //   ? options.title
                  //   : route.name;
                  //   return (
                  //   <Header screen="{title}"/>
                  //   );
                  //   }

                }}
            />)
          }
        </Drawer.Navigator>
      </NavigationContainer>
      <Menu/>
      <Map/>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
