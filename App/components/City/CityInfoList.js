import React, { Component } from 'react';
import {View, Text, TouchableHighlight, Dimensions, ScrollView, ListView} from "react-native";
import {Actions} from "react-native-router-flux";

const width = Dimensions.get('window').width;
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

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
    width: width * .85,
    justifyContent: 'space-between',
    flex: 1
  }
}

export default class CityInfoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ds.cloneWithRows(props.data)
    }
    this.renderFacts = this.renderFacts.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: ds.cloneWithRows(nextProps.data)});
  }

  renderFacts(item) {
      return (
        <View key={item.title} style={styles.factoid}>
          <Text style={{fontSize: 25}}>{item.title}</Text>
          {
            item.tags ?
              <Text>{item.category.title} - {item.tags[0].title}</Text>
              :
              <Text>{item.category.title}</Text>
          }
          {
            item.openingHours ?
            [
              <Text key={item.id}>Hours: {item.openingHours.text.replace(/(<([^>]+)>)/ig, ' ')}</Text>,
              (  item.openingHours.isOpen ?
                  <Text key={item.position[0]} style={{color: 'green'}}>Open</Text>
                  :
                  <Text key={item.position[1]} style={{color: 'red'}}>Closed</Text>
              )
            ]
              :
              null
          }
          <Text>{item.vicinity.replace(/(<([^>]+)>)/ig, ' ')}</Text>
        </View>
      );
  }

  render(){
    return (
      <View style={{marginTop: 300}}>
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          <View style={styles.factsContainer}>
            {this.props.data.length > 0 ?
              <ListView
                dataSource={this.state.data}
                renderRow={this.renderFacts}
                enableEmptySections
              />
              :
              <View style={{marginTop: 40, width: width * .85}}>
                <Text style={{fontSize: 20, textAlign: 'center'}}>Sorry, no {this.props.title.toLowerCase()} information available to display</Text>
              </View>
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}
//this.renderFacts()
