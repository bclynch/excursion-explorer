import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView, ListView} from "react-native";
import {Actions} from "react-native-router-flux";
import Accordion from 'react-native-accordion';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = {

};

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const width = Dimensions.get('window').width;

export default class Health extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: ds.cloneWithRows([{header: 'Health', icon: 'medkit', content: this.props.data.health}, {header: 'Safety', icon: 'warning', content: this.props.data.safety}]),
    }
  }

  _renderRow(data) {
    var header = (
      <View style={{height: 100, width: width * .85, backgroundColor: 'red'}}>
        <Text>{data.header}</Text>
        <Icon name={data.icon} size={40} color="#fff" />
      </View>
    );

    var content = (
      <View style={{width: width * .85, backgroundColor: 'orange'}}>
        <Text>{data.content}</Text>
      </View>
    );

    return (
      <Accordion
        header={header}
        content={content}
        easing="easeOutCubic"
        style={{alignItems: 'center', marginTop: 30}}
      />
    );
  }

  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      </View>
    );
  }
}
