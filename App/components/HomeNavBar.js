import React, { Component } from 'react';
import { AppRegistry, Text, View, TouchableHighlight, Dimensions } from 'react-native';
import {Actions} from "react-native-router-flux";
import Icon from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('window').width;

export default class HomeNavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    const styles = {
      container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width * .85,
        borderBottomWidth: 2,
        borderBottomColor: "#cecece",
        height: 80
      }
    }
    return (
      <View style={styles.container}>
        <TouchableHighlight activeOpacity={0.1} underlayColor={'#eee'} onPress={() => Actions.search({allCountries: this.props.allCountries, countryRegions: this.props.countryRegions, favorites: this.props.favorites})}>
          <Icon name="search" size={30} color="#cecece" />
        </TouchableHighlight>
        <Text>ExcExp</Text>
        <TouchableHighlight activeOpacity={0.1} underlayColor={'#eee'} onPress={Actions.tabbar}>
          <Icon name="cog" size={30} color="#cecece" />
        </TouchableHighlight>
      </View>
    )
  }
}
