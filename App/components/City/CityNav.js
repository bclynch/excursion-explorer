import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, ActivityIndicator} from "react-native";
import {Actions} from "react-native-router-flux";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import store from 'react-native-simple-store';
import CustomTabBar from '../CustomTabBar.js';
import NavBar from '../NavBar.js';
import CityPortal from './CityPortal.js';

import API from '../../api.js';
import Keys from '../../../API_KEYS.js';

const styles = {

};

const width = Dimensions.get('window').width;

export default class CityNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cachedCountries: props.cachedCountries,
      cityInfo: props.cityInfo,
      readyToDisplay: false
    }
    this.snagData = this.snagData.bind(this);
    this.renderPortals = this.renderPortals.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.snagData(nextProps.cityInfo);
  }

  componentDidMount() {
    this.snagData(this.props.cityInfo);
  }

  snagData(cityData) {
    const self = this;

    // Perform API call if necessary
    if(cityData.features[this.props.option]) {
      //Use the data we already have
      console.log(`Grabbing existing ${this.props.option} data`);
      this.setState({readyToDisplay: true});
    } else {
      //Doesn't exist so grab data
      console.log(`grabbing new ${this.props.option} data`);
      API[this.props.API](cityData.lat, cityData.lon, Keys.HERE.appID, Keys.HERE.appCode).then((data) => {
        let featuresData = {};
        for(var i = 0; i < this.props.categories.length; i++) {
          featuresData[this.props.categories[i]] = data[i].results.items;
        }
        //Updating our data for cities, selectedcountry, and allcountries to cache new data
        const existingFeaturesInfo = cityData.features;
        existingFeaturesInfo[this.props.option] = featuresData;
        const existingCityInfo = cityData;
        existingCityInfo['features'] = existingFeaturesInfo;
        const existingCountryInfo = this.props.cachedCountries[cityData.country];
        existingCountryInfo.destinations.splice(this.props.index, 1, existingCityInfo);
        const cachedCountries = this.props.cachedCountries;
        cachedCountries[cityData.country] = existingCountryInfo;

        store.save('countries', cachedCountries);
        this.setState({cachedCountries: cachedCountries, cityInfo: existingCityInfo, readyToDisplay: true})
      }).catch(function(err) {
        console.log(err);
      });
    }
  }

  renderPortals() {
    const self = this;
    return this.props.titles.map(function(item, i) {
      return (
        <CityPortal key={i} tabLabel={item} data={self.state.cityInfo} title={item} type={self.props.categories[i]} option={self.props.option} />
      );
    });
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <NavBar allCountries={this.props.allCountries} countryRegions={this.props.countryRegions} favorites={this.props.favorites} cachedCountries={this.state.cachedCountries} backArrow={true} />
        {
          this.state.readyToDisplay ?
            <ScrollableTabView tabBarPosition='bottom'  renderTabBar={() => <CustomTabBar someProp={'here'} />}>
              {this.renderPortals()}
            </ScrollableTabView>
          :
            <ActivityIndicator
              style={{height: 125}}
              size="large"
            />
        }
      </View>
    );
  }
}
