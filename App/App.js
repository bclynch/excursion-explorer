import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Scene, Reducer, Router, Switch, Modal, Actions, ActionConst, Button } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import store from 'react-native-simple-store';

import Intro from './components/Intro.js';
import Home from './components/Home/Home.js';
import Settings from './components/Settings.js';
import About from './components/About.js';
import Search from './components/Search/Search';
import CountrySplash from './components/Country/CountrySplash.js';
import FilterList from './components/Search/FilterList.js';
import FastFacts from './components/Country/FastFacts.js';
import GeoNav from './components/Country/Geography/GeoNav.js';
import DestinationsSplash from './components/Country/Destinations/DestinationsSplash.js';
import CitySplash from './components/City/CitySplash.js';
import CityNav from './components/City/CityNav.js';
import TravelInfoNav from './components/Country/TravelInfo/TravelInfoNav.js';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    //console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

// define this based on the styles/dimensions you use
const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};

const colorPalette = {
  primary: '#cecece',
  secondary: '#00519e',
  tertiary: '#f2a500',
  textColor: '#595959',
  underlayColor: '#eee'
}

export default class ExcursionExplorer extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <Router
        createReducer={reducerCreate}
        getSceneStyle={getSceneStyle}
        colors={colorPalette}
        panHandlers={null}
      >
        <Scene key="modal" component={Modal} >
          <Scene key="root" hideNavBar hideTabBar>
            <Scene key="intro" component={Intro} title="Intro" />
            <Scene key="home" component={Home} title="Home" initial />
            <Scene key="settings" component={Settings} title="Settings" />
            <Scene key="about" component={About} title="About" />
            <Scene key="search" component={Search} title="Search" />
            <Scene key="filterlist" component={FilterList} title="FilterList" />
            <Scene key="countrysplash" component={CountrySplash} title="CountrySplash" />
            <Scene key="fastfacts" component={FastFacts} title="FastFacts" />
            <Scene key="geonav" component={GeoNav} title="GeoNav" />
            <Scene key="destinationssplash" component={DestinationsSplash} title="DestinationsSplash" />
            <Scene key="citysplash" component={CitySplash} title="CitySplash" />
            <Scene key="citynav" component={CityNav} title="CityNav" />
            <Scene key="travelinfonav" component={TravelInfoNav} title="TravelInfoNav" />
          </Scene>
        </Scene>
      </Router>
    );
  }
}
