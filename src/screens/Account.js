import React, {useState, useEffect} from "react";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import Dashboard from "../components/Dashboard";
import { createStackNavigator } from '@react-navigation/stack';
import firebase from "../firebase";

const Stack = createStackNavigator();

function MyStack() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(setLoggedIn);
  }, []);

    if (loggedIn) {
      return (
        <Stack.Navigator headerShown={false} >
          <Stack.Screen 
            name="Dashboard" 
            component={Dashboard} 
            options={{ title: 'Dashboard',
            headerShown: false  }}
          />
        </Stack.Navigator>
      )
    } else {
  return (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#38A3EA',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ title: 'Signup',
        headerShown: false }}
      />
      <Stack.Screen 
        name="Signin" 
        component={Signin} 
        options={
          {title: 'Signin',
          headerShown: false }
        }
      />
      <Stack.Screen 
       name="Dashboard" 
       component={Dashboard} 
       options={
         { title: 'Dashboard',
         headerShown: false  }
       }
      />
    </Stack.Navigator>
  );
}}

export default function Account() {
  return (
    <React.Fragment>
      <MyStack/>
    </React.Fragment>
  )
}