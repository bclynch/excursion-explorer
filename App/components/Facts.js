import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

export default class Facts extends Component {

  render() {
    return(
      <View style={{height: 300}} tabLabel='Facts'>
        <View style={{flex: 1, backgroundColor: 'powderblue'}} />
        <View style={{flex: 2, backgroundColor: 'skyblue'}} />
        <View style={{flex: 1, backgroundColor: 'steelblue'}} />
        <Text>{this.props.selectedCountry}</Text>
      </View>
    )
  }
}
