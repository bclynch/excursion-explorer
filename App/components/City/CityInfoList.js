import React, { Component } from 'react';
import {View, Text, TouchableHighlight, Dimensions, ScrollView} from "react-native";
import {Actions} from "react-native-router-flux";

const width = Dimensions.get('window').width;

const styles = {
  container: {
    alignItems: 'center'
  },
  factsContainer: {
    alignItems: 'center'
  },
  factoid: {
    padding: 30,
    borderBottomWidth: 1,
    borderColor: '#cecece',
    width: width*.85,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}

export default class CityInfoList extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
    this.renderFacts = this.renderFacts.bind(this);
  }

  renderFacts() {
    const self = this;
    return this.props.data.map(function(item, i) {
      return (
        <View key={i} style={styles.factoid}>
          <Text style={{fontSize: 25}}>{item.title}</Text>
          <View style={{justifyContent: 'space-around', alignItems: 'flex-end'}}>
            <Text>Sample</Text>
            <Text>Text</Text>
          </View>
        </View>
      );
    });
  }

  render(){
    return (
      <View style={{marginTop: 300}}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 30}}>{this.props.title}</Text>
        </View>
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          <View style={styles.factsContainer}>
            {this.renderFacts()}
          </View>
        </ScrollView>
      </View>
    );
  }
}
