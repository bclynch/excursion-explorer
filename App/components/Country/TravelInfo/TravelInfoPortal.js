import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView, ListView} from "react-native";
import {Actions} from "react-native-router-flux";
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = {

};

const width = Dimensions.get('window').width;

export default class TravelInfoPortal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: this.props.data
    }
    this.renderHeader = this.renderHeader.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  renderHeader(section) {
      return (
        <View style={{height: 100, width: width * .85, borderColor: this.props.colors.primary, borderWidth: 5, alignItems:'center', justifyContent: 'center', marginTop: 15}}>
          <Text style={{color: this.props.colors.primary, fontSize: 25, fontWeight: 'bold'}}>{section.header}</Text>
          <Icon name={section.icon} size={40} color={this.props.colors.primary} />
        </View>
      );
  }

  renderContent(section) {
      const self = this;
      return (
        <View style={{width: width * .85, borderColor: self.props.colors.primary, borderBottomWidth: 5, borderLeftWidth: 5, borderRightWidth: 5, padding: 8}}>
          {section.content.map(function(item, i) {
            return (
              <Text key={i} style={{marginBottom: 8, color: self.props.colors.textColor}}>{item}</Text>
            )
          })}
        </View>
      );
  }

  render() {
    return (
      <View style={{alignItems: 'center'}}>
        {this.props.data[0].content ?
          <ScrollView contentContainerStyle={{alignItems: 'center'}}>
            <Accordion
              sections={this.state.dataSource}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
              duration={700}
              activeOpacity={0.1}
              underlayColor={this.props.colors.underlayColor}
            />
          </ScrollView>
          :
          <Text>Nein</Text>
        }
      </View>
    );
  }
}
