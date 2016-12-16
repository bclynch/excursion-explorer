import React, { Component } from 'react';
import {View, Text, StyleSheet, Button} from "react-native";
import {Actions} from "react-native-router-flux";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: 'red',
  }
});

//Might be nice to have starred countries near the top with a card/photo View
//Maybe a few sections below for featured places or just features in general
//Search option up top with logo
//Search should oppen to country splash page picture up top and subsequent options below
//options below take to tabbed pages -- look at google trips need to know ui

export default class Home extends Component {
  render() {
    return (
      <View {...this.props}  style={styles.container}>
        <Text>Home page</Text>
        <Button onPress={Actions.tabbar} title='Go to country splash' />
        <Button onPress={Actions.search} title='Search' />
      </View>
    );
  }
}
