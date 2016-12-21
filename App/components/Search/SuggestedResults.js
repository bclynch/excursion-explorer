import React, { Component } from 'react';
import { AppRegistry, Text, View, ListView, TouchableHighlight, Dimensions } from 'react-native';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const width = Dimensions.get('window').width;

export default class SuggestedResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resultOptions: ds.cloneWithRows([''])
    };

    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    this.setState({countryKeys: Object.keys(this.props.allCountries)});
    this.setState({allCountries: this.props.allCountries});
  }

  componentWillReceiveProps(nextProps) {
    this.onSearchInput(nextProps.query);
  }

  onSearchInput(query) {
      if(!query) {
        return;
      }
      var tempArr = [];
      for(var j = 0; j < this.state.countryKeys.length; j++) {
          if(this.state.countryKeys[j].toLowerCase().indexOf(query.toLowerCase()) !== -1) {
             tempArr.push(this.state.countryKeys[j]) ;
          }
      }
      this.setState({resultOptions: ds.cloneWithRows(tempArr)});
  }

  renderRow(data) {
    if(!data) return null;
    return (
      <TouchableHighlight onPress={this.props.handleSelection.bind(null, data)} activeOpacity={0.1} underlayColor={'#eee'}>
        <View style={{padding: 30, borderBottomWidth: 1, borderColor: '#cecece', width: width*.85}}>
          <Text style={{fontSize: 25}}>
            {data}
          </Text>
          <Text>
            {this.state.allCountries[data].subregion}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={{flexDirection: 'row', marginTop: 20, width: width*.85, alignSelf: 'center', justifyContent: 'flex-start'}}>
          <Text style={{fontSize: 20}}>Results</Text>
        </View>
        <ListView
          dataSource={this.state.resultOptions}
          renderRow={this.renderRow}
        />
      </View>
    )
  }
}
