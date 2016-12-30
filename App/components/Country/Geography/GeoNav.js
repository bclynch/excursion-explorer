import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions} from "react-native";
import {Actions} from "react-native-router-flux";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomTabBar from '../../CustomTabBar.js';
import NavBar from '../../NavBar.js';
import Map from './Map.js';
import Weather from './Weather.js';
import Terrain from './Terrain.js';

const styles = {

};

const width = Dimensions.get('window').width;

export default class GeoNav extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <NavBar allCountries={this.props.allCountries} countryRegions={this.props.countryRegions} favorites={this.props.favorites} cachedCountries={this.props.cachedCountries} backArrow={true} />
        <ScrollableTabView tabBarPosition='bottom'  renderTabBar={() => <CustomTabBar someProp={'here'} />}>
          <Weather tabLabel="Weather" />
          <Map tabLabel="Map" position={this.props.countryData.general.latlng} />
          <Terrain tabLabel="Terrain" />
        </ScrollableTabView>
      </View>
    );
  }
}
