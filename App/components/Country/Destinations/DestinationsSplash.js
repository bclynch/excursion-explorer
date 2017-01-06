import React, { Component } from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator} from "react-native";
import {Actions} from "react-native-router-flux";
import MapView from 'react-native-maps';
import store from 'react-native-simple-store';
import NavBar from '../../NavBar.js';
import DestinationsList from './DestinationsList.js';
import CustomCallout from '../../CustomCallout.js';

import nightStyle from '../../../../assets/mapNight.json';
import desertStyle from '../../../../assets/mapDesert.json';

import API from '../../../api.js';
import Keys from '../../../../API_KEYS.js';

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

export default class DestinationsSplash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: this.props.countryData.general.latlng[0],
        longitude: this.props.countryData.general.latlng[1],
        latitudeDelta: 6,
        longitudeDelta: 6
      },
      markers: null,
      destinations: null,
      cachedCountries: props.cachedCountries,
      selectedCountryData: props.countryData
    }
    this.onRegionChange = this.onRegionChange.bind(this);
    this.selectDestination = this.selectDestination.bind(this);
  }

  componentDidMount() {
    //Checking cached country prop for existing data, if any
    if(this.props.countryData.destinations) {
      console.log('Grab existing destinations data');
      this.setState({destinations: this.props.countryData.destinations, markers: this.chopDestinationData(this.props.countryData.destinations)});

      let markerArr = [];
      for(var i = 0; i < this.props.countryData.destinations.length; i++) {
        markerArr.push(`Marker${i+1}`);
      }
      animationTimeout = setTimeout(() => {
        this.map.fitToSuppliedMarkers(markerArr, true);
      }, 1500);
    } else {
      //Make API call, save to state, save to store
      //Doesn't exist so grab data
      console.log('grabbing new destinations data');
      API.destinations(Keys.geonames.username, this.props.countryData.general.alpha2Code).then((data) => {
        let destinationsArr = [];
        //Create array of city information to save to state for markers
        for(var i = 0; i < 10; i++) {
          let destinationObj = {};
          destinationObj.name = data.geonames[i].name;
          destinationObj.lat = data.geonames[i].lat;
          destinationObj.lon = data.geonames[i].lng;
          destinationObj.population = data.geonames[i].population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          //If fcode is PPLC it's the capital
          destinationObj.fCode = data.geonames[i].fcode;
          destinationObj.country = this.props.countryData.general.name;

          destinationsArr.push(destinationObj);
        }

        //Chop + save to markers array
        this.setState({destinations: destinationsArr, markers: this.chopDestinationData(destinationsArr)});

        //Save to cached countries store
        const existingDataObj = this.state.selectedCountryData;
        existingDataObj['destinations'] = destinationsArr;
        this.setState({selectedCountryData: existingDataObj});
        const abc = this.state.cachedCountries;
        abc[this.props.countryData.general.name] = existingDataObj;
        this.setState({cachedCountries: abc});
        store.save('countries', abc);

        let markerArr = [];
        for(var i = 0; i < destinationsArr.length; i++) {
          markerArr.push(`Marker${i+1}`);
        }
        animationTimeout = setTimeout(() => {
          this.map.fitToSuppliedMarkers(markerArr, true);
        }, 2000);
      }).catch(function(err) {
        console.log(err);
      });
    }
  }

  chopDestinationData(destinationsArr) {
    //Make destination arr good for markers prop on state to be read by map
    return destinationsArr.map(destination => {
      return {
        latlng: {
          latitude: Number(destination.lat),
          longitude: Number(destination.lon),
        },
        title: destination.name
      }
    });
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  selectDestination(data, index) {
    Actions.citysplash({destinationFeatures: data, index: index, countryData: this.state.selectedCountryData, allCountries: this.props.allCountries, countryRegions: this.props.countryRegions, favorites: this.props.favorites, cachedCountries: this.state.cachedCountries});
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <NavBar
          allCountries={this.props.allCountries}
          countryRegions={this.props.countryRegions}
          favorites={this.props.favorites}
          cachedCountries={this.state.cachedCountries}
          backArrow={true}
          colors={this.props.colors}
        />
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          {this.state.markers ?
            <View style={{width: width}}>
              <MapView
                region={this.state.region}
                onRegionChange={this.onRegionChange}
                style={styles.map}
                customMapStyle={nightStyle}
                showsPointsOfInterest={true}
                ref={ref => { this.map = ref; }}
               >
                 {this.state.markers.map((marker, i) => (
                    <MapView.Marker
                      key={i}
                      pinColor='orange'
                      identifier={`Marker${i+1}`}
                      coordinate={marker.latlng}
                    >
                      <MapView.Callout onPress={() => this.selectDestination(this.state.destinations[i], i)} tooltip style={{width: 140, height: 80}}>
                        <CustomCallout>
                          <Text style={{
                              color: 'rgba(255, 255, 255, 1)',
                              opacity: 1,
                              textAlign: 'center',
                              fontSize: 16
                            }}>
                              Explore {marker.title}
                            </Text>
                        </CustomCallout>
                      </MapView.Callout>
                    </MapView.Marker>
                ))}
               </MapView>
               <DestinationsList
                 demonym={this.props.countryData.general.demonym}
                 data={this.state.destinations}
                 handleSelection={this.selectDestination}
               />
            </View>
           :
             <ActivityIndicator
               style={{height: 125}}
               size="large"
               color={this.props.colors.tertiary}
             />
         }
        </ScrollView>
      </View>
    );
  }
}
