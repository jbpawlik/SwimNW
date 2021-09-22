import React from 'react';
import Marker from './Marker';
import PropTypes from "prop-types";
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'

function Markers(props){
  useFirestoreConnect([
    { collection: 'markers' }
  ]);
  const markers = useSelector(state => state.firestore.ordered.markers);
  if (isLoaded(markers)) {
    return (
      <React.Fragment>
        <hr/>
        {markers.map((marker) => {
          return <Marker
            whenMarkerClicked = { props.onMarkerSelection }
            name={marker.name}
            id={marker.id}
            key={marker.id}/>
        })}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    )
  }
}

Markers.propTypes = {
  onMarkerSelection: PropTypes.func
};

export default Markers;