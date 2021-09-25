// import React from 'react';
// import { Text, StyleSheet, View, TextInput, Button} from 'react-native';
// import { Formik, Form, Field, ErrorMessage } from 'formik';

// function doSignUp(event) {
//   event.preventDefault();
//   const email = event.target.email.value;
//   const password = event.target.password.value;
//   firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
//     console.log("successfully signed up!");
//   }).catch(function(error) {
//     console.log(error.message);
//   });
// }
// function doSignIn(event) {
//   event.preventDefault();
//   const email = event.target.signinEmail.value;
//   const password = event.target.signinPassword.value;
//   firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
//     console.log("Successfully signed in!");
//   }).catch(function(error) {
//     console.log(error.message);
//   });
// }
// function doSignOut() {
//   firebase.auth().signOut().then(function() {
//     console.log("Successfully signed out!");
//   }).catch(function(error) {
//     console.log(error.message);
//   });
// }



// // export const UserForm = props => (
// //   <Formik
// //      initialValues={{ email: '' }}
// //      onSubmit={values => console.log(values)}
// //    >
// //      {({ handleChange, handleBlur, handleSubmit, values }) => (
// //        <View>
// //          <TextInput
// //            onChangeText={handleChange('email')}
// //            onBlur={handleBlur('email')}
// //            value={values.email}
// //          />
// //          <Button onPress={handleSubmit} title="Submit" />
// //        </View>
// //      )}
// //    </Formik>
//       // <Formik
//       //   initialValues={{ email: '', password: '' }}
//       //   validate={values => {
//       //     const errors = {};
//       //     if (!values.email) {
//       //       errors.email = 'Required';
//       //     } else if (
//       //       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//       //     ) {
//       //       errors.email = 'Invalid email address';
//       //     }
//       //     return errors;
//       //   }}
//       //   onSubmit={(values, { setSubmitting }) => {
//       //     setTimeout(() => {
//       //       alert(JSON.stringify(values, null, 2));
//       //       setSubmitting(false);
//       //     }, 400);
//       //   }}
//       // >
//       //   {({ isSubmitting }) => (
//       //     <Form>
//       //       <Field type="email" name="email" />
//       //       <ErrorMessage name="email" component="View" />
//       //       <Field type="password" name="password" />
//       //       <ErrorMessage name="password" component="View" />
//       //       <Button onPress={doSignUp}/>
//       //     </Form>
//       //   )}
//       // </Formik>
//   // );