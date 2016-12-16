import React, { PropTypes } from 'react';
import Drawer from 'react-native-drawer';
import { DefaultRenderer, Actions } from 'react-native-router-flux';

import TabView from './TabView';
import ControlPanel from './ControlPanel.js';

const propTypes = {
  navigationState: PropTypes.object,
};

const drawerStyles = {
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 0,
  }
}

const deviceScreen = require('Dimensions').get('window')

class NavigationDrawer extends React.Component {

  parallaxAnimation(ratio) {
    const r1 = 1;
    const t = [
               r1,  0,  0,  0,
               0, r1,  0,  0,
               0,   0,   1,  0,
               0,   0,   0,  1,
            ];
    return {
      main: {
        left:deviceScreen.width*ratio/2,
        transformMatrix: t,
        opacity: 1-ratio*.3
      }
    }
  }

  render() {
    const state = this.props.navigationState;
    const children = state.children;
    return (
      <Drawer
        ref={c => this.drawer = c}
        type='overlay'
        openDrawerOffset={.2}
        panOpenMask={.18}
        panCloseMask={.8}
        panThreshold={.25}
        styles={drawerStyles}
        tweenHandler= {this.parallaxAnimation}
        tweenDuration={350}
        tweenEasing='linear'
        side='left'
        captureGestures={false}
        onOpen={() => Actions.refresh({ key: state.key, open: true })}
        onClose={() => Actions.refresh({ key: state.key, open: false })}
        content={<ControlPanel />}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}

NavigationDrawer.propTypes = propTypes;

export default NavigationDrawer;
