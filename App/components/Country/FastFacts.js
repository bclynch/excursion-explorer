import React, { Component } from 'react';
import {View, Text, TouchableHighlight, Dimensions, ScrollView, ActivityIndicator} from "react-native";
import {Actions} from "react-native-router-flux";
import Icon from 'react-native-vector-icons/FontAwesome';
import store from 'react-native-simple-store';
import NavBar from '../NavBar.js';
import HeaderContainer from './HeaderContainer.js';

const width = Dimensions.get('window').width;

const styles = {
  container: {
    alignItems: 'center'
  },
  factsContainer: {
    alignItems: 'center'
  },
  factoid: {
    padding: 30,
    borderBottomWidth: 1,
    borderColor: '#cecece',
    width: width*.85,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}

export default class FastFacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    }
  }

  componentWillMount() {
    const photoData = this.props.countryData.flickr.photos.photo[10];
    this.setState({
      photo: `https://farm${photoData.farm}.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}_b.jpg`
    })
  }

  componentDidMount() {
    store.get('languages')
      .then((langObj) => {
        const self = this;
        const data = this.props.countryData.general;
        const abc = data.languages.map(function(item) {
          return langObj[item];
        });
        this.setState({data: [
          {category: 'Capital', value: data.capital, icon: 'building'},
          {category: 'Region', value: data.subregion, icon: 'map-o'},
          {category: 'Borders', value: data.borders.join(', '), icon: 'map-marker'},
          {category: 'Population', value: data.population, icon: 'male'},
          {category: 'Land Mass', value: `${data.area}km`, icon: 'street-view'},
          {category: 'Languages', value: abc.join(', '), icon: 'language'},
          {category: 'Calling Code', value: `+${data.callingCodes}`, icon: 'phone'},
          {category: 'Currencies', value: data.currencies.join(', '), icon: 'money'}
        ]});
      });
  }

  renderFacts() {
      return this.state.data.map(function(item) {
        if(item.category === 'Land Mass') {
          return (
            <View key={item.category} style={styles.factoid}>
              <Icon name={item.icon} size={30} color="#cecece" />
              <View style={{justifyContent: 'space-around', alignItems: 'flex-end'}}>
                <View style={{flexDirection: 'row', }}><Text style={{fontSize: 20}}>{item.value}</Text><View style={{alignItems: 'flex-start'}}><Text style={{fontSize: 8}}>2</Text></View></View>
                <Text>{item.category}</Text>
              </View>
            </View>
          );
        } else {
          return (
            <View key={item.category} style={styles.factoid}>
              <Icon name={item.icon} size={30} color="#cecece" />
              <View style={{justifyContent: 'space-around', alignItems: 'flex-end'}}>
                <Text style={{fontSize: 20}}>{item.value}</Text>
                <Text>{item.category}</Text>
              </View>
            </View>
          );
        }
    });
  }

  render(){
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <NavBar allCountries={this.props.allCountries} countryRegions={this.props.countryRegions} favorites={this.props.favorites} cachedCountries={this.props.cachedCountries} backArrow={true} />
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          <HeaderContainer type='fastfacts' photo={this.state.photo} name={this.props.countryData.general.altSpellings[1] || this.props.countryData.general.name} />
          {this.state.data ?
          <View style={styles.factsContainer}>
            {this.renderFacts()}
          </View>
          :
          <ActivityIndicator style={[styles.centering, {height: 125}]} size="large" /> }
        </ScrollView>
      </View>
    );
  }
}