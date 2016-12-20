import React, { Component } from 'react';
import { AppRegistry, Text, View, Button } from 'react-native';
import {Actions} from "react-native-router-flux";
import store from 'react-native-simple-store';
import SwiperCarousel from './SwiperCarousel.js';

import API from '../api.js';
import Keys from '../../API_KEYS.js';

export default class CountrySplash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCountryData: null
    }
  }

  componentDidMount() {
    this.snagData(this.props.selectedCountry.alpha3Code, this.props.selectedCountry.name)
  }

  snagData(countryCode, name) {
    const self = this;
  //Perform API call if necessary
   store.get('countries')
     .then((countries) => {
       if(countries[name]) {
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
           self.setState({selectedCountryData: countries[name]});
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
           const existingCountries = countries;
           existingCountries[this.props.selectedCountry.name] = newCountryData;
           console.log(`saving ${this.props.selectedCountry.name} information to cache`);
           store.save('countries', existingCountries);
         });
       }
     }).catch(function(err) {
       console.log(err);
     });
  }
    //     const self = this;
    //
    //     let dataObj = {};
    //
    //     store.get('countries')
    //       .then((countries) => {
    //         if(countries[name]) {
    //           //if the data is over 24 hours old refresh it
    //           //logic: Current time - lastUpdated time > 24 hours then grab new data
    //           if(countries[name][lastUpdated] > ) {
    //             console.log('Data too old, grabbing fresh data');
    //             API.fetchTheGoods(countryCode, name);
    //           } else {
    //             //Use the data we already have
    //             console.log('Grabbing existing data');
    //             self.setState({selectedCountryData: countries[name]});
    //             console.log(JSON.parse(sessionStorage.getItem(countryCode)));
    //           }
    //         } else {
    //           //Doesn't exist so grab data
    //           API.fetchTheGoods(countryCode, name);
    //         }
    //       }
    //     }
    // }

  render() {
    let slides = [];
    for(var i = 0; i < 5; i++) {
      if(this.state.selectedCountryData === null) {
        break;
      }
      const data = this.state.selectedCountryData.flickr.photos.photo[i];
      const obj = {src: `https://farm${data.farm}.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`, country: this.props.selectedCountry.name, subregion: this.props.selectedCountry.subregion}
      slides.push(obj);
    }
    return (
      <View>
        <Text>Country Splash {this.props.selectedCountry.name}</Text>
        <SwiperCarousel height={250} horizontal={true} autoPlaySpeed={5} slides={slides} />
        <Button onPress={Actions.home} title='Home' />
      </View>
    )
  }
}
