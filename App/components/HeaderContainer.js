import React, { Component } from 'react';
import {View, Text, Dimensions, Image} from "react-native";
import {Actions} from "react-native-router-flux";

const width = Dimensions.get('window').width;

const styles = {
  container: {
    alignItems: 'center'
  },
  fastfacts: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 12
  },
  filterlist: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fastfactstext: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {width: 2, height: 2}
  },
  filterlisttext: {
    color: '#fff',
    fontSize: 35,
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
        {
          this.props.type === 'fastfacts' ?
          <Image resizeMode='stretch' style={styles.image} source={{uri: this.props.photo}}>
            <View style={styles[this.props.type]}>
              <Text style={styles[`${this.props.type}text`]}>{this.props.name}</Text>
            </View>
          </Image>
          :
          <Image resizeMode='stretch' style={styles.image} source={this.props.photo}>
            <View style={styles[this.props.type]}>
              <Text style={styles[`${this.props.type}text`]}>{this.props.name}</Text>
            </View>
          </Image>
        }
      </View>
    );
  }
}
