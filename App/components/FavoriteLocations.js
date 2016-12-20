import React, { Component } from 'react';
import { AppRegistry, Text, View, TouchableHighlight, Dimensions, ListView } from 'react-native';
import {Actions} from "react-native-router-flux";
import Icon from 'react-native-vector-icons/FontAwesome';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const width = Dimensions.get('window').width;

export default class FavoriteLocations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favorites: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({favorites: nextProps.favorites});
  }

  renderRow(data) {
    //Would be nice to have a banner type look for each of the regions
    //Could have accordian look with the rest of the subregions/countries displayed on click
    return (

          <View >
            <Text >{data}</Text>
          </View>

    );
  }

  render() {
    const styles = {
      container: {
        alignItems: 'space-around',
        width: width * .85,
      }
    }
    return (
      <View>
        <ListView style={{marginTop: 10, marginBottom: 100}}
          dataSource={ds.cloneWithRows(this.state.favorites)}
          renderRow={this.renderRow}
        />
      </View>
    )
  }
}
