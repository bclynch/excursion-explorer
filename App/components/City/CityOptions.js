import React, { Component } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableHighlight, Dimensions, Keyboard, Alert} from "react-native";
import {Actions} from "react-native-router-flux";
import Icon from 'react-native-vector-icons/FontAwesome';
import GridView from 'react-native-grid-view';

const width = Dimensions.get('window').width;

const styles = {
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {width: 2, height: 2},
    textAlign: 'center'
  },
  optionContainer: {
    flex:1,
    marginTop: 10,
    alignItems: 'center'
  },
  listView: {
    width: width * .85,
    marginBottom: 20
  }
}

export default class CityOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {text: 'Food and Drink', icon: 'cutlery', backgroundColor: '#ff2dce'},
        {text: 'Outdoors', icon: 'tree', backgroundColor: '#126300'},
        {text: 'Landmarks + Sights', icon: 'building-o', backgroundColor: '#9b9b9b'},
        {text: 'Shopping', icon: 'shopping-bag', backgroundColor: '#ac38ff'},
        {text: 'Transportation', icon: 'plane', backgroundColor: '#e8c61b'},
        {text: 'Accomodations', icon: 'bed', backgroundColor: '#ff8e16'},
        {text: 'Services', icon: 'credit-card-alt', backgroundColor: '#00ffbb'},
        {text: props.isFavorite, icon: 'star', backgroundColor: '#00ecf4'}
      ]
    }
    this.renderOptions = this.renderOptions.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({data: [
      {text: 'Food and Drink', icon: 'cutlery', backgroundColor: '#ff2dce'},
      {text: 'Outdoors', icon: 'tree', backgroundColor: '#126300'},
      {text: 'Landmarks + Sights', icon: 'building-o', backgroundColor: '#9b9b9b'},
      {text: 'Shopping', icon: 'shopping-bag', backgroundColor: '#ac38ff'},
      {text: 'Transportation', icon: 'plane', backgroundColor: '#e8c61b'},
      {text: 'Accomodations', icon: 'bed', backgroundColor: '#ff8e16'},
      {text: 'Services', icon: 'credit-card-alt', backgroundColor: '#00ffbb'},
      {text: props.isFavorite, icon: 'star', backgroundColor: '#00ecf4'}
    ]});
  }

  renderOptions(data) {
    const self = this;
    return (
      <View style={styles.optionContainer} key={data.text}>
        <TouchableHighlight activeOpacity={0} onPress={() => self.fireClick(data.text)}>
          <View style={{alignItems: 'center', backgroundColor: data.backgroundColor, height: 200, width: width * .4}}>
            <Icon name={data.icon} style={{marginTop: 45}} size={50} color="#fff" />
            <View style={styles.textContainer}>
              <Text style={styles.text}>{data.text}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  fireClick(option) {
    switch(option) {
      case 'Food and Drink':
        Actions.citynav({cityInfo: this.props.cityInfo, option:'food', API: 'foodInformation', categories: ['restaurant', 'bar', 'coffee', 'club'], titles: ['Restaurants', 'Bars', 'Coffee', 'Clubs'], index: this.props.index, allCountries: this.props.allCountries, countryRegions: this.props.countryRegions, favorites: this.props.favorites, cachedCountries: this.props.cachedCountries});
        break;
      case 'Outdoors':
        Actions.citynav({cityInfo: this.props.cityInfo, option:'outdoors', API: 'outdoorInformation', categories: ['leisure', 'parks'], titles: ['Leisure', 'Parks'], index: this.props.index, allCountries: this.props.allCountries, countryRegions: this.props.countryRegions, favorites: this.props.favorites, cachedCountries: this.props.cachedCountries});
        break;
      case 'Landmarks + Sights':
        Actions.citynav({cityInfo: this.props.cityInfo, option:'landmarks', API: 'landmarkInformation', categories: ['landmarks', 'museums', 'religious'], titles: ['Landmarks', 'Museums', 'Religious Sites'], index: this.props.index, allCountries: this.props.allCountries, countryRegions: this.props.countryRegions, favorites: this.props.favorites, cachedCountries: this.props.cachedCountries});
        break;
      case 'Shopping':
        Actions.citynav({cityInfo: this.props.cityInfo, option:'shopping', API: 'shoppingInformation', categories: ['pharmacy', 'shops', 'food'], titles: ['Pharmacy', 'Shops', 'Food'], index: this.props.index, allCountries: this.props.allCountries, countryRegions: this.props.countryRegions, favorites: this.props.favorites, cachedCountries: this.props.cachedCountries});
        break;
      case 'Transportation':
        Actions.citynav({cityInfo: this.props.cityInfo, option:'transportation', API: 'transportationInformation', categories: ['airport', 'public', 'rail'], titles: ['Airports', 'Public Transport', 'Rail'], index: this.props.index, allCountries: this.props.allCountries, countryRegions: this.props.countryRegions, favorites: this.props.favorites, cachedCountries: this.props.cachedCountries});
        break;
      case 'Accomodations':
        Actions.citynav({cityInfo: this.props.cityInfo, option:'accommodation', API: 'accomodationInformation', categories: ['hotel', 'hostel', 'motel', 'camping'], titles: ['Hotels', 'Hostels', 'Motels', 'Camping'], index: this.props.index, allCountries: this.props.allCountries, countryRegions: this.props.countryRegions, favorites: this.props.favorites, cachedCountries: this.props.cachedCountries});
        break;
      case 'Services':
        Actions.citynav({cityInfo: this.props.cityInfo, option:'services', API: 'servicesInformation', categories: ['atm', 'police', 'hospital', 'gas'], titles: ['ATMs', 'Police', 'Hospitals', 'Gas Stations'], index: this.props.index, allCountries: this.props.allCountries, countryRegions: this.props.countryRegions, favorites: this.props.favorites, cachedCountries: this.props.cachedCountries});
        break;
      case 'Add To Favorites':
        this.props.toggleFavorite('Add');
        break;
      case 'Remove From Favorites':
        this.props.toggleFavorite('Remove');
        break;
    }
  }

  render(){
    return (
      <View>
        <View style={{alignItems: 'center', marginTop: 15, marginBottom: 15}}>
          <Text style={{fontSize: 25}}>Around Town</Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <GridView
            items={this.state.data}
            itemsPerRow={2}
            renderItem={this.renderOptions}
            style={styles.listView}
          />
        </View>
      </View>
    );
  }
}
