import React, { Component } from 'react';
import {View, Text, StyleSheet, Button, TouchableHighlight, ScrollView, Dimensions} from "react-native";
import {Actions} from "react-native-router-flux";
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/FontAwesome';

import NavBar from '../NavBar.js';
import FavoriteLocations from './FavoriteLocations.js';

import languageJSON from '../../../assets/languageCodes.json';
import currenciesJSON from '../../../assets/currencies.json';

import API from '../../api.js';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favorites: {countries: [], cities: []},
      cachedCountries: {},
      stateReady: false,
      settings: null
    }
    this.selectFavoriteCountry = this.selectFavoriteCountry.bind(this);
    this.selectFavoriteCity = this.selectFavoriteCity.bind(this);
    this.checkStore = this.checkStore.bind(this);
  }

  componentWillReceiveProps(props) {
    Actions.refresh(this.props.allCountries);
  }

  componentDidMount() {
    const self = this;

    store.get('appSettings').then((settings) => {
      if(settings) {
        this.setState({settings: settings});
        console.log('Accessing settings');
      } else {
        //if app settings haven't been set up then create the store
        store.save('appSettings', {units: 'imperial', temp: 'F'});
        this.setState({settings: {units: 'imperial', temp: 'F'}});
      }
    }).catch((err) => {
      console.log(err);
    });

    //If we already snagged our initial data then cont using props
    if(this.props.allCountries) {
      console.log('Using props data');
      self.setState({
        allCountries: this.props.allCountries,
        countryRegions: this.props.countryRegions,
        cachedCountries: this.props.cachedCountries,
        favorites: this.props.favorites,
        stateReady: true
      });
      return;
    }

    this.checkStore();
  }

  checkStore() {
    const self = this;
    //Checking local storage for existing data, if any
    store.get('allCountries')
      .then((countries) => {
        //Check our store to see if user has all countries cached
        //if so then set our allCountries state equal to the array
        if(countries) {
          console.log('Grabbing all countries from cache');
          //snagging cached regions information
          store.get('countryRegions')
            .then((regions) => {
              console.log('Regions: ', regions);
              console.log('All countries: ', countries);
              store.get('countries')
                .then((cachedCountries) => {
                  console.log('Cached countries: ', cachedCountries);
                  store.get('favorites')
                    .then((favorites) => {
                      console.log('Favorites: ', favorites);
                      self.setState({favorites: favorites, allCountries: countries, countryRegions: regions, cachedCountries: cachedCountries, stateReady: true});
                    });
                });
            });
        } else {
          API.grabAllCountries().then((data) => {
            const countryData = self.chopUpData(data);
            const languageData = self.convertLanguageData(languageJSON);
            store.save('allCountries', countryData.allCountries);
            console.log('Saving allCountries to storage');
            self.setState({countryRegions: countryData.regions, allCountries: countryData.allCountries, stateReady: true});
            //saving our chopped data as well to avoid the loop parsing on every refresh
            store.save('countryRegions', countryData.regions);
            store.save('countries', {});
            store.save('favorites', {countries: [], cities: []});
            store.save('languages', languageData);
            store.save('currencies', currenciesJSON);
            store.save('currencyInfo', {});
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  convertLanguageData(json) {
    let languageObj = {};
    for(q = 0; q < json.length; q++) {
      languageObj[json[q].alpha2] = json[q].English;
    }
    return languageObj;
  }

  chopUpData(data) {
    let countryObj = {};
    let regionArchitecture = {};
    for(var k = 0; k < data.length; k++) {

      countryObj[data[k]['name']] = data[k];

      //check if the region exists in our obj
      if(regionArchitecture[data[k].region]) {
          //if so we check to see if subregion is there
          if(regionArchitecture[data[k].region][data[k].subregion]) {
              //if so we add our country to it
              regionArchitecture[data[k].region][data[k].subregion].push(data[k].name);
          } else {
              //otherwise we create the subregion and then add our name to it
              regionArchitecture[data[k].region][data[k].subregion] = [data[k].name]
          }
      } else {
          //if not then create it
          regionArchitecture[data[k].region] = {};
          //and add our subregion + country name
          regionArchitecture[data[k].region][data[k].subregion] = [data[k].name]
      }
    }
    return {allCountries: countryObj, regions: regionArchitecture};
  }

  selectFavoriteCountry(country) {
    Actions.countrysplash({settings: this.state.settings, selectedCountry: this.state.allCountries[country], allCountries: this.state.allCountries, countryRegions: this.state.countryRegions, favorites: this.state.favorites, cachedCountries: this.state.cachedCountries});
  }

  selectFavoriteCity(name, country, index) {
    Actions.citysplash({settings: this.state.settings, destinationFeatures: this.state.cachedCountries[country].destinations[index], index: index, countryData: this.state.cachedCountries[country], allCountries: this.state.allCountries, countryRegions: this.state.countryRegions, favorites: this.state.favorites, cachedCountries: this.state.cachedCountries});
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <NavBar
          allCountries={this.state.allCountries}
          countryRegions={this.state.countryRegions}
          favorites={this.state.favorites}
          cachedCountries={this.state.cachedCountries}
          backArrow={false}
          colors={this.props.colors}
          settings={this.state.settings}
        />
        <ScrollView {...this.props}  contentContainerStyle={styles.container}>
          <FavoriteLocations
            favorites={this.state.favorites}
            cachedCountries={this.state.cachedCountries}
            selectFavoriteCountry={this.selectFavoriteCountry}
            selectFavoriteCity={this.selectFavoriteCity}
            colors={this.props.colors}
            stateReady={this.state.stateReady}
          />
        </ScrollView>
      </View>
    );
  }
}
