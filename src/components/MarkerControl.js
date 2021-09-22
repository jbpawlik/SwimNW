import React from 'react';
import NewMarkerForm from './NewMarkerForm';
import Markers from './Markers';
import MarkerDetail from './MarkerDetail';
import EditMarkerForm from './EditMarkerForm';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';
import { withFirestore, isLoaded } from 'react-redux-firebase';

class MarkerControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedMarker: null,
      editing: false
    };
  }

  // componentDidMount() {
  //   this.waitTimeUpdateTimer = setInterval(() =>
  //     this.updateTicketElapsedWaitTime(),
  //   60000
  //   );
  // }

  // componentWillUnmount(){
  //   clearInterval(this.waitTimeUpdateTimer);
  // }

  // updateTicketElapsedWaitTime = () => {
  //   const { dispatch } = this.props;
  //   Object.values( this.props.firestore.get({collection: 'tickets'})).forEach(ticket => {
  //     const newFormattedWaitTime = ticket.timeOpen.fromNow(true);
  //     const action = a.updateTime(ticket.id, newFormattedWaitTime);
  //     dispatch(action);
  //   });
  // }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleChangingSelectedMarker = (id) => {
    this.props.firestore.get({collection: 'markers', doc: id}).then((marker) => {
      const firestoreMarker = {
        name: ticket.get("name"),
        id: ticket.id
      }
      this.setState({selectedMarker: firestoreMarker });
    });
  }

  handleAddingNewMarkerToList = () => {
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        selectedMarker: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  }

  handleDeletingMarker = (id) => {
    this.props.firestore.delete({collection: 'marker', doc: id});
    this.setState({selectedMarket: null});
  }

  handleEditingMarkerInList = () => {
    this.setState({
      editing: false,
      selectedMarker: null
    });
  }

  render(){
    const auth = this.props.firebase.auth();
    if (!isLoaded(auth)) {
      return (
        <React.Fragment>
          <h1>Loading...</h1>
        </React.Fragment>
      )
    }
    if ((isLoaded(auth)) && (auth.currentUser == null)) {
      return (
        <React.Fragment>
          <h1>You must be signed in to create new markers.</h1>
        </React.Fragment>
      )
    } 
    if ((isLoaded(auth)) && (auth.currentUser != null)) {
      let currentlyVisibleState = null;
      let buttonText = null;
      if (this.state.editing ) {
        currentlyVisibleState = <EditMarkerForm marker = {this.state.selectedMarker} onEditMarker = {this.handleEditingMarkerInList} />
        buttonText = "Return to Marker List"
      } else if (this.state.selectedMarker != null) {
        currentlyVisibleState = 
        <MarkerDetail 
          marker = {this.state.selectedMarker} 
          onClickingDelete = {this.handleDeletingMarker} 
          onClickingEdit = {this.handleEditClick} />
          buttonText = "Back"
      } else if (this.props.formVisibleOnPage) {
        currentlyVisibleState = <NewMarkerForm onNewMarkerCreation={this.handleAddingNewMarkerToList}  />;
        buttonText = "Back";
      } else {
        currentlyVisibleState = <MarkerList markerList={this.props.masterMarkerList} onMarkerSelection={this.handleChangingSelectedMarker} />;
        buttonText = "Add Marker";
      return (
        <React.Fragment>
          {currentlyVisibleState}
          <button onClick={this.handleClick}>{buttonText}</button>
        </ React.Fragment>
      );
    }}
  }
}
MarkerControl.propTypes = {
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    formVisibleOnPage: state.formVisibleOnPage
  }
};

MarkerControl = connect(mapStateToProps)(MarkerControl);


export default withFirestore(MarkerControl);
