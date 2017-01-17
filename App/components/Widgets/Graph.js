import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions} from "react-native";
import {Actions} from "react-native-router-flux";
import Chart from 'react-native-chart';

const width = Dimensions.get('window').width;

export default class Graph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data
    }
  }

  render() {
    const styles = StyleSheet.create({
      container: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            width: this.props.width,
            marginTop: this.props.marginTop || null,
            marginBottom: this.props.marginBottom || null
        },
        chart: {
            width: this.props.width,
            height: this.props.height,
            left: this.props.height * -.5
        },
    });
    return (
      <View style={styles.container}>
        {
          this.props.title ?
            <View style={{marginBottom: 10}}>
              <Text>{this.props.title}</Text>
            </View>
            :
            null
        }
        <View style={{flexDirection: 'row', alignItems: 'center', left: this.props.width * -.05}}>
        {
          this.props.yAxisLabel ?
          <View style={{left: -.4 * this.props.height, height: this.props.height, width: this.props.height * .6, position: 'relative'}}>
            <View style={{position: 'absolute', top: .4 * this.props.height, width: this.props.height, transform: [{rotate: '-90deg'}]}}>
              <Text style={{textAlign: 'center'}}>{this.props.yAxisLabel}</Text>
            </View>
          </View>
            :
            null
        }
          <Chart
              style={styles.chart}
              data={this.state.data}
              type={this.props.type}
              verticalGridStep={this.props.verticalGridStep || null}
              horizontalGridStep={this.props.horizontalGridStep || null}
              yAxisShortLabel={this.props.yAxisShortLabel || false}
              showDataPoint={this.props.showDataPoint || false}
              lineWidth={this.props.lineWidth || 1}
              yAxisUseDecimal={this.props.yAxisUseDecimal || false}
              color={[this.props.color] || null}
           />
        </View>
        {
          this.props.xAxisLabel ?
          <View>
            <Text>{this.props.xAxisLabel}</Text>
          </View>
            :
            null
        }
      </View>
    );
  }
}
