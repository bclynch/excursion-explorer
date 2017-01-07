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
  }

  componentWillMount() {
    const self = this;
    const dataArr = ['totalPopulation', 'totalGDP', 'gdpGrowth', 'unemployment', 'fertilityRate', 'lifeExpectency', 'internetUsers'];
    dataArr.forEach(function(item) {
      self.populateGraph(item);
    });
  }

  populateGraph(type) {
    //Data needs to be x,y values in double array like so for graph
    let arr = [];
    this.props.countryData.societyData[type].map(function(item) {
      let tempArr = [];
      tempArr.push(item.date); //x value
      tempArr.push(item.value === null ? '' : item.value); //y value. If undefined make it an empty string to continue line

      arr.push(tempArr);
    });
    arr = [arr.reverse()];
    this.setState({[type]: arr});
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <Graph
          type='line'
          data={this.state.totalPopulation}
          width={width * .8}
          height={200}
          title='Total Population'
          xAxisLabel='Year'
          yAxisLabel='Population'
          verticalGridStep={8}
          horizontalGridStep={10}
          yAxisShortLabel={true}
          showDataPoint={false}
          lineWidth={3}
          color={this.props.colors.tertiary}
        />
        <Graph
          type='line'
          data={this.state.totalGDP}
          width={width * .8}
          height={200}
          title='Total GDP'
          xAxisLabel='Year'
          yAxisLabel='GDP'
          verticalGridStep={8}
          horizontalGridStep={10}
          yAxisShortLabel={true}
          showDataPoint={false}
          lineWidth={3}
          color={this.props.colors.tertiary}
        />
        <Graph
          type='line'
          data={this.state.gdpGrowth}
          width={width * .8}
          height={200}
          title='GDP Growth'
          xAxisLabel='Year'
          yAxisLabel='Rate'
          verticalGridStep={10}
          horizontalGridStep={10}
          yAxisShortLabel={true}
          showDataPoint={false}
          lineWidth={3}
          color={this.props.colors.tertiary}
        />
        <Graph
          type='line'
          data={this.state.unemployment}
          width={width * .8}
          height={200}
          title='Unemployment Rate'
          xAxisLabel='Year'
          yAxisLabel='Rate'
          verticalGridStep={8}
          horizontalGridStep={10}
          yAxisShortLabel={true}
          showDataPoint={false}
          lineWidth={3}
          color={this.props.colors.tertiary}
        />
        <Graph
          type='line'
          data={this.state.fertilityRate}
          width={width * .8}
          height={200}
          title='Fertility Rate'
          xAxisLabel='Year'
          yAxisLabel='Rate'
          verticalGridStep={4}
          horizontalGridStep={10}
          yAxisShortLabel={true}
          showDataPoint={false}
          lineWidth={3}
          color={this.props.colors.tertiary}
        />
        <Graph
          type='line'
          data={this.state.lifeExpectency}
          width={width * .8}
          height={200}
          title='Life Expectency'
          xAxisLabel='Year'
          yAxisLabel='Age'
          verticalGridStep={10}
          horizontalGridStep={10}
          yAxisShortLabel={true}
          showDataPoint={false}
          lineWidth={3}
          color={this.props.colors.tertiary}
        />
        <Graph
          type='line'
          data={this.state.lifeExpectency}
          width={width * .8}
          height={200}
          title='Internet Users'
          xAxisLabel='Year'
          yAxisLabel='Users Per 100 People'
          verticalGridStep={8}
          horizontalGridStep={10}
          yAxisShortLabel={true}
          showDataPoint={false}
          lineWidth={3}
          color={this.props.colors.tertiary}
        />
    </ScrollView>
    );
  }
}
