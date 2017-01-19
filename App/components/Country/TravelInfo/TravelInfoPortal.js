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

    console.log(props);

    this.state = {
      dataSource: this.props.data
    }
    this.renderHeader = this.renderHeader.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  renderHeader(section, i) {
      return (
        <View style={{height: 80, width: width * .9, flexDirection: 'row', borderBottomWidth: 1, borderColor: this.props.colors.primary, alignItems:'center', justifyContent: 'space-between'}}>
          <Text style={{color: this.props.colors.textColor, fontSize: 18, fontWeight: 'bold'}}>{section.header}</Text>
          <Icon name={this.state.activeSection === i ? 'chevron-up' : 'chevron-down'} size={18} color={this.state.activeSection === i ? this.props.colors.tertiary : this.props.colors.primary} />
        </View>
      );
  }

  renderContent(section) {
      const self = this;
      return (
        <View style={{width: width * .9, marginTop: 10}}>
          {section.content.map(function(item, i) {
            return (
              <Text key={i} style={{marginBottom: 8, color: self.props.colors.textColor}}>{item}</Text>
            )
          })}
        </View>
      );
  }

  setSection(section) {
   this.setState({ activeSection: section });
 }

  render() {
    return (
      <View style={{alignItems: 'center'}}>
        {this.props.data[0].content ?
          <ScrollView contentContainerStyle={{alignItems: 'center'}}>
            <Accordion
              activeSection={this.state.activeSection}
              sections={this.state.dataSource}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
              duration={500}
              activeOpacity={0.1}
              underlayColor={this.props.colors.underlayColor}
              onChange={this.setSection.bind(this)}
            />
          <View style={{alignSelf: 'flex-end', marginTop: 30}}>
              <Text style={{color: this.props.textColor}}>{this.props.lastUpdated}</Text>
            </View>
          </ScrollView>
          :
          <View style={{alignItems:'center', width: width * .85}}>
            <Text style={{fontSize: 24, color: this.props.colors.textColor, textAlign: 'center', marginVertical: 80}}>Sorry, no {this.props.tabLabel.toLowerCase()} information available at this time</Text>
            <Icon name="chain-broken" size={80} color={this.props.colors.tertiary} />
          </View>
        }
      </View>
    );
  }
}
