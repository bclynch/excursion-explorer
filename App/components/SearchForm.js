import React, { Component } from 'react';
import { AppRegistry, TextInput, View } from 'react-native';
import SuggestedResults from './SuggestedResults.js';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    }

    this.onTextChange = this.onTextChange.bind(this);
  }

  //Setting the state for the search input on each keypress so we can clear it on submit
  onTextChange(e) {
    this.setState({query: e.nativeEvent.text});
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder={this.props.placeholder}
          onChange={this.onTextChange}
          onSubmitEditing={this.props.searchSubmit}
          onBlur={() => this.setState({query: ''})}
          blurOnSubmit={true}
          value={this.state.query}
         />
         { this.props.suggestedResults ? <SuggestedResults /> : null }
       </View>
    )
  }
}
