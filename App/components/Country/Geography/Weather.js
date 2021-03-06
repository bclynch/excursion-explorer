import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from "react-native";
import {Actions} from "react-native-router-flux";
import Icon from 'react-native-vector-icons/FontAwesome';
import Graph from '../../Widgets/Graph.js';
import WeatherSummary from './WeatherSummary.js';

const styles = {

};

const width = Dimensions.get('window').width;

export default class Society extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
    this.populateGraph = this.populateGraph.bind(this);
    this.modUnits = this.modUnits.bind(this);
  }

  componentWillMount() {
    const self = this;
    const dataArr = ['precip', 'temp'];
    dataArr.forEach(function(item, i) {
      self.populateGraph(item);
    });
  }

  convertNumberToMonth(month) {
    switch(month) {
      case 0:
        return 'Jan';
        break;
      case 1:
        return 'Feb';
        break;
      case 2:
        return 'Mar';
        break;
      case 3:
        return 'Apr';
        break;
      case 4:
        return 'May';
        break;
      case 5:
        return 'June';
        break;
      case 6:
        return 'July';
        break;
      case 7:
        return 'Aug';
        break;
      case 8:
        return 'Sep';
        break;
      case 9:
        return 'Oct';
        break;
      case 10:
        return 'Nov';
        break;
      case 11:
        return 'Dec';
        break;
    }
  }

  populateGraph(type) {
    const self = this;
    //Data needs to be x,y values in double array like so for graph
    let arr = [];
    if(this.props.countryData.societyData[type]) {
      this.props.countryData.societyData[type].map(function(item) {
        let tempArr = [];
        tempArr.push(self.convertNumberToMonth(item.month)); //x value
        tempArr.push(item.data === null ? '' : self.modUnits(item.data, type)); //y value. If undefined make it an empty string to continue line
        arr.push(tempArr);
      });
      arr = [arr];
      this.setState({[type]: arr});
    } else {
      this.setState({[type]: null});
    }
  }

  modUnits(data, type) {
    const self = this;
    if(type === 'precip') {
      if(self.props.settings.units === 'metric') {
        return data;
      } else {
        return data * .0393701;
      }
    } else {
      if(self.props.settings.temp === 'C') {
        return data;
      } else {
        return data * 9 / 5 + 32;
      }
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        {
          this.state.temp ?
            <View>
              <Graph
                type='line'
                data={this.state.temp}
                width={width * .8}
                height={200}
                marginTop={25}
                marginBottom={10}
                title='Average Temperature'
                yAxisLabel={this.props.settings.temp === 'C' ? 'Temperature (C)' : 'Temperature (F)'}
                verticalGridStep={this.props.settings.temp === 'C' ? 5 : 8}
                horizontalGridStep={12}
                yAxisShortLabel={true}
                showDataPoint={true}
                lineWidth={3}
                color={this.props.colors.tertiary}
              />
              <WeatherSummary data={this.props.countryData.societyData.temp} type='temperature' unit={this.props.settings.temp === 'C' ? 'C' : 'F'} />
              <Graph
                type='line'
                data={this.state.precip}
                width={width * .8}
                height={200}
                marginTop={25}
                marginBottom={10}
                title='Average Precipitation'
                yAxisLabel={this.props.settings.units === 'metric' ? 'Precipitation (mm)' : 'Precipitation (in)'}
                verticalGridStep={this.props.settings.units === 'metric' ? 8 : 3}
                horizontalGridStep={12}
                yAxisShortLabel={true}
                showDataPoint={true}
                lineWidth={3}
                color={this.props.colors.tertiary}
              />
              <WeatherSummary data={this.props.countryData.societyData.precip} type='precipitation' unit={this.props.settings.units === 'metric' ? 'mm' : 'in'} />
            </View>
            :
            <View style={{alignItems:'center', width: width * .85}}>
              <Text style={{fontSize: 24, color: this.props.colors.textColor, textAlign: 'center', marginVertical: 80}}>Sorry, no climate information for {this.props.countryData.general.name} available at this time</Text>
              <Icon name="chain-broken" size={80} color={this.props.colors.tertiary} />
            </View>
        }
      </ScrollView>
    );
  }
}
