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

export default class DestinationsList extends Component {
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
        <TouchableHighlight key={i} onPress={self.props.handleSelection.bind(null, item, i)} >
          <View style={styles.factoid}>
            <Text style={{fontSize: 25, flex: 1}}>{item.name}</Text>
            <View style={{justifyContent: 'space-around', alignItems: 'flex-end', flex: 1}}>
              {item.fCode === 'PPLC' ?
                <Text style={{fontSize: 20}}>Capital</Text> :
                <Text style={{fontSize: 20}}>City</Text>
              }
              <Text>Pop: {item.population}</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    });
  }

  render(){
    return (
      <View style={{marginTop: 300}}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 30, textAlign: 'center'}}>{this.props.demonym} Destinations</Text>
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
