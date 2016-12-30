import React, { Component } from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from "react-native";
import {Actions} from "react-native-router-flux";
import MapView from 'react-native-maps';
import store from 'react-native-simple-store';
import NavBar from '../../NavBar.js';
import DestinationsList from './DestinationsList.js';

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

//Could save these to store and tack on some photos as well. Place in destinations + on map
//Capital by country code (lat,lon,name,pop)- http://api.geonames.org/searchJSON?formatted=true&country=us&orderby=population&featureCode=pplc&username=bclynch
//Cities by population by country (lat,lon,name,pop)- http://api.geonames.org/searchJSON?formatted=true&country=us&orderby=population&featureClass=p&username=bclynch

//Would be nice to have an initial map for destinations that includes top ten Cities
//Markers can have a popup with their name sorted by population and then a link for the city details component
//Also have a list of the pinned cities below the map with same link
//City details component is img header (carousel might be nice w/ flickr) up top with various categories below situated like our country splash
//Each of the cats can open up sliding tabs with information and the markers are pinned on above map

//Popular attractions by category:
//Endpoint: https://places.api.here.com/places/v1/discover/explore?in=52.521%2C13.3807%3Br%3D10000&cat=natural-geographical&app_id=uTLjNcdQaE7eHQzg8FvW&app_code=vkXtaiHQL4KNFqp2HWVWkQ
//Above has a radius of 10000m (10km) with category of natural-geographical at described lat/lon
//Includes title, category, tags, position, vicinity (address)
// Categories:

// eat-drink:
//
// restaurant
// snacks-fast-food
// bar-pub
// coffee-tea
// coffee
// tea

// going-out:
//
// dance-night-club
// cinema
// theatre-music-culture
// casino

// sights-museums:
//
// landmark-attraction
// museum
// religious-place

// transport:
//
// airport
// railway-station
// public-transport
// ferry-terminal
// taxi-stand

// accommodation:
//
// hotel
// motel
// hostel
// camping

// shopping:
//
// kiosk-convenience-store
// wine-and-liquor
// mall
// department-store
// food-drink
// bookshop
// pharmacy
// electronics-shop
// hardware-house-garden-shop
// clothing-accessories-shop
// sport-outdoor-shop
// shop

// business-services:
//
// atm-bank-exchange
// police-emergency
// ambulance-services
// fire-department
// police-station
// post-office
// tourist-information
// petrol-station
// car-rental
// car-dealer-repair
// travel-agency
// communication-media
// business-industry
// service

// facilities:
//
// hospital-health-care-facility
// hospital
// government-community-facility
// education-facility
// library
// fair-convention-facility
// parking-facility
// toilet-rest-area
// sports-facility-venue
// facility

// leisure-outdoor:
//
// recreation
// amusement-holiday-park
// zoo

// administrative-areas-buildings:
//
// administrative-region
// city-town-village
// outdoor-area-complex
// building
// street-square
// postal-area

// natural-geographical:
//
// body-of-water
// mountain-hill
// undersea-feature
// forest-heath-vegetation

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
      destinations: null
    }
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  componentDidMount() {
    //Checking cached country prop for existing data, if any
    if(this.props.countryData.destinations) {
      console.log('Grab existing destinations data');
      this.setState({destinations: this.props.countryData.destinations, markers: this.chopDestinationData(this.props.countryData.destinations)});
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

          destinationsArr.push(destinationObj);
        }

        //Chop + save to markers array
        this.setState({destinations: destinationsArr, markers: this.chopDestinationData(destinationsArr)});

        //Save to cached countries store
        const existingDataObj = this.props.countryData;
        existingDataObj['destinations'] = destinationsArr;
        const abc = this.props.cachedCountries;
        abc[this.props.countryData.general.name] = existingDataObj;
        store.save('countries', abc);
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
        title: destination.name,
        description: `City of ${destination.population} people`
      }
    });
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <NavBar allCountries={this.props.allCountries} countryRegions={this.props.countryRegions} favorites={this.props.favorites} cachedCountries={this.props.cachedCountries} backArrow={true} />
        <ScrollView contentContainerStyle={{alignItems: 'center', width: width}}>
          <MapView
            region={this.state.region}
            onRegionChange={this.onRegionChange}
            style={styles.map}
            customMapStyle={nightStyle}
           >
             {this.state.markers ?
               this.state.markers.map((marker, i) => (
                  <MapView.Marker
                    key={i}
                    coordinate={marker.latlng}
                    title={marker.title}
                    description={marker.description + i}
                  />
                ))
               :
               null
             }
           </MapView>
           {this.state.destinations ?
             <DestinationsList demonym={this.props.countryData.general.demonym} data={this.state.destinations} />
             :
             null
           }
        </ScrollView>
      </View>
    );
  }
}

// <View style={{alignItems: 'center'}}>
//   <MapView
//     region={this.state.region}
//     onRegionChange={this.onRegionChange}
//     style={styles.map}
//     customMapStyle={nightStyle}
//    >
//      {this.state.markers ?
//        this.state.markers.map((marker, i) => (
//           <MapView.Marker
//             key={i}
//             coordinate={marker.latlng}
//             title={marker.title}
//             description={marker.description + i}
//           />
//         ))
//        :
//        null
//      }
//    </MapView>
//    {this.state.destinations ?
//      <DestinationsList demonym={this.props.countryData.general.demonym} data={this.state.destinations} />
//      :
//      null
//    }
// </View>
