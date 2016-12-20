import React, { Component } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableHighlight, Dimensions, Keyboard} from "react-native";
import {Actions} from "react-native-router-flux";
import Icon from 'react-native-vector-icons/FontAwesome';
import SuggestedResults from './SuggestedResults.js';
import FilterRegion from './FilterRegion';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: 'red',
  }
});
const width = Dimensions.get('window').width;

//Should just be white page with search bar up top
//Focus in on the text box on load for the component
//List results below for potential countries
//Would like our region filter too displayed here
//SImilar to lonely planet search

//I think using the router I can pass the selectedCountry state on to the next route.
//I guess keeping app state in the next page of the route??

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    }

    this.onTextChange = this.onTextChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }

  onTextChange(e) {
    this.setState({query: e.nativeEvent.text});
  }

  handleSelection(data) {
    Actions.countrysplash({selectedCountry: this.props.allCountries[data], allCountries: this.props.allCountries, countryRegions: this.props.countryRegions, favorites: this.props.favorites});
  }

  goBack() {
    Keyboard.dismiss();
    Actions.pop();
  }

  render(){
    return (
      <View style={{alignItems:'center'}}>
        <View style={{flexDirection: 'row', alignItems:'center', width: width*.85}}>
          <TouchableHighlight onPress={this.goBack} title='Back' style={{flex:1}} activeOpacity={0.1} underlayColor={'#eee'}>
            <Icon name="arrow-left" size={30} color="#cecece" />
          </TouchableHighlight>
          <TextInput
            placeholder='Search Countries'
            onChange={this.onTextChange}
            onSubmitEditing={() => Actions.countrysplash({selectedCountry: this.props.allCountries[this.state.query.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})], allCountries: this.props.allCountries, countryRegions: this.props.countryRegions, favorites: this.props.favorites})}
            blurOnSubmit={true}
            value={this.state.query}
            style={{flex: 4}}
           />
        </View>
        {this.state.query === '' ? <FilterRegion countryRegions={this.props.countryRegions} /> : <SuggestedResults allCountries={this.props.allCountries} query={this.state.query} handleSelection={this.handleSelection} />}
      </View>
    );
  }
}
