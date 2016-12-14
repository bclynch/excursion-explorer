import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import Home from './App/components/Home.js';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view'

class ExcursionExplorer extends Component {
  render() {
    return (
      <ScrollableTabView
         style={{marginTop: 20, }}
         renderTabBar={() => <DefaultTabBar />}
       >
         <View style={{height: 300}} tabLabel='Tab #1'>
           <View style={{flex: 1, backgroundColor: 'powderblue'}} />
           <View style={{flex: 2, backgroundColor: 'skyblue'}} />
           <View style={{flex: 1, backgroundColor: 'steelblue'}} />
         </View>
         <Home tabLabel='Tab #2' title='Bitch' />
         <Text tabLabel='Tab #3'>project</Text>
       </ScrollableTabView>
    );
  }
}

AppRegistry.registerComponent('ExcursionExplorer', () => ExcursionExplorer);
