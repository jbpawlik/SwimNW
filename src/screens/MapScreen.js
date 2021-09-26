import React from "react";
import Map from '../components/Map'
import ReusableForm from "../components/ReusableForm";
import EditMarker from "../components/EditMarker";
import MarkerDetail from "../components/MarkerDetail"

export default class MapScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tempCoordinate: {},
      showAddMarkerForm: false,
      showEditMarkerForm: false,
      showMarkerDetail: false,
      selectedMarker: [],
    }
  }

  setTempCoordinate = (data) => {
    this.setState({tempCoordinate: data})
  }

  goToNewMarkerScreen = () => {
    this.props.navigation.navigate('Add Swim')
  }

  showReusableForm = () => {
    this.setState({ showAddMarkerForm: true})
  }

  hideReusableForm = () => {
    this.setState({ showAddMarkerForm: false})
  }

  showEditMarkerForm = () => {
    this.setState({ showEditMarkerForm: true})
  }

  hideEditMarkerForm = () => {
    this.setState({ showEditMarkerForm: false})
  }

  showMarkerDetail = () => {
    this.setState({ showMarkerDetail: true})
  }

  hideMarkerDetail = () => {
    this.setState({ showMarkerDetail: false})
  }

  render() {
    if (this.state.showAddMarkerForm === true) {
      return(
        <ReusableForm
          tempCoordinate={this.state.tempCoordinate}
          setTempCoordinate={this.setTempCoordinate}
          hideReusableForm={this.hideReusableForm}
        />
      )
    } else if (this.state.showEditMarkerForm === true) {
      return (
        <EditMarker
          hideEditMarkerForm={this.hideEditMarkerForm}
          selectedMarker={this.state.selectedMarker}
        />
      )
    } else if (this.state.showMarkerDetail === true) {
      return (
        <MarkerDetail
          hideMarkerDetail={this.hideMarkerDetail}
          selectedMarker={this.state.selectedMarker}
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
          />
        </React.Fragment>
      )
    }
  }

}