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
      selectedCountryData: null,
      favorites: this.props.favorites,
      isFavorite: this.props.favorites.countries.indexOf(props.selectedCountry.name) !== -1
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
      API.countryPhotoData(name, Keys.flickr.key).then((data) => {
        const newCountryData = {
          flickr: data,
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
      return ['no pics'];
    }

    let slides = [];
    for(var i = 0; i < 5; i++) {
      const data = picInfo.flickr.photos.photo[i];
      const obj = {src: `https://farm${data.farm}.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`, country: this.props.selectedCountry.name, subregion: this.props.selectedCountry.subregion}
      slides.push(obj);
    }
    return slides;
  }

  toggleFavorite(state) {
    if(state === 'Add') {
      //adding to our store + update state
      let newArr = this.state.favorites.countries;
      newArr.push(this.props.selectedCountry.name);
      let existingFavs = this.state.favorites;
      existingFavs.countries = newArr;
      store.save('favorites', existingFavs);
      this.setState({favorites: existingFavs, isFavorite: true});
    } else {
      let newArr = this.state.favorites.countries;
      newArr.splice(this.state.favorites.countries.indexOf(this.props.selectedCountry.name), 1);
      let existingFavs = this.state.favorites;
      existingFavs.countries = newArr;
      store.save('favorites', existingFavs);
      this.setState({favorites: existingFavs, isFavorite: false});
    }
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <NavBar
          allCountries={this.props.allCountries}
          countryRegions={this.props.countryRegions}
          favorites={this.state.favorites}
          cachedCountries={this.props.cachedCountries}
          backArrow={true}
          colors={this.props.colors}
          settings={this.props.settings}
        />
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          <SwiperCarousel
            height={250}
            horizontal={true}
            autoPlaySpeed={5}
            slides={this.chopPictures(this.state.selectedCountryData)}
            colors={this.props.colors}
            backup={{primary: this.props.selectedCountry.name, sub: this.props.selectedCountry.subregion}}
          />
          <CountryOptions
            toggleFavorite={this.toggleFavorite}
            isFavorite={this.state.isFavorite ? 'Remove From Favorites' : 'Add To Favorites'}
            country={this.state.selectedCountryData}
            allCountries={this.props.allCountries}
            countryRegions={this.props.countryRegions}
            favorites={this.state.favorites}
            cachedCountries={this.props.cachedCountries}
            colors={this.props.colors}
            settings={this.props.settings}
          />
        </ScrollView>
      </View>
    )
  }
}
