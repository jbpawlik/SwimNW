import React, {useEffect} from "react";
import Map from '../components/Map'
import ReusableForm from "../components/ReusableForm";
import EditMarker from "../components/EditMarker";
import MarkerDetail from "../components/MarkerDetail";
import TakePicture from "../components/TakePicture";
import PictureUpload from "../components/PictureUpload";
import firebase from "../firebase";

export default class MapScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tempCoordinate: {},
      showAddMarkerForm: false,
      showEditMarkerForm: false,
      showMarkerDetail: false,
      showTakePicture: false,
      showUploadPicture: false,
      selectedMarker: [],
      userID: 0,
      image: null,
      uploading: false,
    }
    this.user = firebase.auth().currentUser;
  }

  setTempCoordinate = (data) => {
    this.setState({tempCoordinate: data})
  }
  
  setUserID = (data) => {
    if (this.user != null) {
      this.setState({userID: data})
    } else {
      this.setState({userID: 0})
    }
  }

  showReusableForm = () => {
    this.setState({ showAddMarkerForm: true})
  }

  hideReusableForm = () => {
    this.setState({ showAddMarkerForm: false})
  }

  showEditMarkerForm = () => {
    this.setState({ showMarkerDetail: false})
    this.setState({ showEditMarkerForm: true})
  }

  hideEditMarkerForm = () => {
    this.setState({ showEditMarkerForm: false})
  }

  hideEditMarkerAndGoBackToMarkerDetail = () => {
    this.setState({ showEditMarkerForm: false})
    this.setState({ showMarkerDetail: true})
  }

  showMarkerDetail = () => {
    this.setState({ showMarkerDetail: true})
  }

  hideMarkerDetail = () => {
    this.setState({ showMarkerDetail: false})
  }

  showTakePicture = () => {
    this.setState({ showMarkerDetail: false})
    this.setState({ showTakePicture: true})
  }

  hideTakePicture = () => {
    this.setState({ showTakePicture: false})
    this.setState({ showMarkerDetail: true})
  }

  showUploadPicture = () => {
    this.setState({ showMarkerDetail: false})
    this.setState({ showUploadPicture: true})
  }

  hideUploadPicture = () => {
    this.setState({ showUploadPicture: false})
    this.setState({ showMarkerDetail: true})
  }

  render() {
    if (this.state.showAddMarkerForm === true) {
      return(
        <ReusableForm
          tempCoordinate={this.state.tempCoordinate}
          setTempCoordinate={this.setTempCoordinate}
          hideReusableForm={this.hideReusableForm}
          setUserID={this.setUserID}
          userID={this.userID}
          user={this.user}
        />
      )
    } else if (this.state.showEditMarkerForm === true) {
      return (
        <EditMarker
          hideEditMarkerForm={this.hideEditMarkerForm}
          selectedMarker={this.state.selectedMarker}
          hideEditMarkerAndGoBackToMarkerDetail={this.hideEditMarkerAndGoBackToMarkerDetail}
        />
      )
    } else if (this.state.showTakePicture === true) {
      return (
        <TakePicture
          hideTakePicture={this.hideTakePicture}
        />
      )
    } else if (this.state.showUploadPicture === true) {
      return (
        <PictureUpload
          hideUploadPicture={this.hideUploadPicture}
          image={this.state.image}
          uploading={this.state.uploading}
        />
      )
      } else if (this.state.showMarkerDetail === true) {
      return (
        <MarkerDetail
          hideMarkerDetail={this.hideMarkerDetail}
          selectedMarker={this.state.selectedMarker}
          showEditMarkerForm={this.showEditMarkerForm}
          showUploadPicture={this.showUploadPicture}
          showTakePicture={this.showTakePicture}
          setUserID={this.setUserID}
          userID={this.userID}
          user={this.user}
        />
      )
    
    } else {
      return (
        <React.Fragment>
          <Map
            tempCoordinate={this.state.tempCoordinate}
            setTempCoordinate={this.setTempCoordinate}
            goToNewMarkerScreen={this.goToNewMarkerScreen}
            showReusableForm={this.showReusableForm}
            showEditMarkerForm={this.showEditMarkerForm}
            selectedMarker={this.state.selectedMarker}
            showMarkerDetail={this.showMarkerDetail}
            setUserID={this.setUserID}
            userID={this.userID}
          />
        </React.Fragment>
      )
    }
  }
}