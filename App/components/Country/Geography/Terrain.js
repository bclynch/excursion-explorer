import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions} from "react-native";
import {Actions} from "react-native-router-flux";

const styles = {

};

const width = Dimensions.get('window').width;

export default class Terrain extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text>Terrain</Text>
      </View>
    );
  }
}
