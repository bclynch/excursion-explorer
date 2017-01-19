import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions} from "react-native";
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
    const dataObj = travelInfo[this.props.countryData.general.alpha2Code] || {};
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <NavBar
          allCountries={this.props.allCountries}
          countryRegions={this.props.countryRegions}
          favorites={this.props.favorites}
          cachedCountries={this.props.cachedCountries}
          backArrow={true}
          colors={this.props.colors}
          settings={this.props.settings}
        />
        <ScrollableTabView
          tabBarPosition='bottom'
          renderTabBar={() => <CustomTabBar colors={this.props.colors} />}
        >
          <TravelInfoPortal
            tabLabel="Safety"
            colors={this.props.colors}
            lastUpdated={dataObj.updated[0]}
            data={[{header: 'Safety', content: dataObj.safety}, {header: 'Health', content: dataObj.health}, {header: 'Law', content: dataObj.law}, {header: 'Embassy', content: dataObj.embassy}]}
          />
          <TravelInfoPortal
            tabLabel="Getting In + Around"
            colors={this.props.colors}
            lastUpdated={dataObj.updated[0]}
            data={[{header: 'Entry', content: dataObj.entry}, {header: 'Transport', content: dataObj.transport}]}
          />
          <Money
            tabLabel="Money"
            colors={this.props.colors}
            countryData={this.props.countryData}
          />
        </ScrollableTabView>
      </View>
    );
  }
}
