import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from "react-native";
import {Actions} from "react-native-router-flux";

const styles = {

};

const width = Dimensions.get('window').width;

export default class Transport extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
      <Text>Transportation</Text>
      <Text>{this.props.data.transport}</Text>
      <Text>Entry</Text>
      <Text>{this.props.data.entry}</Text>
      </ScrollView>
    );
  }
}
