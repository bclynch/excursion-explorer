import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions} from "react-native";
import {Actions} from "react-native-router-flux";
import MapView from 'react-native-maps';

const styles = {
  map: {
    ...StyleSheet.absoluteFillObject,
    width: width,
    height: 300
  }
};

const width = Dimensions.get('window').width;

export default class Terrain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: this.props.position[0],
        longitude: this.props.position[1],
        latitudeDelta: 6,
        longitudeDelta: 6,
      }
    }
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text>Terrain</Text>
        <MapView
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          style={styles.map}
          mapType='terrain'
         />
      </View>
    );
  }
}
