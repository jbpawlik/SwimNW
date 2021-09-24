import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import { useFirestore } from 'react-redux-firebase'


function NewMarker(props){
  const firestore = useFirestore();

  function addMarkerToFirestore(event) {
    event.preventDefault();
    props.onNewMarkerCreation();
    return firestore.collection('markers').add(
      {
        title: event.target.title.value,
        latitude: event.target.latitude.value, 
        longitude: event.target.longitude.value
      }
    );
  }
  
  return (
    <React.Fragment>
      <ReusableForm/>
    </React.Fragment>
  );
}

NewMarker.propTypes = {
  onNewMarkerCreation: PropTypes.func
};

export default NewMarker;
