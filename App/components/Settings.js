import React, { Component } from 'react';
import {View, Text, Dimensions, TouchableHighlight, Image, ScrollView, Alert} from "react-native";
import {Actions} from "react-native-router-flux";
import Icon from 'react-native-vector-icons/FontAwesome';
import store from 'react-native-simple-store';

const width = Dimensions.get('window').width;

const styles = {
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * .85,
    borderBottomWidth: 2,
    borderBottomColor: "#cecece",
    height: 80
  }
}

export default class Settings extends Component {
  constructor(props) {
    super(props);

    const self = this;

    this.state = {
      unitDescription: props.settings.units.charAt(0).toUpperCase() + props.settings.units.slice(1), //current choice
      tempDescription: props.settings.temp, //current choice
      settings: this.props.settings,
      data: [
        {
          header: 'Data Cache',
          items: [
            {
              title: 'Clear Cache',
              descr: 'Remove all cached country information',
              press: function() {Alert.alert(
                                  'Confirm',
                                  'Your cached destination information will be removed and offline capabilities will be reduced',
                                  [
                                    {text: 'Cancel'},
                                    {text: 'OK', onPress: () => store.delete('allCountries')},
                                  ]
                                )}
            }
          ]
        },
        {
          header: 'Unit Settings',
          items: [
            {
              title: 'Units',
              press: function() {Alert.alert(
                                  'Units',
                                  'Select the type of units for the application to display',
                                  [
                                    {text: 'Cancel'},
                                    {text: 'Imperial', onPress: () => {
                                      let settings = self.state.settings;
                                      settings.units = 'imperial';
                                      self.setState({unitDescription: 'Imperial', settings: settings});
                                      store.save('appSettings', settings);
                                    }},
                                    {text: 'Metric', onPress: () => {
                                      let settings = self.state.settings;
                                      settings.units = 'metric';
                                      self.setState({unitDescription: 'Metric', settings: settings});
                                      store.save('appSettings', settings);
                                    }}
                                  ]
                                )}
            },
            {
              title: 'Temperature Units',
              press: function() {Alert.alert(
                                  'Temperature Units',
                                  'Select the type of temperature units for the application to display',
                                  [
                                    {text: 'Cancel'},
                                    {text: 'Fahrenheit', onPress: () => {
                                      let settings = self.state.settings;
                                      settings.temp = 'F';
                                      self.setState({tempDescription: 'F', settings: settings});
                                      store.save('appSettings', settings);
                                    }},
                                    {text: 'Celsius', onPress: () => {self.setState({tempDescription: 'C'})
                                      let settings = self.state.settings;
                                      settings.temp = 'C';
                                      self.setState({tempDescription: 'C', settings: settings});
                                      store.save('appSettings', settings);
                                    }},
                                  ]
                                )}
            }
          ]
        },
        {
          header: 'About',
          items: [
            {
              title: 'Product Tour',
              press: function() {Actions.intro()}
            },
            {
              title: 'About This App',
              descr: 'Change log + about the developer'
            }
          ]
        },
        {
          header: 'Misc.',
          items: [
            {
              title: 'Rate Application',
              descr: 'Let us know what you think on the Play Store'//Chooses to say android or apple based on OS
            }
          ]
        }
      ]
    }
    this.renderOptions = this.renderOptions.bind(this);
  }

  renderOptions() {
    const self = this;
    return self.state.data.map(function(item, i) {
      return (
        <View key={i}>
          <View style={{marginTop: 12, marginBottom: 15}}>
            <Text style={{fontSize: 17, color: self.props.colors.tertiary, fontWeight: 'bold'}}>{item.header}</Text>
          </View>
          {item.items.map(function(subitem) {
            return (
              <TouchableHighlight key={subitem.title} activeOpacity={0.1} underlayColor={self.props.colors.primary} onPress={() => subitem.press()}>
                <View>
                  <View>
                    <Text style={{fontSize: 20, color: self.props.colors.textColor}}>{subitem.title}</Text>
                  </View>
                  <View style={{marginBottom: 18}}>
                    {
                      subitem.title === 'Units' || subitem.title === 'Temperature Units' ?
                        [
                          (
                            subitem.title === 'Units' ?
                              <Text key={self.state.unitDescription} style={{fontSize: 16, color: self.props.colors.primary}}>{self.state.unitDescription}</Text>
                              :
                              <Text key={self.state.tempDescription} style={{fontSize: 16, color: self.props.colors.primary}}>{self.state.tempDescription}</Text>
                          )
                        ]
                        :
                        <Text style={{fontSize: 16, color: self.props.colors.primary}}>{subitem.descr}</Text>
                    }
                  </View>
                </View>
              </TouchableHighlight>
            );
          })}
        </View>
      );
    });
  }

  render(){
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={styles.nav}>
          <TouchableHighlight onPress={() => Actions.home({type: 'reset'})} title='Back' activeOpacity={0.1} underlayColor={this.props.colors.primary}>
            <Icon name="arrow-left" size={30} color={this.props.colors.primary} />
          </TouchableHighlight>
          <Text style={{fontSize: 30, color: this.props.colors.textColor}}>Settings</Text>
          <View />
        </View>
        <ScrollView {...this.props}>
          <View style={{width: width * .85}}>
            {this.renderOptions()}
          </View>
        </ScrollView>
      </View>
    );
  }
}
