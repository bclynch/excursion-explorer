import React, { Component } from 'react';
import { AppRegistry, Text, View, ListView, TouchableHighlight } from 'react-native';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class FilterRegion extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  renderRow(data) {
    //Would be nice to have a banner type look for each of the regions
    //Could have accordian look with the rest of the subregions/countries displayed on click
    return (
      <TouchableHighlight>
        <View style={{height: 300}} tabLabel='Tab #1'>
          <View style={{flex: 1, backgroundColor: 'powderblue'}} />
          <View style={{flex: 2, backgroundColor: 'skyblue', alignItems: 'center', justifyContent: 'center'}}>
            <Text>
              {data}
            </Text>
          </View>
          <View style={{flex: 1, backgroundColor: 'steelblue'}} />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View>
        <Text>Filter By Region</Text>

          <ListView
            dataSource={ds.cloneWithRows(['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Polar'])}
            renderRow={this.renderRow}
          />

      </View>
    )
  }
}
