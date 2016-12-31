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
      data: [{text: 'Food and Drink', icon: 'list', backgroundColor: 'red'}, {text: 'Outdoors', icon: 'building-o', backgroundColor: 'green'}, {text: 'Landmarks + Sights', icon: 'sun-o', backgroundColor: 'orange'}, {text: 'Shopping', icon: 'globe', backgroundColor: 'purple'}, {text: 'Transportation', icon: 'star', backgroundColor: '#00ecf4'}, {text: 'Accomodations', icon: 'star', backgroundColor: '#00ecf4'}, {text: 'Services', icon: 'star', backgroundColor: '#00ecf4'}, {text: 'Add To Favorites', icon: 'star', backgroundColor: '#00ecf4'}]
    }
    this.renderOptions = this.renderOptions.bind(this);
  }

  componentWillReceiveProps(props) {
    //this.setState({data: [{text: 'Fast Facts', icon: 'list', backgroundColor: 'red'}, {text: 'Destinations', icon: 'building-o', backgroundColor: 'green'}, {text: 'Climate +\nGeography', icon: 'sun-o', backgroundColor: 'orange'}, {text: 'Travel Info', icon: 'globe', backgroundColor: 'purple'}, {text: props.isFavorite, icon: 'star', backgroundColor: '#00ecf4'}]});
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
    function notAvailable(option) {
      Alert.alert(
              'Under Construction',
              `Still working on ${option}, keep an eye out for updates!`,
              [
                {text: 'OK'},
              ]
            )
    }
    switch(option) {
      case 'Food and Drink':
        //type: 'food', API: 'foodInformation', categories: ['restaurant', 'bar', 'coffee', 'club'], titles: ['Restaurants', 'Bars', 'Coffee', 'Clubs'],
        //Actions.home({allCountries: this.props.allCountries, countryRegions: this.props.countryRegions, favorites: this.props.favorites, cachedCountries: this.props.cachedCountries});
        //Actions.foodnav({cityInfo: this.props.cityInfo, index: this.props.index, allCountries: this.props.allCountries, countryRegions: this.props.countryRegions, favorites: this.props.favorites, cachedCountries: this.props.cachedCountries});
        Actions.citynav({cityInfo: this.props.cityInfo, option:'food', API: 'foodInformation', categories: ['restaurant', 'bar', 'coffee', 'club'], titles: ['Restaurants', 'Bars', 'Coffee', 'Clubs'], index: this.props.index, allCountries: this.props.allCountries, countryRegions: this.props.countryRegions, favorites: this.props.favorites, cachedCountries: this.props.cachedCountries});
        break;
      case 'Outdoors':
        notAvailable(option);
        break;
      case 'Landmarks + Sights':
        notAvailable(option);
        break;
      case 'Shopping':
        notAvailable(option);
        break;
      case 'Transportation':
        notAvailable(option);
        break;
      case 'Accomodations':
        Actions.citynav({cityInfo: this.props.cityInfo, option:'accommodation', API: 'accomodationInformation', categories: ['hotel', 'hostel', 'motel', 'camping'], titles: ['Hotels', 'Hostels', 'Motels', 'Camping'], index: this.props.index, allCountries: this.props.allCountries, countryRegions: this.props.countryRegions, favorites: this.props.favorites, cachedCountries: this.props.cachedCountries});
        break;
      case 'Services':
        notAvailable(option);
        break;
      case 'Add To Favorites':
        notAvailable(option);
        //this.props.toggleFavorite('Add');
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
