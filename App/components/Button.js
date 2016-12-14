import React, { Component } from 'react';
import { AppRegistry, TouchableHighlight, Text } from 'react-native';

export default class Button extends Component {
  render() {
    return (
      <TouchableHighlight
        style={this.props.btnStyle}
        underlayColor="#B5B5B5"
        onPress={() => {
          this.props.onPress();
        }}>
        <Text style={this.props.btnTextStyle}>{this.props.text}</Text>
      </TouchableHighlight>
    )
  }
}
