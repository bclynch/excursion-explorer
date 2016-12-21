import React, { Component } from 'react';
import { AppRegistry, Text, View, Button } from 'react-native';
import {Actions} from "react-native-router-flux";
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/FontAwesome';
import SwiperCarousel from './SwiperCarousel.js';

import API from '../api.js';
import Keys from '../../API_KEYS.js';

export default class CountrySplash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCountryData: null,
      favorites: props.favorites
    }
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.snagData(nextProps.selectedCountry.alpha3Code, nextProps.selectedCountry.name);
  }

  componentDidMount() {
    this.snagData(this.props.selectedCountry.alpha3Code, this.props.selectedCountry.name);
  }

  snagData(countryCode, name) {
    const self = this;
    console.log(this.props.cachedCountries);
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
    });
  }




  // }
  //  store.get('countries')
  //    .then((countries) => {
  //      console.log(countries);
  //      if(countries[name]) {
  //        //if the data is over 24 hours old refresh it
  //        //logic: Current time - lastUpdated time > 24 hours then grab new data
  //       //  if(countries[selectedCountry][lastUpdated] > 1) {
  //       //    console.log('Data too old, grabbing fresh data');
  //       //    API.all(countryCode, name, Keys.flickr.key).then((data) => {
  //       //      console.log(data);
  //       //    });
  //       //  } else {
  //          //Use the data we already have
  //          console.log('Grabbing existing data');
  //          self.setState({selectedCountryData: countries[name]});
  //        //}
  //      } else {
  //        //Doesn't exist so grab data
  //        console.log('grabbing new data');
  //        API.all(countryCode, name, Keys.flickr.key).then((data) => {
  //          const newCountryData = {
  //            agInfo: data[0],
  //            frstInfo: data[1],
  //            flickr: data[2],
  //            general: this.props.selectedCountry
  //          }
  //          self.setState({selectedCountryData: newCountryData});
  //          console.log(`saving ${this.props.selectedCountry.name} information to cache`);
  //          const abc = countries;
  //          abc[name] = newCountryData;
  //          store.save('countries', abc);
  //        });
  //      }
  //    }).catch(function(err) {
  //      console.log(err);
  //    });
  }

  chopPictures(picInfo) {
    console.log(picInfo);
    if(picInfo === null) {
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

  toggleFavorite() {
    const self = this;
    store.get('favorites')
      .then((favorites) => {
        console.log(favorites);
        if(this.state.favorites.indexOf(this.props.selectedCountry.name) === -1) {
          //adding to our store + update state
          console.log('Adding to favorites');
          let newArr = favorites;
          newArr.push(this.props.selectedCountry.name);
          store.save('favorites', newArr);
          self.setState({favorites: newArr});
        } else {
          let newArr = favorites;
          newArr.splice(this.state.favorites.indexOf(this.props.selectedCountry.name), 1);
            console.log('Removing from favorites');
          store.save('favorites', newArr);
          self.setState({favorites: newArr});
        }
      })
  }

  render() {
    return (
      <View>
        <SwiperCarousel height={250} horizontal={true} autoPlaySpeed={5} slides={this.chopPictures(this.state.selectedCountryData)} />
        <Button onPress={Actions.home} title='Home' />
        <Icon.Button name="star" backgroundColor="#3b5998" onPress={this.toggleFavorite}>
          {this.state.favorites.indexOf(this.props.selectedCountry.name) !== -1 ? 'Remove From Favorites' : 'Add To Favorites'}
        </Icon.Button>
      </View>
    )
  }
}
