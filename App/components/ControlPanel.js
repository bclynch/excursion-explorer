import {
  PropTypes,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Component } from 'react';
import styles from '../styles.js';
import SearchForm from './SearchForm.js';

export default class ControlPanel extends Component {
  render() {
      return (
        <View style={styles.controlPanel}>
          <Text style={styles.controlPanelWelcome}>
            Control Panel
          </Text>
          <SearchForm
            placeholder='Search'
            suggestedResults={false}
            searchSubmit={this.props.searchSubmit}
          />
        </View>
      )
    }
  }
