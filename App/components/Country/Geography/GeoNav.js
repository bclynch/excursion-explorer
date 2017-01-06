import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, ActivityIndicator} from "react-native";
import {Actions} from "react-native-router-flux";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomTabBar from '../../CustomTabBar.js';
import store from 'react-native-simple-store';
import NavBar from '../../NavBar.js';
import Weather from './Weather.js';
import Terrain from './Terrain.js';
import Society from './Society.js';

import API from '../../../api.js';

const styles = {

};

const width = Dimensions.get('window').width;

export default class GeoNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cachedCountries: props.cachedCountries,
      readyToDisplay: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({readyToDisplay: false});
    this.snagData(nextProps.countryData);
  }

  componentDidMount() {
    this.snagData(this.props.countryData);
  }

  snagData(countryData) {
    const self = this;

    // Perform API call if necessary
    if(countryData.societyData) {
      //Use the data we already have
      console.log(`Grabbing existing society data`);
      this.setState({readyToDisplay: true});
    } else {
      //Doesn't exist so grab data
      console.log(`grabbing new society data`);
      API.countryTerrainData(this.props.countryData.general.alpha2Code).then((data) => {
        let societyData = {};
        function indentifierTags(id) {
          switch(id) {
            case 'AG.LND.AGRI.ZS':
              return 'agPercentageOfLand';
              break;
            case 'AG.LND.FRST.ZS':
              return 'frstPercentageOfLand';
              break;
            case 'SP.URB.TOTL':
              return 'totalUrbanPop';
              break;
            case 'SP.URB.TOTL.IN.ZS':
              return 'percentageUrbanOfTotal';
              break;
            case 'SP.POP.TOTL':
              return 'totalPopulation';
              break;
            case 'SP.RUR.TOTL':
              return 'totalRuralPop';
              break;
            case 'SP.RUR.TOTL.ZS':
              return 'percentageRuralOfTotal';
              break;
            case 'NY.GDP.MKTP.CD':
              return 'totalGDP';
              break;
            case 'NY.GDP.MKTP.KD.ZG':
              return 'gdpGrowth';
              break;
            case 'SL.UEM.TOTL.ZS':
              return 'unemployment';
              break;
            case 'EN.POP.SLUM.UR.ZS':
              return 'percentageInSlums';
              break;
            case 'SP.DYN.LE00.IN':
              return 'lifeExpectency';
              break;
            case 'SP.DYN.TFRT.IN':
              return 'fertilityRate';
              break;
            case 'IT.NET.USER.P2':
              return 'internetUsers';
              break;
            }
        }
        for(var i = 0; i < data.length; i++) {
          countryData[indentifierTags(data[i][1][0].indicator.id)] = data[i][1];
        }

        //Updating our data for cities, selectedcountry, and allcountries to cache new data
        const existingCountryInfo = countryData;
        existingCountryInfo['societyData'] = societyData;
        const cachedCountries = this.props.cachedCountries;
        cachedCountries[countryData.general.name] = existingCountryInfo;

        store.save('countries', cachedCountries);
        this.setState({cachedCountries: cachedCountries, readyToDisplay: true})
      }).catch(function(err) {
        console.log(err);
      });
    }
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <NavBar
          allCountries={this.props.allCountries}
          countryRegions={this.props.countryRegions}
          favorites={this.props.favorites}
          cachedCountries={this.state.cachedCountries}
          backArrow={true}
          colors={this.props.colors}
        />
        {
          this.state.readyToDisplay ?
            <ScrollableTabView tabBarPosition='bottom'  renderTabBar={() => <CustomTabBar someProp={'here'} />}>
              <Weather tabLabel="Weather" />
              <Society tabLabel="Society" />
              <Terrain tabLabel="Terrain" position={this.props.countryData.general.latlng} />
            </ScrollableTabView>
            :
            <ActivityIndicator
              style={{height: 125}}
              size="large"
              color={this.props.colors.tertiary}
            />
        }
      </View>
    );
  }
}
