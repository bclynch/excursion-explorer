import React, { Component } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableHighlight, Dimensions, Keyboard, Alert} from "react-native";
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

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    }

    this.handleSelection = this.handleSelection.bind(this);
    this.handleKeyboardEnter = this.handleKeyboardEnter.bind(this);
  }

  handleSelection(data) {
    Actions.countrysplash({settings: this.props.settings, selectedCountry: this.props.allCountries[data], allCountries: this.props.allCountries, countryRegions: this.props.countryRegions, favorites: this.props.favorites, cachedCountries: this.props.cachedCountries});
  }

  handleKeyboardEnter() {
    const query = this.state.query.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

    //Validating the search query exists
    if(!this.props.allCountries[query]) {
      Alert.alert(
              'Invalid Search',
              'Please enter a valid country query',
              [
                {text: 'OK'},
              ]
            )
    } else {
      Actions.countrysplash({settings: this.props.settings, selectedCountry: this.props.allCountries[query], allCountries: this.props.allCountries, countryRegions: this.props.countryRegions, favorites: this.props.favorites, cachedCountries: this.props.cachedCountries});
    }
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
            onChangeText={(text) => this.setState({query: text})}
            onSubmitEditing={this.handleKeyboardEnter}
            blurOnSubmit={true}
            value={this.state.query}
            style={{flex: 4}}
           />
        </View>
        {this.state.query === '' ? <FilterRegion countryRegions={this.props.countryRegions} allCountries={this.props.allCountries} favorites= {this.props.favorites} cachedCountries= {this.props.cachedCountries} /> : <SuggestedResults allCountries={this.props.allCountries} query={this.state.query} handleSelection={this.handleSelection} />}
      </View>
    );
  }
}
