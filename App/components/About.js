import React, { Component } from 'react';
import {View, Text, Dimensions, TouchableHighlight, ScrollView} from "react-native";
import {Actions} from "react-native-router-flux";
import Icon from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('window').width;

const styles = {
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * .85,
    borderBottomWidth: 2,
    borderBottomColor: "#cecece",
    height: 80
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 25,
    marginBottom: 15
  },
  body: {
    fontSize: 16
  }
}

export default class About extends Component {
  constructor(props) {
    super(props);

    const self = this;

    this.state = {

    }
  }
  render(){
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={styles.nav}>
          <TouchableHighlight onPress={Actions.pop}>
            <Icon name="arrow-left" size={30} color={this.props.colors.primary} />
          </TouchableHighlight>
          <Text style={{fontSize: 30, color: this.props.colors.textColor}}>About</Text>
          <View />
        </View>
        <ScrollView {...this.props}>
          <View style={{width: width * .85}}>
            <Text style={styles.header}>About Excursion Explorer</Text>
            <Text style={styles.body}>The world is at your fingertips with Excursion Explorer on your mobile device. Search any country in the world to discover its pertinent facts, photos, destinations, tips, and more! Excursion is a useful application whether you are on site in a new locale, dreaming of your next big trip, or just looking to learn some new facts from around the globe.</Text>
            <Text style={styles.header}>Change Log (1.0)</Text>
            <Text style={styles.body}>Initial launch</Text>
            <Text style={styles.header}>About The Developer</Text>
            <Text style={styles.body}>The application is written by Brendan Lynch with the help of the React Native framework. Feel free to check out my portfolio for more at www.bclynch.com</Text>
            <Text style={{fontSize: 16, marginTop: 10}}>Contact me via email at bclynch7@gmail.com</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
