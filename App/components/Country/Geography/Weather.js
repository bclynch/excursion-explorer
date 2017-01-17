import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from "react-native";
import {Actions} from "react-native-router-flux";
import Graph from '../../Widgets/Graph.js';

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
    this.props.countryData.societyData[type].map(function(item) {
      let tempArr = [];
      tempArr.push(self.convertNumberToMonth(item.month)); //x value
      tempArr.push(item.data === null ? '' : self.modUnits(item.data), type); //y value. If undefined make it an empty string to continue line
      arr.push(tempArr);
    });
    arr = [arr];
    this.setState({[type]: arr});
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
        <Graph
          type='line'
          data={this.state.temp}
          width={width * .8}
          height={200}
          title='Average Temperature'
          yAxisLabel={this.props.settings.temp === 'C' ? 'Temperature (C)' : 'Temperature (F)'}
          verticalGridStep={8}
          horizontalGridStep={12}
          yAxisShortLabel={true}
          showDataPoint={true}
          lineWidth={3}
          color={this.props.colors.tertiary}
        />
        <Graph
          type='line'
          data={this.state.precip}
          width={width * .8}
          height={200}
          title='Average Precipitation'
          yAxisLabel={this.props.settings.units === 'metric' ? 'Precipitation (mm)' : 'Precipitation (in)'}
          verticalGridStep={8}
          horizontalGridStep={12}
          yAxisShortLabel={true}
          showDataPoint={true}
          lineWidth={3}
          color={this.props.colors.tertiary}
        />
    </ScrollView>
    );
  }
}
