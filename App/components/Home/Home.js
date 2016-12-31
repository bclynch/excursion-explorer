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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});

const width = Dimensions.get('window').width;

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favorites: [],
      cachedCountries: {}
    }
  }

  componentDidMount() {
    const self = this;

    //If we already snagged our initial data then cont using props
    if(this.props.allCountries) {
      console.log('Using props data');
      self.setState({
        allCountries: this.props.allCountries,
        countryRegions: this.props.countryRegions,
        cachedCountries: this.props.cachedCountries,
        favorites: this.props.favorites
      });
      return;
    }

    //store.delete('allCountries');

    //Checking local storage for existing data, if any
    store.get('allCountries')
      .then((countries) => {
        //Check our store to see if user has all countries cached
        //if so then set our allCountries state equal to the array
        if(countries) {
          console.log('Grabbing all countries from cache');
          self.setState({allCountries: countries});
          //snagging cached regions information
          store.get('countryRegions')
            .then((regions) => {
              self.setState({countryRegions: regions});
              console.log('Regions: ', regions);
              console.log('All countries: ', countries);
              store.get('countries')
                .then((cachedCountries) => {
                  console.log('Cached countries: ', cachedCountries);
                  self.setState({cachedCountries: cachedCountries});
                  store.get('favorites')
                    .then((favorites) => {
                      console.log('Favorites: ', favorites);
                      self.setState({favorites: favorites});
                    });
                });
            });
        } else {
          API.grabAllCountries().then((data) => {
            const countryData = self.chopUpData(data);
            const languageData = self.convertLanguageData(languageJSON);
            self.setState({allCountries: countryData.allCountries});
            store.save('allCountries', countryData.allCountries);
            console.log('Saving allCountries to storage');
            self.setState({countryRegions: countryData.regions});
            self.setState({favorites: []});
            //saving our chopped data as well to avoid the loop parsing on every refresh
            store.save('countryRegions', countryData.regions);
            store.save('countries', {});
            store.save('favorites', []);
            store.save('languages', languageData);
            store.save('currencies', currenciesJSON);
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

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <NavBar allCountries={this.state.allCountries} countryRegions={this.state.countryRegions} favorites={this.state.favorites} cachedCountries={this.state.cachedCountries} backArrow={false} />
        <ScrollView {...this.props}  contentContainerStyle={styles.container}>
          <FavoriteLocations favorites={this.state.favorites} allCountries={this.state.allCountries} countryRegions={this.state.countryRegions} cachedCountries={this.state.cachedCountries} />
        </ScrollView>
      </View>
    );
  }
}
