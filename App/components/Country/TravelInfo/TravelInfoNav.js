import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, ActivityIndicator} from "react-native";
import {Actions} from "react-native-router-flux";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import store from 'react-native-simple-store';
import CustomTabBar from '../../CustomTabBar.js';
import NavBar from '../../NavBar.js';

import TravelInfoPortal from './TravelInfoPortal.js';
import Money from './Money.js';
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
    const dataObj = travelInfo[this.props.countryData.general.alpha2Code];
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <NavBar allCountries={this.props.allCountries} countryRegions={this.props.countryRegions} favorites={this.props.favorites} cachedCountries={this.props.cachedCountries} backArrow={true} />
        <ScrollableTabView tabBarPosition='bottom'  renderTabBar={() => <CustomTabBar someProp={'here'} />}>
          <TravelInfoPortal tabLabel="Safety" colors={this.props.colors} data={[{header: 'Safety', icon: 'warning', content: dataObj.safety}, {header: 'Health', icon: 'medkit', content: dataObj.health}, {header: 'Law', icon: 'gavel', content: dataObj.law}, {header: 'Embassy', icon: 'building', content: dataObj.embassy}]} />
          <TravelInfoPortal tabLabel="Getting In + Around" colors={this.props.colors} data={[{header: 'Entry', icon: 'book', content: dataObj.entry}, {header: 'Transport', icon: 'bus', content: dataObj.transport}]} />
          <Money tabLabel="Money" data={travelInfo[this.props.countryData.general.alpha2Code]} />
        </ScrollableTabView>
      </View>
    );
  }
}
