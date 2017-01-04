import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, TextInput} from "react-native";
import {Actions} from "react-native-router-flux";
import ModalDropdown from 'react-native-modal-dropdown';

import API from '../../api.js';

const styles = {

};

const width = Dimensions.get('window').width;

export default class CurrencyConverter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      baseCurrency: props.base,
      altCurrency: props.alt,
      options: null,
      base: null,
      multiplier: null
    }
  }

  // componentDidMount() {

  // }

  componentDidMount() {
    //Check cache for vlid results
    store.get('currencyInfo')
      .then((info) => {
        if(true) { //'time now' - info.lastUpdated > '12 hours'
          //If more than 12 hours old grab new and cache
          API.currency(this.state.baseCurrency).then(data => {
            console.log(data);
            this.setState({options: Object.keys(data.rates), multiplier: data.rates[this.state.altCurrency]});
          }).catch(error => {
            console.log(error)
          });
        } else {
          this.setState({options: Object.keys(info.data.rates), multiplier: info.data.rates[this.state.altCurrency]});
        }
      }).catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <View style={{backgroundColor: 'orange', width: width * .85}}>
          <View style={{padding: 30, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
            <ModalDropdown
              style={{flex: 2}}
              options={this.state.options}
              onSelect={(idx, value) => console.log(value)}
              defaultValue={this.state.baseCurrency}
            />
            <TextInput
              placeholder='Enter Amount'
              keyboardType = 'numeric'
              onChangeText={(text) => this.setState({base: text})}
              value={this.state.base}
              style={{flex: 3}}
             />
          </View>
          <View style={{padding: 30, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
            <View style={{flex: 2}}>
              <Text>{this.state.altCurrency}</Text>
            </View>
            <TextInput
              placeholder='Enter Amount'
              keyboardType = 'numeric'
              onChangeText={(text) => this.setState({alt: text})}
              value={this.state.alt}
              style={{flex: 3}}
             />
          </View>
        </View>
      </View>
    );
  }
}
