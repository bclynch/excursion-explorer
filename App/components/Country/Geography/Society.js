import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from "react-native";
import {Actions} from "react-native-router-flux";
import Icon from 'react-native-vector-icons/FontAwesome';
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
    this.populateComparisonGraph = this.populateComparisonGraph.bind(this);
  }

  componentWillMount() {
    const self = this;
    const comparisonDataArr = [
      {arr: ['totalUrbanPop', 'totalRuralPop'], name: 'totalurbanVStotalrural'},
      {arr: ['percentageUrbanOfTotal', 'percentageRuralOfTotal'], name: 'rateurbanVSraterural'}
    ];
    comparisonDataArr.forEach(function(item) {
      self.populateComparisonGraph(item.arr, item.name);
    });
    const dataArr = ['totalPopulation', 'totalGDP', 'gdpGrowth', 'unemployment', 'fertilityRate', 'lifeExpectency', 'internetUsers'];
    dataArr.forEach(function(item) {
      self.populateGraph(item);
    });
  }

  populateGraph(type) {
    //Data needs to be x,y values in double array like so for graph
    let arr = [];
    if(this.props.countryData.societyData[type]) {
      this.props.countryData.societyData[type].map(function(item) {
        let tempArr = [];
        tempArr.push(item.date); //x value
        tempArr.push(item.value === null ? '' : item.value); //y value. If undefined make it an empty string to continue line

        arr.push(tempArr);
      });
      arr = [arr.reverse()];
      this.setState({[type]: arr});
    } else {
      this.setState({[type]: null});
    }
  }

  populateComparisonGraph(arrOfComparisonSets, stateName) {
    const self = this;
    //Data needs to be x,y values in double array like so for graph
    let arr = [];
    if(self.props.countryData.societyData[arrOfComparisonSets[0]]) {
      arrOfComparisonSets.map(function(set) {
        let myArr = [];
        self.props.countryData.societyData[set].map(function(item) {
          let tempArr = [];
          tempArr.push(item.date); //x value
          tempArr.push(item.value === null ? '' : item.value); //y value. If undefined make it an empty string to continue line

          myArr.push(tempArr);
        });
        arr.push(myArr.reverse());
      });

      this.setState({[stateName]: arr});
    } else {
      this.setState({[stateName]: null});
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        {
          this.state.totalPopulation ?
            <View>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 20, textDecorationLine: 'underline', marginVertical: 20}}>Population Demographics</Text>
                <Graph
                  type='line'
                  data={this.state.totalPopulation}
                  width={width * .8}
                  height={200}
                  title='Total Population'
                  xAxisLabel='Year'
                  yAxisLabel='Population'
                  verticalGridStep={6}
                  horizontalGridStep={10}
                  yAxisShortLabel={true}
                  showDataPoint={false}
                  lineWidth={3}
                  color={this.props.colors.tertiary}
                />
                <Graph
                  type='line'
                  data={this.state.totalurbanVStotalrural}
                  width={width * .8}
                  height={200}
                  marginTop={20}
                  title='Total Urban vs Rural Population'
                  xAxisLabel='Year'
                  yAxisLabel='Total'
                  verticalGridStep={5}
                  horizontalGridStep={10}
                  yAxisShortLabel={true}
                  showDataPoint={false}
                  lineWidth={3}
                  color={[this.props.colors.tertiary, this.props.colors.secondary]}
                  legendBorderColor={this.props.colors.primary}
                  legendOptions={[{name: 'Urban', color: this.props.colors.tertiary}, {name: 'Rural', color: this.props.colors.secondary}]}
                />
                <Graph
                  type='line'
                  data={this.state.rateurbanVSraterural}
                  width={width * .8}
                  height={200}
                  marginTop={20}
                  title='Rate of Urban vs Rural Population'
                  xAxisLabel='Year'
                  yAxisLabel='Percentage'
                  verticalGridStep={5}
                  horizontalGridStep={10}
                  yAxisShortLabel={true}
                  showDataPoint={false}
                  lineWidth={3}
                  color={[this.props.colors.tertiary, this.props.colors.secondary]}
                  legendBorderColor={this.props.colors.primary}
                  legendOptions={[{name: 'Urban', color: this.props.colors.tertiary}, {name: 'Rural', color: this.props.colors.secondary}]}
                />
                <Graph
                  type='line'
                  data={this.state.fertilityRate}
                  width={width * .8}
                  height={200}
                  title='Fertility Rate'
                  xAxisLabel='Year'
                  yAxisLabel='Rate'
                  verticalGridStep={3}
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
                  verticalGridStep={5}
                  horizontalGridStep={10}
                  yAxisShortLabel={true}
                  showDataPoint={false}
                  lineWidth={3}
                  color={this.props.colors.tertiary}
                />
                <Graph
                  type='line'
                  data={this.state.internetUsers}
                  width={width * .8}
                  height={200}
                  title='Internet Users'
                  xAxisLabel='Year'
                  yAxisLabel='Users Per 100 People'
                  verticalGridStep={5}
                  horizontalGridStep={10}
                  yAxisShortLabel={true}
                  showDataPoint={false}
                  lineWidth={3}
                  color={this.props.colors.tertiary}
                />
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 20, textDecorationLine: 'underline', alignItems: 'center', marginVertical: 20}}>Economics</Text>
                <Graph
                  type='line'
                  data={this.state.totalGDP}
                  width={width * .8}
                  height={200}
                  title='Total GDP'
                  xAxisLabel='Year'
                  yAxisLabel='GDP'
                  verticalGridStep={5}
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
                  verticalGridStep={6}
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
                  verticalGridStep={3}
                  horizontalGridStep={10}
                  yAxisShortLabel={true}
                  showDataPoint={false}
                  lineWidth={3}
                  color={this.props.colors.tertiary}
                />
              </View>
            </View>
            :
            <View style={{alignItems:'center', width: width * .85}}>
              <Text style={{fontSize: 24, color: this.props.colors.textColor, textAlign: 'center', marginVertical: 80}}>Sorry, no society information for {this.props.countryData.general.name} available at this time</Text>
              <Icon name="chain-broken" size={80} color={this.props.colors.tertiary} />
            </View>
        }
    </ScrollView>
    );
  }
}
