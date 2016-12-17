import React, { Component } from 'react';
import { AppRegistry, Text, View, ListView, TouchableHighlight, Dimensions } from 'react-native';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const width = Dimensions.get('window').width;

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
        <View style={{}} tabLabel='Tab #1'>
          <View style={{backgroundColor: 'skyblue', flex:1, justifyContent: 'center', width: width*.85, alignItems:'center', marginBottom:10, paddingTop: 10, paddingBottom: 10}}>
            <Text>
              {data}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={{flexDirection: 'row', marginTop: 20, width: width*.85, alignSelf: 'center', justifyContent: 'flex-start'}}>
          <Text>Filter By Region</Text>
        </View>
        <ListView
          dataSource={ds.cloneWithRows(['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Polar'])}
          renderRow={this.renderRow}
        />
      </View>
    )
  }
}
