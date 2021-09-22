import React from "react";
import PropTypes from "prop-types";

function Marker(props){
  return (
    <React.Fragment>
      <div onClick = {()=> props.whenMarkerClicked(props.id)}>
        <h1>{props.name}</h1>
        <p>{props.dateCreated}</p>
        <hr/>
      </div>
    </React.Fragment>
  );
}

Marker.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  whenMarkerClicked: PropTypes.func,
  dateCreated: PropTypes.string
};
export default Marker;