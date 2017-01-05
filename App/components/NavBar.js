import React, { Component } from 'react';
import { AppRegistry, Text, View, TouchableHighlight, Dimensions } from 'react-native';
import {Actions} from "react-native-router-flux";
import Icon from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('window').width;

export default class NavBar extends Component {
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
        borderBottomColor: this.props.colors.primary,
        height: 80
      }
    }
    return (
      <View style={styles.container}>
        { this.props.backArrow ?
        <TouchableHighlight onPress={Actions.pop} title='Back' activeOpacity={0.1} underlayColor={this.props.colors.primary}>
          <Icon name="arrow-left" size={30} color={this.props.colors.primary} />
        </TouchableHighlight> :
        <TouchableHighlight activeOpacity={0.1} underlayColor={this.props.colors.primary} onPress={Actions.settings}>
          <Icon name="cog" size={30} color={this.props.colors.primary} />
        </TouchableHighlight> }
        <TouchableHighlight activeOpacity={0.1} underlayColor={this.props.colors.primary} onPress={() => Actions.home({allCountries: this.props.allCountries, countryRegions: this.props.countryRegions, favorites: this.props.favorites, cachedCountries: this.props.cachedCountries})}>
          <Icon name="rocket" size={30} color={this.props.colors.primary} />
        </TouchableHighlight>
        <TouchableHighlight activeOpacity={0.1} underlayColor={this.props.colors.primary} onPress={() => Actions.search({allCountries: this.props.allCountries, countryRegions: this.props.countryRegions, favorites: this.props.favorites, cachedCountries: this.props.cachedCountries})}>
          <Icon name="search" size={30} color={this.props.colors.primary} />
        </TouchableHighlight>
      </View>
    )
  }
}
