import React, { Component } from 'react';
import { AppRegistry, Text, View, ListView, TouchableHighlight, Dimensions, ScrollView, RecyclerViewBackedScrollView } from 'react-native';
import {Actions} from "react-native-router-flux";
import NavBar from './NavBar.js';

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
  listOption: {
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#cecece',
    overflow: 'hidden'
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

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2, sectionHeaderHasChanged: (s1, s2) => s1 !== s2});

    this.state = {
      dataSource: ds.cloneWithRowsAndSections(props.countryRegions[props.selectedRegion])
    }
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount() {

  }

  renderRow(data) {
    return (
      <TouchableHighlight style={styles.listOption} onPress={() => Actions.countrysplash({selectedCountry: this.props.allCountries[data], allCountries: this.props.allCountries, countryRegions: this.props.countryRegions, favorites: this.props.favorites, cachedCountries: this.props.cachedCountries})}>
        <Text style={styles.text}>{data}</Text>
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
      <View style={{flex: 1, alignItems: 'center'}}>
        <NavBar allCountries={this.props.allCountries} countryRegions={this.props.countryRegions} favorites={this.props.favorites} cachedCountries={this.props.cachedCountries} backArrow={true} />

            <ListView style={{marginTop: 10}}
              removeClippedSubviews={true}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
              renderSectionHeader={this.renderSectionHeader}
              initialListSize={15}
              pageSize={15}

            />

      </View>
    )
  }
}
