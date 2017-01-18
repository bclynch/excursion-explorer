import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from "react-native";
import {Actions} from "react-native-router-flux";
import Icon from 'react-native-vector-icons/FontAwesome';
import Graph from '../../Widgets/Graph.js';

const styles = {

};

const width = Dimensions.get('window').width;

export default class Terrain extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
    this.populateComparisonGraph = this.populateComparisonGraph.bind(this);
  }

  componentWillMount() {
    const self = this;
    const comparisonDataArr = [
      {arr: ['agPercentageOfLand', 'frstPercentageOfLand'], name: 'agVSfrst'},
    ];
    comparisonDataArr.forEach(function(item) {
      self.populateComparisonGraph(item.arr, item.name);
    });
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
          this.state.agVSfrst ?
            <Graph
              type='line'
              data={this.state.agVSfrst}
              width={width * .8}
              height={200}
              marginTop={20}
              title='Rate of Agricultural vs Forested Land'
              xAxisLabel='Year'
              yAxisLabel='Percentage'
              verticalGridStep={5}
              horizontalGridStep={10}
              yAxisShortLabel={true}
              showDataPoint={false}
              lineWidth={3}
              color={[this.props.colors.tertiary, this.props.colors.secondary]}
              legendBorderColor={this.props.colors.primary}
              legendOptions={[{name: 'Agricultural', color: this.props.colors.tertiary}, {name: 'Forest', color: this.props.colors.secondary}]}
            />
            :
            <View style={{alignItems:'center', width: width * .85}}>
              <Text style={{fontSize: 24, color: this.props.colors.textColor, textAlign: 'center', marginVertical: 80}}>Sorry, no terrain information for {this.props.countryData.general.name} available at this time</Text>
              <Icon name="chain-broken" size={80} color={this.props.colors.tertiary} />
            </View>
        }
    </ScrollView>
    );
  }
}
