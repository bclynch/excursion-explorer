import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, ActivityIndicator} from "react-native";
import {Actions} from "react-native-router-flux";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import store from 'react-native-simple-store';
import CustomTabBar from '../../CustomTabBar.js';
import NavBar from '../../NavBar.js';

import Health from './Health.js';
import Transport from './Transport.js';
import Money from './Money.js';
import Legal from './Legal.js';
import travelInfo from '../../../../assets/TravelWarnings/formattedTravelWarningsOct_16.json';

const styles = {

};

const width = Dimensions.get('window').width;

export default class TravelInfoNav extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <NavBar allCountries={this.props.allCountries} countryRegions={this.props.countryRegions} favorites={this.props.favorites} cachedCountries={this.state.cachedCountries} backArrow={true} />
        <ScrollableTabView tabBarPosition='bottom'  renderTabBar={() => <CustomTabBar someProp={'here'} />}>
          <Health tabLabel="Health + Dangers" data={travelInfo[this.props.countryData.general.alpha2Code]} />
          <Legal tabLabel="Legal Matters" data={travelInfo[this.props.countryData.general.alpha2Code]} />
          <Transport tabLabel="Getting In + Around" data={travelInfo[this.props.countryData.general.alpha2Code]} />
          <Money tabLabel="Money + Costs" data={travelInfo[this.props.countryData.general.alpha2Code]} />
        </ScrollableTabView>
      </View>
    );
  }
}
