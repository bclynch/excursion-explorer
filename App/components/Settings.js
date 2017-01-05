import React, { Component } from 'react';
import {View, Text, Dimensions, TouchableHighlight, Image, ScrollView} from "react-native";
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
  }
}

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  //Would like reset app data (delete store)
  //About app
  //Review on Play store
  //Feedback
  //Eventually Login/out capabilities

  render(){
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={styles.nav}>
          <TouchableHighlight onPress={Actions.pop} title='Back' activeOpacity={0.1} underlayColor={'#eee'}>
            <Icon name="arrow-left" size={30} color="#cecece" />
          </TouchableHighlight>
          <Text style={{fontSize: 30}}>Settings</Text>
          <View />
        </View>
        <ScrollView {...this.props}>
          <View style={{width: width * .85}}>
            <Text>Stuff</Text>

          </View>
        </ScrollView>
      </View>
    );
  }
}
