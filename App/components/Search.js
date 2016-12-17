import React, { Component } from 'react';
import {View, Text, StyleSheet, TextInput, Button} from "react-native";
import {Actions} from "react-native-router-flux";
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

  //Setting the state for the search input on each keypress so we can clear it on submit
  onTextChange(e) {
    this.setState({query: e.nativeEvent.text});
  }

  handleSelection(data) {
    Actions.countrysplash({selectedCountry: this.props.allCountries[data]});
  }

  render(){
    return (
      <View>
        <Button onPress={Actions.pop} title='Back' />
        <TextInput
          autoFocus={true}
          placeholder='Search Countries'
          onChange={this.onTextChange}
          onSubmitEditing={() => Actions.countrysplash({selectedCountry: this.props.allCountries[this.state.query]})}
          blurOnSubmit={true}
          value={this.state.query}
         />
         {this.state.query === '' ? <FilterRegion countryRegions={this.props.countryRegions} /> : <SuggestedResults allCountries={this.props.allCountries} query={this.state.query} handleSelection={this.handleSelection} />}
      </View>
    );
  }
}
