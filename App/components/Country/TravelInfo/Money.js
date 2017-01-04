import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions} from "react-native";
import {Actions} from "react-native-router-flux";

import CurrencyConverter from '../../Widgets/CurrencyConverter.js';

const styles = {

};

const width = Dimensions.get('window').width;

export default class Money extends Component {
  constructor(props) {
    super(props);

    this.state = {
      baseCurrency: 'USD',
      altCurrency: 'EUR'
    }
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <CurrencyConverter base={this.state.baseCurrency} alt={this.state.altCurrency} />
      </View>
    );
  }
}
