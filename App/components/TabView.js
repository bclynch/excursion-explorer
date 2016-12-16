import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View, Button} from "react-native";
import { Actions } from 'react-native-router-flux';

const contextTypes = {
  drawer: React.PropTypes.object,
};

const propTypes = {
  name: PropTypes.string,
  sceneStyle: View.propTypes.style,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth: 2,
    borderColor: 'red',
  },
});

const TabView = (props, context) => {
  const drawer = context.drawer;
  return (
    <View style={[styles.container, props.sceneStyle ]}>
      <Text>Tab {props.title}</Text>
      <Button onPress={Actions.pop} title='Back' />
      <Button onPress={() => { drawer.close(); Actions.tab1(); }} title='Switch to tab1' />
      <Button onPress={() => { drawer.close(); Actions.tab2(); }} title='Switch to tab2' />
      <Button onPress={() => { drawer.close(); Actions.tab3(); }} title='Switch to tab3' />
      <Button onPress={() => { drawer.close(); Actions.tab4(); }} title='Switch to tab4' />
      <Button onPress={() => { drawer.close(); Actions.tab5(); }} title='Switch to tab5' />
    </View>
  );
};

TabView.contextTypes = contextTypes;
TabView.propTypes = propTypes;

export default TabView;
