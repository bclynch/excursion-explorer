import React, { Component } from 'react';
import { AppRegistry, Text, View, ListView, TouchableHighlight } from 'react-native';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

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
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.query);
    // this.setState({query: nextProps.query});

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
          if(tempArr.length === 10) {
              break;
          }
      }
      this.setState({resultOptions: ds.cloneWithRows(tempArr)});
      console.log(tempArr);
  }

  renderRow(data) {
    return (
      <TouchableHighlight onPress={this.props.handleSelection.bind(null, data)}>
        <View>
          <Text>
            {data}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View>
        <Text>Results</Text>
          <ListView
            dataSource={this.state.resultOptions}
            renderRow={this.renderRow}
          />
      </View>
    )
  }
}
