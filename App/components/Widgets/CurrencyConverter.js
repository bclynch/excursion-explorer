import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, TextInput, ActivityIndicator} from "react-native";
import {Actions} from "react-native-router-flux";
import ModalDropdown from 'react-native-modal-dropdown';
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      data: {},
      baseValue: (1).toString(),
      altValue: null,
      multiplier: null,
      currObj: null,
      stateReady: false
    }
    this.modValue = this.modValue.bind(this);
    this.newBase = this.newBase.bind(this);
  }

  componentDidMount() {
    //Check cache for valid results
    store.get('currencyInfo')
      .then((info) => {
        this.storeLogic(info, this.state.baseCurrency);
      }).catch(err => {
        console.log(err);
      });
    store.get('currencies')
      .then((currObj) => {
        this.setState({currObj: currObj});
      }).catch(err => {
        console.log(err);
      });
  }

  storeLogic(info, baseCurrency) {
    //If more than 12 hours old grab new and cache
    if(!(baseCurrency in info) || (Date.now() - info[baseCurrency].lastUpdated) > (3600000 * 12)) {
      console.log('Grabbing new currency data');
      API.currency(baseCurrency).then(data => {
        const existingObj = info;
        existingObj[baseCurrency] = {data: data, lastUpdated: Date.now()};
        this.setState({data: data.rates, storeData: existingObj, multiplier: data.rates[this.state.altCurrency], altValue: (this.state.baseValue * data.rates[this.state.altCurrency]).toFixed(2).toString()});
        this.setState({stateReady: true});
        store.save('currencyInfo', existingObj);
      }).catch(error => {
        console.log(error)
      });
    } else {
      console.log('Using cached currency data');
      this.setState({data: info[baseCurrency].data.rates, storeData: info, multiplier: info[baseCurrency].data.rates[this.state.altCurrency], altValue: (this.state.baseValue * info[baseCurrency].data.rates[this.state.altCurrency]).toFixed(2).toString()});
      this.setState({stateReady: true});
    }
  }

  modValue(num, type) {
    if(type === 'base') {
      this.setState({baseValue: num, altValue: (num * this.state.multiplier).toFixed(2).toString()});
    } else {
      this.setState({baseValue: (num / this.state.multiplier).toFixed(2).toString(), altValue: num});
    }
  }

  newBase(value) {
    this.storeLogic(this.state.storeData, value);
    this.setState({baseCurrency: value});
  }

  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        { this.state.multiplier ?
          <View style={{width: width, alignItems: 'center'}}>
            <View style={{
                padding: 30,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: this.props.colors.primary
            }}>
              <ModalDropdown
                style={{
                  paddingHorizontal: 20,
                  flex: 2
                }}
                textStyle={{fontSize: 15, textDecorationLine: 'underline'}}
                options={Object.keys(this.state.data)}
                onSelect={(idx, value) => this.newBase(value)}
                defaultValue={this.state.baseCurrency}
              />
              <TextInput
                placeholder='Enter Amount'
                keyboardType = 'numeric'
                onChangeText={num => this.modValue(num, 'base')}
                value={this.state.baseValue}
                style={{flex: 3}}
               />
            </View>
            <View style={{
                padding: 30,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: this.props.colors.primary
              }}>
              <View style={{flex: 2, paddingHorizontal: 20}}>
                <Text style={{fontSize: 15}}>{this.state.altCurrency}</Text>
              </View>
              <TextInput
                placeholder='Enter Amount'
                keyboardType = 'numeric'
                onChangeText={num => this.modValue(num, 'alt')}
                value={this.state.altValue}
                style={{flex: 3}}
               />
            </View>
            <View style={{marginTop: 25, width: width * .85}}>
              <Text style={{fontSize: 25, color: this.props.colors.textColor, textAlign: 'center'}}>{this.state.baseValue} {this.state.baseValue === '1' ? this.state.currObj[this.state.baseCurrency].name : this.state.currObj[this.state.baseCurrency].name_plural} ({this.state.currObj[this.state.baseCurrency].symbol_native}) is equal to {this.state.altValue} {this.state.altValue === '1' ? this.state.currObj[this.state.altCurrency].name : this.state.currObj[this.state.altCurrency].name_plural} ({this.state.currObj[this.state.altCurrency].symbol_native})</Text>
            </View>
          </View>
          :
          [
            (
              this.state.stateReady ?
                <View style={{alignItems:'center', width: width * .85}}>
                  <Text style={{fontSize: 24, color: this.props.colors.textColor, textAlign: 'center', marginVertical: 80}}>Sorry, no currency data available for {this.state.currObj[this.state.altCurrency].name_plural} at this time</Text>
                  <Icon name="chain-broken" size={80} color={this.props.colors.tertiary} />
                </View>
                :
                <ActivityIndicator
                  style={{height: 125}}
                  size="large"
                  color={this.props.colors.tertiary}
                />
            )
          ]
        }
      </View>
    );
  }
}
