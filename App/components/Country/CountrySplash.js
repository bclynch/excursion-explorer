import React, { Component } from 'react';
import { AppRegistry, Text, View, Button, ScrollView, Dimensions } from 'react-native';
import {Actions} from "react-native-router-flux";
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/FontAwesome';
import SwiperCarousel from '../Widgets/SwiperCarousel.js';
import CountryOptions from './CountryOptions.js';
import NavBar from '../NavBar.js';

import API from '../../api.js';
import Keys from '../../../API_KEYS.js';

const width = Dimensions.get('window').width;

export default class CountrySplash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCountryData: null
    }
  }

  componentWillReceiveProps(nextProps) {
    this.snagData(nextProps.selectedCountry.alpha3Code, nextProps.selectedCountry.name);
  }

  componentDidMount() {
    this.snagData(this.props.selectedCountry.alpha3Code, this.props.selectedCountry.name);
  }

  snagData(countryCode, name) {
    const self = this;

    // Perform API call if necessary
    if(this.props.cachedCountries[name]) {
      //if the data is over 24 hours old refresh it
      //logic: Current time - lastUpdated time > 24 hours then grab new data
     //  if(countries[selectedCountry][lastUpdated] > 1) {
     //    console.log('Data too old, grabbing fresh data');
     //    API.all(countryCode, name, Keys.flickr.key).then((data) => {
     //      console.log(data);
     //    });
     //  } else {
        //Use the data we already have
        console.log('Grabbing existing data');
        self.setState({selectedCountryData: this.props.cachedCountries[name]});
      //}
    } else {
      //Doesn't exist so grab data
      console.log('grabbing new data');
      API.all(countryCode, name, Keys.flickr.key).then((data) => {
        const newCountryData = {
          agInfo: data[0],
          frstInfo: data[1],
          flickr: data[2],
          general: this.props.selectedCountry
        }
        self.setState({selectedCountryData: newCountryData});
        console.log(`saving ${this.props.selectedCountry.name} information to cache`);
        const abc = this.props.cachedCountries;
        abc[name] = newCountryData;
        store.save('countries', abc);
      }).catch(function(err) {
        console.log(err);
      });
    }
  }

  chopPictures(picInfo) {
    if(picInfo === null) {
      return null;
    }

    //Validating there are flickr photos
    if(picInfo.flickr.photos.photo.length < 5) {
      //Need some placeholder that says it doesn't exist or something. Dunno
      return null;
    }

    let slides = [];
    for(var i = 0; i < 5; i++) {
      const data = picInfo.flickr.photos.photo[i];
      const obj = {src: `https://farm${data.farm}.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`, country: this.props.selectedCountry.name, subregion: this.props.selectedCountry.subregion}
      slides.push(obj);
    }
    return slides;
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <NavBar allCountries={this.props.allCountries} countryRegions={this.props.countryRegions} favorites={this.props.favorites} cachedCountries={this.props.cachedCountries} backArrow={true} />
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          <SwiperCarousel height={250} horizontal={true} autoPlaySpeed={5} slides={this.chopPictures(this.state.selectedCountryData)} />
          <CountryOptions country={this.state.selectedCountryData} allCountries={this.props.allCountries} countryRegions={this.props.countryRegions} favorites={this.props.favorites} cachedCountries={this.props.cachedCountries} />
        </ScrollView>
      </View>
    )
  }
}
