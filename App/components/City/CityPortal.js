import React, { Component } from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator} from "react-native";
import {Actions} from "react-native-router-flux";
import MapView from 'react-native-maps';
import store from 'react-native-simple-store';
import CityInfoList from './CityInfoList.js';
import CustomCallout from '../CustomCallout.js';

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

  componentWillReceiveProps(nextProps) {
    this.setState({destinations: nextProps.data.features[nextProps.option][nextProps.type].slice(0, 15)});
  }

  componentDidMount() {
    let markerArr = [];
    for(var i = 0; i < this.state.destinations.length; i++) {
      markerArr.push(`Marker${i+1}`);
    }
    animationTimeout = setTimeout(() => {
      this.map.fitToSuppliedMarkers(markerArr, true);
    }, 1500);
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
                 {this.state.destinations.map((marker, i) => {
                   const descrArr = marker.vicinity.replace(/(<([^>]+)>)/ig, '*').split('*');
                   return (
                    <MapView.Marker
                      key={i}
                      pinColor='orange'
                      identifier={`Marker${i+1}`}
                      coordinate={{latitude: Number(marker.position[0]), longitude: Number(marker.position[1])}}
                    >
                      <MapView.Callout tooltip style={{width: 250, height: 100}}>
                        <CustomCallout>
                          {descrArr.length === 0 ?
                            <View>
                              <Text style={{color: 'rgba(255, 255, 255, 1)', opacity: 1, textAlign: 'center', fontSize: 16}}>{marker.title}</Text>
                              <Text style={{color: 'rgba(255, 255, 255, 1)', opacity: 1, fontSize: 11}}>{descrArr[0]}</Text>
                            </View>
                            :
                            <View>
                              <Text style={{color: 'rgba(255, 255, 255, 1)', opacity: 1, textAlign: 'center', fontSize: 16}}>{marker.title}</Text>
                              <Text style={{color: 'rgba(255, 255, 255, 1)', opacity: 1, fontSize: 11}}>{descrArr[0]}</Text>
                              <Text style={{color: 'rgba(255, 255, 255, 1)', opacity: 1, fontSize: 11}}>{descrArr[1]}</Text>
                            </View>
                          }
                        </CustomCallout>
                      </MapView.Callout>
                    </MapView.Marker>
                  )
                })}
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
