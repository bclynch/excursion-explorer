import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from "react-native";
import {Actions} from "react-native-router-flux";

const styles = {

};

const width = Dimensions.get('window').width;

export default class Society extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
    this.renderInfo = this.renderInfo.bind(this);
    this.avgForPeriod = this.avgForPeriod.bind(this);
  }

  componentWillMount() {
    let annualArr = [];
    for(var i = 0; i < 4; i++) {
      annualArr.push(this.avgForPeriod(i));
    }
    this.setState({annualAvg: annualArr});
  }

  avgForPeriod(period) {
    const dataArr = [this.props.data[period * 3].data, this.props.data[period * 3 + 1].data, this.props.data[period * 3 + 2].data];
    const sum = dataArr.reduce(function(a,b) {return a + b});
    const avg = Math.round(sum / 3);
    if(this.props.unit === 'C' || this.props.unit === 'mm') {
      return avg;
    } else if(this.props.unit === 'F') {
      return avg * 9 / 5 + 32;
    } else {
      return avg * .0393701;
    }
  }

  renderInfo() {
    const self = this;
    const periodArr = ['Jan - Mar', 'Apr - Jun', 'Jul - Sep', 'Oct - Dec'];
    return periodArr.map((item, i) => {
      return (
        <View key={i}>
          <Text>
            <Text>{item}: </Text>
            <Text style={{fontWeight: 'bold', color: 'red'}}>{self.state.annualAvg[i] === Math.max.apply(null, self.state.annualAvg) ? [(self.props.type === 'temperature' ? 'Hottest ' : 'Wettest ')] : null }</Text>
            <Text style={{fontWeight: 'bold', color: 'teal'}}>{self.state.annualAvg[i] === Math.min.apply(null, self.state.annualAvg) ? [(self.props.type === 'temperature' ? 'Coolest ' : 'Dryest ')] : null }</Text>
            <Text>Average {self.props.type} is {self.props.unit === 'in' ? self.state.annualAvg[i].toFixed(2) : self.state.annualAvg[i]}{self.props.unit}</Text>
          </Text>
        </View>
      )
    });
  }

  render() {
    return (
      <View style={{width: width * .85}}>
        {this.renderInfo()}
      </View>
    );
  }
}
