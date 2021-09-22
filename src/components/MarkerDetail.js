import React from "react";
import PropTypes from "prop-types";

function MarkerDetail(props){
  const { marker, onClickingDelete } = props;

  return (
    <React.Fragment>
      <h1>Marker Detail</h1>
      <h3>{market.name}</h3>
      <button onClick={ props.onClickingEdit }>Edit Marker</button> 
      <button onClick={()=> props.onClickingDelete(marker.id) }>Close Marker</button>
    </React.Fragment>
  );
}

MarkerDetail.propTypes = {
  marker: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default MarkerDetail;