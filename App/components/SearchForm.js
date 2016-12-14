import React, { Component } from 'react';
import { AppRegistry, TextInput, View } from 'react-native';
import SuggestedResults from './SuggestedResults.js';
import Button from './Button.js';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  onSubmit(e) {
    console.log(e);
    //Need to submit
    //Blur the textinput and proceed with API call
    //API calls should be made in the index so we can pass down the data
    //Methods will need to be passed down from there
    //Will hide suggested results as well
  }

  render() {
    const styles = {
      btnStyle: {
        backgroundColor: 'red'
      },
      btnTextStyle: {
        color: 'white'
      }
    }
    return (
      <View>
        <TextInput
          placeholder={this.props.placeholder}
         />
         { this.props.suggestedResults ? <SuggestedResults /> : null }
         <Button
          text='Search'
          btnStyle={styles.btnStyle}
          btnTextStyle={styles.btnTextStyle}
          onPress = {this.onSubmit}
         />
       </View>
    )
  }
}
