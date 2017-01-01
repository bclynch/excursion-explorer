import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions} from "react-native";
import {Actions} from "react-native-router-flux";
import MapView from 'react-native-maps';

import nightStyle from '../../../../assets/mapNight.json';
import desertStyle from '../../../../assets/mapDesert.json';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: width,
    height: 400
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

//Popular attractions by category listed here: https://developer.here.com/rest-apis/documentation/places/topics/categories.html
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

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: this.props.position[0],
        longitude: this.props.position[1],
        latitudeDelta: 6,
        longitudeDelta: 6,
      }
    }
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <MapView
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          style={styles.map}
          mapType='terrain'
         />
      </View>
    );
  }
}
