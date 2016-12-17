import React, { Component } from 'react';
import { AppRegistry, Text, View, Button } from 'react-native';
import {Actions} from "react-native-router-flux";

export default class CountrySplash extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <View>
        <Text>Country Splash {this.props.selectedCountry.name}</Text>
        <Button onPress={Actions.home} title='Home' />
      </View>
    )
  }
}
