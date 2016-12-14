import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import Home from './App/components/Home.js';
import ControlPanel from './App/components/ControlPanel.js';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import Drawer from 'react-native-drawer';

import tweens from './App/tweens.js';

import styles from './App/styles.js';
const drawerStyles = {
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 0,
  }
}

export class ExcursionExplorer extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      drawerType: 'overlay',
      openDrawerOffset:100,
      closedDrawerOffset:0,
      panOpenMask: .18,
      panCloseMask: .8,
      relativeDrag: false,
      panThreshold: .25,
      tweenHandlerOn: false,
      tweenDuration: 350,
      tweenEasing: 'linear',
      disabled: false,
      tweenHandlerPreset: 'parallax',
      acceptDoubleTap: false,
      acceptTap: false,
      acceptPan: true,
      tapToClose: true,
      negotiatePan: false,
      rightSide: false,
    };
  }

  setDrawerType(type){
    this.setState({
      drawerType: type
    })
  }

  tweenHandler(ratio){
    if(!this.state.tweenHandlerPreset){ return {} }
    return tweens[this.state.tweenHandlerPreset](ratio)
  }

  noopChange(){
    this.setState({
      changeVal: Math.random()
    })
  }

  openDrawer(){
    this.drawer.open()
  }

  setStateFrag(frag) {
    this.setState(frag);
  }

  render() {
    var controlPanel = <ControlPanel />
    return (
      <Drawer
        ref={c => this.drawer = c}
        type={this.state.drawerType}
        animation={this.state.animation}
        openDrawerOffset={this.state.openDrawerOffset}
        closedDrawerOffset={this.state.closedDrawerOffset}
        panOpenMask={this.state.panOpenMask}
        panCloseMask={this.state.panCloseMask}
        relativeDrag={this.state.relativeDrag}
        panThreshold={this.state.panThreshold}
        content={controlPanel}
        styles={drawerStyles}
        disabled={this.state.disabled}
        tweenHandler={this.tweenHandler.bind(this)}
        tweenDuration={this.state.tweenDuration}
        tweenEasing={this.state.tweenEasing}
        acceptDoubleTap={this.state.acceptDoubleTap}
        acceptTap={this.state.acceptTap}
        acceptPan={this.state.acceptPan}
        tapToClose={this.state.tapToClose}
        negotiatePan={this.state.negotiatePan}
        changeVal={this.state.changeVal}
        side={this.state.rightSide ? 'right' : 'left'}
        >
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
      </Drawer>
    );
  }
}

AppRegistry.registerComponent('ExcursionExplorer', () => ExcursionExplorer);
