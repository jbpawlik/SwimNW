import React from "react";
import firebase from "firebase/app";
import {Text, StyleSheet, View, TextInput, Button} from 'react-native';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserForm from "../components/UserForm";


function Account(){  

 
  
  return (
    <React.Fragment>
      <View>
        {/* <UserForm/> */}
      </View>
      {/* <h1>Sign up</h1>
      <Form onSubmit={doSignUp}>
        <input
          type='text'
          name='email'
          placeholder='email' />
        <input
          type='password'
          name='password'
          placeholder='Password' />
        <button type='submit'>Sign up</button>
      </form>
      <h1>Sign In</h1>
      <form onSubmit={doSignIn}>
        <input
          type='text'
          name='signinEmail'
          placeholder='email' />
        <input
          type='password'
          name='signinPassword'
          placeholder='Password' />
        <button type='submit'>Sign in</button>
      </form>
      <h1>Sign Out</h1>
      <Button onClick={doSignOut}>Sign outr</Button> */}
    </React.Fragment>
  )
}
export default Account