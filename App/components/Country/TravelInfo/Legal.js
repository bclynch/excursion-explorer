import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from "react-native";
import {Actions} from "react-native-router-flux";

const styles = {

};

const width = Dimensions.get('window').width;

export default class Health extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <Text>Law</Text>
        <Text>{this.props.data.law}</Text>
        <Text>Embassy</Text>
        <Text>{this.props.data.embassy}</Text>
      </ScrollView>
    );
  }
}
