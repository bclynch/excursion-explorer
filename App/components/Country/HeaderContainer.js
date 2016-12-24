import React, { Component } from 'react';
import {View, Text, TouchableHighlight, Dimensions} from "react-native";
import {Actions} from "react-native-router-flux";
import Icon from 'react-native-vector-icons/FontAwesome';
import NavBar from '../NavBar.js';


const width = Dimensions.get('window').width;

const styles = {
  container: {
    alignItems: 'center'
  }
}

export default class HeaderContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render(){
    return (
      <View style={styles.container}>
        <Text>{this.props.name}</Text>
      </View>
    );
  }
}
