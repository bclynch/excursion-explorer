import React, { Component } from 'react';
import { AppRegistry, Text, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import {Actions} from "react-native-router-flux";
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/FontAwesome';
import SwiperCarousel from '../Widgets/SwiperCarousel.js';
import NavBar from '../NavBar.js';
import CityOptions from './CityOptions.js';

import API from '../../api.js';
import Keys from '../../../API_KEYS.js';

const width = Dimensions.get('window').width;

export default class CitySplash extends Component {
  constructor(props) {
    super(props);

    function checkFavorite() {
      for(var i=0; i < props.favorites.cities.length; i++) {
        if (props.favorites.cities[i].name === props.destinationFeatures.name) {
            return true;
        }
      }
      return false;
    }

    this.state = {
      cachedCountries: props.cachedCountries,
      photos: null,
      favorites: props.favorites,
      isFavorite: checkFavorite(),
      cityInfo: props.destinationFeatures
    }
    this.snagData = this.snagData.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.snagData(nextProps.destinationFeatures);
  }

  componentDidMount() {
    this.snagData(this.props.destinationFeatures);
  }

  snagData(cityData) {
    const self = this;

    // Perform API call if necessary
    if(cityData.features) {
      //Use the data we already have
      console.log('Grabbing existing features data');

      this.setState({photos: cityData.features.photos})
    } else {
      //Doesn't exist so grab data
      console.log('grabbing new features data');
      API.cityPhotos(Keys.flickr.key, cityData.name, this.props.countryData.general.name).then((data) => {
        const featuresData = {
          photos: data.photos.photo
        }
        //Updating our data for cities, selectedcountry, and allcountries to cache new data
        const existingCityInfo = this.props.destinationFeatures;
        existingCityInfo['features'] = featuresData;
        const existingCountryInfo = this.props.countryData;
        existingCountryInfo.destinations.splice(this.props.index, 1, existingCityInfo);
        const cachedCountries = this.props.cachedCountries;
        cachedCountries[this.props.countryData.general.name] = existingCountryInfo;

        this.setState({cachedCountries: cachedCountries, photos: featuresData.photos, cityInfo: existingCityInfo})
        store.save('countries', cachedCountries);
      }).catch(function(err) {
        console.log(err);
      });
    }
  }

  chopPictures(photoArr) {
    if(photoArr === null) {
      return null;
    }

    //Validating there are flickr photos
    if(photoArr.length < 5) {
      //Need some placeholder that says it doesn't exist or something. Dunno
      return null;
    }

    let slides = [];
    for(var i = 0; i < 5; i++) {
      const data = photoArr[i];
      const obj = {src: `https://farm${data.farm}.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`, country: this.props.destinationFeatures.name, subregion: this.props.countryData.general.name};
      slides.push(obj);
    }
    return slides;
  }

  toggleFavorite(state) {
    if(state === 'Add') {
      //adding to our store + update state
      let newArr = this.state.favorites.cities;
      newArr.push({name: this.props.destinationFeatures.name, country: this.props.countryData.general.name, index: this.props.index});
      let existingFavs = this.state.favorites;
      existingFavs.cities = newArr;
      store.save('favorites', existingFavs);
      this.setState({favorites: existingFavs, isFavorite: true});
    } else {
      let newArr = this.state.favorites.cities;
      var index;
      //search for the option we want to Remove
      for(var i=0; i < newArr.length; i++) {
          if (newArr[i].name === this.props.destinationFeatures.name) {
              index = i;
              break;
          }
      }
      newArr.splice(index, 1);
      let existingFavs = this.state.favorites;
      existingFavs.cities = newArr;
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
          cachedCountries={this.state.cachedCountries}
          backArrow={true}
        />
        {this.state.photos ?
          <ScrollView contentContainerStyle={{alignItems: 'center'}}>
            <SwiperCarousel
              height={250}
              horizontal={true}
              autoPlaySpeed={5}
              slides={this.chopPictures(this.state.photos)}
            />
            <CityOptions
              cityInfo={this.state.cityInfo}
              index={this.props.index}
              api='foodInformation'
              toggleFavorite={this.toggleFavorite}
              isFavorite={this.state.isFavorite ? 'Remove From Favorites' : 'Add To Favorites'}
              allCountries={this.props.allCountries}
              countryRegions={this.props.countryRegions}
              favorites={this.state.favorites}
              cachedCountries={this.state.cachedCountries}
            />
          </ScrollView>
          :
          <ActivityIndicator
            style={{height: 125}}
            size="large"
          />
        }

      </View>
    )
  }
}
