import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppIntro from 'react-native-app-intro';
import {Actions} from "react-native-router-flux";

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    padding: 15,
  },
  primaryText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  secondaryText: {
    color: '#fff',
    fontSize: 16,
  }
});

export default class Intro extends Component {

  render() {
    return (
      <AppIntro
        onDoneBtnClick={() => Actions.home()}
        onSkipBtnClick={() => Actions.home()}
      >
        <View style={[styles.slide,{ backgroundColor: '#fa931d' }]}>
          <View level={-10}><Text style={styles.text}>Page 1</Text></View>
          <View level={5}><Text style={styles.primaryText}>Learn</Text></View>
          <View level={20}><Text style={styles.secondaryText}>Check out need-to-know facts on culture, climate, and society about every corner of the globe</Text></View>
        </View>
        <View style={[styles.slide, { backgroundColor: '#a4b602' }]}>
          <View level={-10}><Text style={styles.text}>Page 2</Text></View>
          <View level={5}><Text style={styles.primaryText}>Plan</Text></View>
          <View level={20}><Text style={styles.secondaryText}>Research the trip planning details of every one of your favorite locales -- anywhere in the world!</Text></View>
        </View>
        <View style={[styles.slide,{ backgroundColor: '#fa931d' }]}>
          <View level={-10}><Text style={styles.text}>Page 3</Text></View>
          <View level={5}><Text style={styles.primaryText}>Explore</Text></View>
          <View level={20}><Text style={styles.secondaryText}>Get lost in scenic photos and helpful information to dream up your next big adventure</Text></View>
        </View>
      </AppIntro>
    );
  }
}
