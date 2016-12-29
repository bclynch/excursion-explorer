import React, { Component } from 'react';
import {View, Text, TouchableHighlight, Dimensions, Image} from "react-native";
import {Actions} from "react-native-router-flux";
import Icon from 'react-native-vector-icons/FontAwesome';
import NavBar from '../NavBar.js';


const width = Dimensions.get('window').width;

const styles = {
  container: {
    alignItems: 'center'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 12
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {width: 2, height: 2}
  },
  image: {
    width: width,
    height: 175
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
        <Image resizeMode='stretch' style={styles.image} source={{uri: this.props.photo}}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{this.props.name}</Text>
          </View>
        </Image>
      </View>
    );
  }
}
