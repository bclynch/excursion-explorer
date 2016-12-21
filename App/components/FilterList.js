import React, { Component } from 'react';
import { AppRegistry, Text, View, ListView, TouchableHighlight, Dimensions, ScrollView } from 'react-native';
import {Actions} from "react-native-router-flux";

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2, sectionHeaderHasChanged: (s1, s2) => s1 !== s2});
const width = Dimensions.get('window').width;

const styles = {
  textContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
  capitalText: {
    color: 'green',
    fontSize: 12
  },
  sectionHead: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  filterOption: {
    marginTop: 15
  },
  header: {
    height: 300,
    backgroundColor: 'purple',
    width: width
  }
}

export default class FilterList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: ds.cloneWithRowsAndSections(props.countryRegions[props.selectedRegion])
    }
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount() {

  }

  renderRow(data) {
    return (
      <TouchableHighlight activeOpacity={0} style={styles.filterOption} onPress={() => Actions.countrysplash({selectedCountry: this.props.allCountries[data], allCountries: this.props.allCountries, countryRegions: this.props.countryRegions, favorites: this.props.favorites, cachedCountries: this.props.cachedCountries})}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{data}</Text>
            <Text style={styles.capitalText}>{this.props.allCountries[data].capital}</Text>
          </View>
      </TouchableHighlight>
    );
  }

  renderSectionHeader(sectionData, category) {
    return (
      <Text style={styles.sectionHead}>{category}</Text>
    )
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.header} />
        <ListView style={{marginTop: 10}}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}
          initialListSize={10}
          pageSize={10}
          scrollRenderAheadDistance={1200}
        />
      </ScrollView>
    )
  }
}
