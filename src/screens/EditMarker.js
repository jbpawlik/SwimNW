import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";
import { useFirestore } from 'react-redux-firebase';


function EditMarkerForm(props){
  const firestore = useFirestore();
  const { marker } = props;

  function handleEditMarkerFormSubmission(event) {
    event.preventDefault();
    props.onEditMarker();
    const propertiesToUpdate = {
      name: event.target.name.value
    }
    return firestore.update({collection: 'markers', doc: marker.id }, propertiesToUpdate)
  }
  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleEditMarkerFormSubmission}
        buttonText="Update Swim" />
    </React.Fragment>
  );
}


EditMarkerForm.propTypes = {
  marker: PropTypes.object,
  onEditMarker: PropTypes.func
};

export default EditMarkerForm;