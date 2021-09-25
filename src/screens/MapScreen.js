import React from "react";
import Map from '../components/Map'

export default class MapScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tempCoordinate: {}
    }
  }

  setTempCoordinate = (data) => {
    this.setState({tempCoordinate: data})
  }

  goToNewMarkerScreen = () => {
    this.props.navigation.navigate('Add Swim')
  }

  render() {
    return (
      <React.Fragment>
        <Map
        tempCoordinate={this.state.tempCoordinate}
        setTempCoordinate={this.setTempCoordinate}
        goToNewMarkerScreen={this.goToNewMarkerScreen}
        />
      </React.Fragment>
    )
  }

}