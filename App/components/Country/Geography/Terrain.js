import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from "react-native";
import {Actions} from "react-native-router-flux";
import Graph from '../../Widgets/Graph.js';

const styles = {

};

const width = Dimensions.get('window').width;

export default class Terrain extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
    this.populateGraph = this.populateGraph.bind(this);
    this.populateComparisonGraph = this.populateComparisonGraph.bind(this);
  }

  componentWillMount() {
    const self = this;
    const dataArr = ['percentageInSlums'];
    dataArr.forEach(function(item) {
      self.populateGraph(item);
    });
    const comparisonDataArr = [
      {arr: ['agPercentageOfLand', 'frstPercentageOfLand'], name: 'agVSfrst'},
      {arr: ['percentageUrbanOfTotal', 'percentageRuralOfTotal'], name: 'rateurbanVSraterural'},
      {arr: ['totalUrbanPop', 'totalRuralPop'], name: 'totalurbanVStotalrural'}
    ];
    comparisonDataArr.forEach(function(item) {
      self.populateComparisonGraph(item.arr, item.name);
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

  populateComparisonGraph(arrOfComparisonSets, stateName) {
    const self = this;
    //Data needs to be x,y values in double array like so for graph
    let arr = [];
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
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <Graph
          type='line'
          data={this.state.percentageInSlums}
          width={width * .8}
          height={200}
          title='% In Slums'
          xAxisLabel='Year'
          yAxisLabel='Percentage'
          verticalGridStep={8}
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
          title='Total Urban vs Rural Population'
          xAxisLabel='Year'
          yAxisLabel='Total'
          verticalGridStep={8}
          horizontalGridStep={10}
          yAxisShortLabel={true}
          showDataPoint={false}
          lineWidth={3}
          color={this.props.colors.tertiary}
        />
        <Graph
          type='line'
          data={this.state.rateurbanVSraterural}
          width={width * .8}
          height={200}
          title='Rate of Urban vs Rural Population'
          xAxisLabel='Year'
          yAxisLabel='Percentage'
          verticalGridStep={8}
          horizontalGridStep={10}
          yAxisShortLabel={true}
          showDataPoint={false}
          lineWidth={3}
          color={this.props.colors.tertiary}
        />
        <Graph
          type='line'
          data={this.state.agVSfrst}
          width={width * .8}
          height={200}
          title='Rate of Agricultural vs Forested Land'
          xAxisLabel='Year'
          yAxisLabel='Percentage'
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

//
// import React, { Component } from 'react';
// import {View, Text, StyleSheet, Dimensions} from "react-native";
// import {Actions} from "react-native-router-flux";
// import MapView from 'react-native-maps';
//
// const styles = {
//   map: {
//     ...StyleSheet.absoluteFillObject,
//     width: width,
//     height: 300
//   }
// };
//
// const width = Dimensions.get('window').width;
//
// export default class Terrain extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       region: {
//         latitude: this.props.position[0],
//         longitude: this.props.position[1],
//         latitudeDelta: 6,
//         longitudeDelta: 6,
//       }
//     }
//     this.onRegionChange = this.onRegionChange.bind(this);
//   }
//
//   onRegionChange(region) {
//     this.setState({ region });
//   }
//
//   render() {
//     return (
//       <View style={{flex: 1, alignItems: 'center'}}>
//         <Text>Terrain</Text>
//         <MapView
//           region={this.state.region}
//           onRegionChange={this.onRegionChange}
//           style={styles.map}
//           mapType='terrain'
//          />
//       </View>
//     );
//   }
// }
