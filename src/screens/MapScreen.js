import React from "react";
import Map from '../components/Map'
import ReusableForm from "../components/ReusableForm";

export default class MapScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tempCoordinate: {},
      showForm: false
    }
  }

  setTempCoordinate = (data) => {
    this.setState({tempCoordinate: data})
  }

  goToNewMarkerScreen = () => {
    this.props.navigation.navigate('Add Swim')
  }

  showReusableForm = () => {
    this.setState({ showForm: true})
  }

  hideReusableForm = () => {
    this.setState({ showForm: false})
  }

  render() {
    if (this.state.showForm === true) {
      return(
        <ReusableForm
          tempCoordinate={this.state.tempCoordinate}
          setTempCoordinate={this.setTempCoordinate}
          hideReusableForm={this.hideReusableForm}
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
          />
        </React.Fragment>
      )
    }
  }

}