import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import { useFirestore } from 'react-redux-firebase'


function NewMarkerForm(props){
  const firestore = useFirestore();

  function addMarkerToFirestore(event) {
    event.preventDefault();

    props.onNewMarkerCreation();

    return firestore.collection('markers').add(
      {
        name: event.target.name.value,
        timeCreated: firestore.FieldValue.serverTimestamp()
      }
    );
  }
  
  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={addMarkerToFirestore}
        buttonText="Help!" 
      />
    </React.Fragment>
  );
}

NewMarkerForm.propTypes = {
  onNewMarkerCreation: PropTypes.func
};

export default NewMarkerForm;
