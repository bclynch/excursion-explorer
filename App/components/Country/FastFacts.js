import React, { Component } from 'react';
import {View, Text, TouchableHighlight, Dimensions, ScrollView} from "react-native";
import {Actions} from "react-native-router-flux";
import Icon from 'react-native-vector-icons/FontAwesome';
import NavBar from '../NavBar.js';
import HeaderContainer from './HeaderContainer.js';


const width = Dimensions.get('window').width;

const styles = {
  container: {
    alignItems: 'center'
  }
}

export default class FastFacts extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentWillMount() {
    console.log(this.props.countryData);
    const data = this.props.countryData;
    this.setState({data: [
      {category: 'Capital', value: data.capital, icon: 'building'},
      {category: 'Region', value: data.subregion, icon: 'map-o'},
      {category: 'Borders', value: data.borders, icon: 'map-marker'},
      {category: 'Population', value: data.population, icon: 'male'},
      {category: 'Land Mass', value: data.area, icon: 'street-view'},
      {category: 'Calling Code', value: data.callingCodes, icon: 'phone'},
      {category: 'Currencies', value: data.currencies, icon: 'money'}
    ]});
  }

  render(){
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <NavBar allCountries={this.props.allCountries} countryRegions={this.props.countryRegions} favorites={this.props.favorites} cachedCountries={this.props.cachedCountries} backArrow={true} />
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          <HeaderContainer type='fastfacts' name={this.props.countryData.altSpellings[1] || this.props.countryData.name} />
        </ScrollView>
      </View>
    );
  }
}
