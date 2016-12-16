// import React, { Component } from 'react';
// import { AppRegistry, Text, View, Alert, StyleSheet } from 'react-native';
// import store from 'react-native-simple-store';
// import Home from './App/components/Home.js';
// import Facts from './App/components/Facts.js';
// // import Map from './App/components/Map.js';
// import ControlPanel from './App/components/ControlPanel.js';
// import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
// import Drawer from 'react-native-drawer';
// import ActionButton from 'react-native-action-button';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {Scene, Router} from 'react-native-router-flux';
//
// import API from './App/api.js';
// import Keys from './API_KEYS.js';
//
// import styles from './App/styles.js';
// const drawerStyles = {
//   drawer: {
//     shadowColor: "#000000",
//     shadowOpacity: 0.8,
//     shadowRadius: 0,
//   }
// }
//
// const deviceScreen = require('Dimensions').get('window')
//
// export class ExcursionExplorer extends Component {
//
// constructor(props, context) {
//   super(props, context);
//   this.state = {
//     selectedCountry: {name: 'Default Crap'},
//     allCountries: '',
//     regionData: ''
//   };
//
//   this.searchCountry = this.searchCountry.bind(this);
// }
//
// componentDidMount() {
//   const self = this;
//
//   //Checking local storage for existing data, if any
//   store.get('allCountries')
//     .then((countries) => {
//       //Check our store to see if user has all countries cached
//       //if so then set our allCountries state equal to the array
//       if(countries) {
//         console.log('Grabbing all countries from cache');
//         self.setState({allCountries: countries});
//         //snagging cached regions information
//         store.get('countryRegions')
//           .then((regions) => {
//             self.setState({countryRegions: regions});
//             console.log(regions);
//             console.log(countries)
//           });
//       } else {
//         API.grabAllCountries().then((data) => {
//           const countryData = self.chopUpData(data);
//           self.setState({allCountries: countryData.allCountries});
//           store.save('allCountries', countryData.allCountries);
//           console.log('Saving allCountries to storage');
//           self.setState({regionData: countryData.regions});
//           //saving our chopped data as well to avoid the loop parsing on every refresh
//           store.save('countryRegions', countryData.regions);
//         });
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }
//
// chopUpData(data) {
//   let countryObj = {};
//   let regionArchitecture = {};
//   for(var k = 0; k < data.length; k++) {
//
//     countryObj[data[k]['name']] = data[k];
//
//     //check if the region exists in our obj
//     if(regionArchitecture[data[k].region]) {
//         //if so we check to see if subregion is there
//         if(regionArchitecture[data[k].region][data[k].subregion]) {
//             //if so we add our country to it
//             regionArchitecture[data[k].region][data[k].subregion].push(data[k].name);
//         } else {
//             //otherwise we create the subregion and then add our name to it
//             regionArchitecture[data[k].region][data[k].subregion] = [data[k].name]
//         }
//     } else {
//         //if not then create it
//         regionArchitecture[data[k].region] = {};
//         //and add our subregion + country name
//         regionArchitecture[data[k].region][data[k].subregion] = [data[k].name]
//     }
//   }
//   return {allCountries: countryObj, regions: regionArchitecture};
// }
//
//   // snagData(countryCode, name) {
//   //       const self = this;
//   //
//   //       let dataObj = {};
//   //
//   //       store.get('countries')
//   //         .then((countries) => {
//   //           if(countries[name]) {
//   //             //if the data is over 24 hours old refresh it
//   //             //logic: Current time - lastUpdated time > 24 hours then grab new data
//   //             if(countries[name][lastUpdated] > ) {
//   //               console.log('Data too old, grabbing fresh data');
//   //               API.fetchTheGoods(countryCode, name);
//   //             } else {
//   //               //Use the data we already have
//   //               console.log('Grabbing existing data');
//   //               self.setState({selectedCountryData: countries[name]});
//   //               console.log(JSON.parse(sessionStorage.getItem(countryCode)));
//   //             }
//   //           } else {
//   //             //Doesn't exist so grab data
//   //             API.fetchTheGoods(countryCode, name);
//   //           }
//   //         }
//   //       }
//   //   }
//
//   parallaxAnimation(ratio) {
//     const r1 = 1;
//     const t = [
//                r1,  0,  0,  0,
//                0, r1,  0,  0,
//                0,   0,   1,  0,
//                0,   0,   0,  1,
//             ];
//     return {
//       main: {
//         left:deviceScreen.width*ratio/2,
//         transformMatrix: t,
//         opacity: 1-ratio*.3
//       }
//     }
//   }
//
//   //passing down method to search form so we can track selected country here + deal with drawer
//   searchCountry(e) {
//     //////////////////////////////////////////////////
//     //will need to validate it's a real country...
//     /////////////////////////////////////////////////
//
//     //title casing the query so it will match our object
//     const selectedCountry = e.nativeEvent.text.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
//
//     if(this.state.allCountries[selectedCountry]) {
//       this.setState({selectedCountry: this.state.allCountries[selectedCountry]});
//       this.drawer.close();
//     } else {
//       Alert.alert(
//         'That\s not a country!',
//         'Try Again dumbass',
//         [
//           {text: 'OK', onPress: () => console.log('OK Pressed')},
//         ]
//       )
//     }
//
//
//     console.log(this.state.allCountries[selectedCountry]);
//
//     //Perform API call if necessary
//     // store.get('countries')
//     //   .then((countries) => {
//     //     if(countries[selectedCountry]) {
//     //       //if the data is over 24 hours old refresh it
//     //       //logic: Current time - lastUpdated time > 24 hours then grab new data
//     //       if(countries[selectedCountry][lastUpdated] > 1) {
//     //         console.log('Data too old, grabbing fresh data');
//     //         API.all('AGO', selectedCountry, Keys.flickr.key).then((data) => {
//     //           console.log(data);
//     //         });
//     //       } else {
//     //         //Use the data we already have
//     //         console.log('Grabbing existing data');
//     //         self.setState({selectedCountryData: countries[selectedCountry]});
//     //         console.log(JSON.parse(sessionStorage.getItem(countryCode)));
//     //       }
//     //     } else {
//     //       //Doesn't exist so grab data
//     //       API.all('AGO', selectedCountry, Keys.flickr.key).then((data) => {
//     //         console.log(data);
//     //       });
//     //     }
//     //   }
//   }
//
//   render() {
//     const controlPanel = <ControlPanel searchSubmit={this.searchCountry} />
//     return (
//       render() {
//         return <Router>
//           <Scene key="root">
//             <Scene key="login" component={Login} title="Login"/>
//             <Scene key="register" component={Register} title="Register"/>
//             <Scene key="home" component={Home}/>
//           </Scene>
//         </Router>
//       <Drawer
//         ref={c => this.drawer = c}
//         type='overlay'
//         openDrawerOffset={.2}
//         panOpenMask={.18}
//         panCloseMask={.8}
//         panThreshold={.25}
//         content={controlPanel}
//         styles={drawerStyles}
//         tweenHandler= {this.parallaxAnimation}
//         tweenDuration={350}
//         tweenEasing='linear'
//         side='left'
//         captureGestures={false}
//         >
//         <ScrollableTabView
//           renderTabBar={() => <DefaultTabBar />}
//         >
//           <Facts tabLabel='Facts' selectedCountry={this.state.selectedCountry.name} />
//           <Home tabLabel='Geography' title='Bitch' />
//           <Text tabLabel='Derp'>project</Text>
//         </ScrollableTabView>
//       </Drawer>
//     );
//   }
// }
//
// //   render() {
// //     const controlPanel = <ControlPanel searchSubmit={this.searchCountry} />
// //     return (
// //       <Drawer
// //         ref={c => this.drawer = c}
// //         type='overlay'
// //         openDrawerOffset={.2}
// //         panOpenMask={.18}
// //         panCloseMask={.8}
// //         panThreshold={.25}
// //         content={controlPanel}
// //         styles={drawerStyles}
// //         tweenHandler= {this.parallaxAnimation}
// //         tweenDuration={350}
// //         tweenEasing='linear'
// //         side='left'
// //         captureGestures={false}
// //         >
// //         <ScrollableTabView
// //           renderTabBar={() => <DefaultTabBar />}
// //         >
// //           <Facts tabLabel='Facts' selectedCountry={this.state.selectedCountry.name} />
// //           <Home tabLabel='Geography' title='Bitch' />
// //           <Text tabLabel='Derp'>project</Text>
// //         </ScrollableTabView>
// //         <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => Alert.alert('Search','Search some shit', [{text: 'OK', onPress: () => console.log('OK Pressed')}])} />
// //       </Drawer>
// //     );
// //   }
// // }

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Scene, Reducer, Router, Switch, Modal, Actions, ActionConst, Button } from 'react-native-router-flux';
import Home from './components/Home';
import Search from './components/Search';
import CountrySplash from './components/CountrySplash.js';
import Error from './components/Error';
import TabView from './components/TabView';
import TabIcon from './components/TabIcon';
import NavigationDrawer from './components/NavigationDrawer';

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
    console.log('ACTION:', action);
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

export default class ExcursionExplorer extends Component {
  render() {
    return (
      <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
        <Scene key="modal" component={Modal} >
          <Scene key="root" hideNavBar hideTabBar>
            <Scene key="home" component={Home} title="Home" initial />
            <Scene key="search" component={Search} title="Search" />
            <Scene key="countrysplash" component={CountrySplash} title="CountrySplash" />
            <Scene key="tabbar" component={NavigationDrawer}>
              <Scene
                key="main"
                tabs
                tabBarStyle={styles.tabBarStyle}
                tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
              >
                <Scene
                  key="tab1"
                  title="Tab #1"
                  icon={TabIcon}
                  navigationBarStyle={{ backgroundColor: 'red' }}
                  titleStyle={{ color: 'white' }}
                >
                  <Scene
                    key="tab1_1"
                    component={TabView}
                    title="Tab #1_1"
                    onRight={() => alert('Right button')}
                    rightTitle="Right"
                  />
                </Scene>
                <Scene key="tab2" initial title="Tab #2" icon={TabIcon}>
                  <Scene
                    key="tab2_1"
                    component={TabView}
                    title="Tab #2_1"
                    renderRightButton={() => <Text>Right</Text>}
                  />
                </Scene>
                <Scene key="tab3" component={TabView} title="Tab #3" hideTabBar icon={TabIcon} />
                <Scene key="tab4" component={TabView} title="Tab #4" hideNavBar icon={TabIcon} />
                <Scene key="tab5" component={TabView} title="Tab #5" hideTabBar icon={TabIcon} />
              </Scene>
            </Scene>
          </Scene>
          <Scene key="error" component={Error} />
        </Scene>
      </Router>
    );
  }
}
