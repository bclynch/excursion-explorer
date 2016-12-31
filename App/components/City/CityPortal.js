import React, { Component } from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator} from "react-native";
import {Actions} from "react-native-router-flux";
import MapView from 'react-native-maps';
import store from 'react-native-simple-store';
import NavBar from '../NavBar.js';
import CityInfoList from './CityInfoList.js';

import nightStyle from '../../../assets/mapNight.json';
import desertStyle from '../../../assets/mapDesert.json';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: width,
    height: 300
  }
});

const width = Dimensions.get('window').width;

export default class CityPortal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: Number(props.data.lat),
        longitude: Number(props.data.lon),
        latitudeDelta: .05,
        longitudeDelta: .05
      },
      destinations: props.data.features[props.option][props.type].slice(0, 15)
    }
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  componentDidMount() {
    let markerArr = [];
    for(var i = 0; i < this.state.destinations.length; i++) {
      markerArr.push(`Marker${i+1}`);
    }
    animationTimeout = setTimeout(() => {
      this.map.fitToSuppliedMarkers(markerArr, true);
    }, 2000);
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          {this.state.destinations ?
            <View style={{width: width}}>
              <MapView
                region={this.state.region}
                onRegionChange={this.onRegionChange}
                style={styles.map}
                customMapStyle={nightStyle}
                showsPointsOfInterest={true}
                ref={ref => { this.map = ref; }}
               >
                 {this.state.destinations.map((marker, i) => (
                    <MapView.Marker
                      key={i}
                      identifier={`Marker${i+1}`}
                      coordinate={{latitude: Number(marker.position[0]), longitude: Number(marker.position[1])}}
                      title={marker.title}
                      description={marker.vicinity}
                    />
                ))}
               </MapView>
               <CityInfoList
                 title={this.props.title}
                 data={this.state.destinations}
               />
            </View>
           :
             <ActivityIndicator
               style={{height: 125}}
               size="large"
             />
         }
        </ScrollView>
      </View>
    );
  }
}
