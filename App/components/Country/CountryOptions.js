import React, { Component } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableHighlight, Dimensions, Keyboard} from "react-native";
import {Actions} from "react-native-router-flux";
import Icon from 'react-native-vector-icons/FontAwesome';
import GridView from 'react-native-grid-view';

const width = Dimensions.get('window').width;

const styles = {
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {width: 2, height: 2},
    textAlign: 'center'
  },
  optionContainer: {
    flex:1,
    marginTop: 10,
    alignItems: 'center'
  },
  listView: {
    width: width * .85,
    marginBottom: 20
  }
}

export default class CountryOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [{text: 'Fast Facts', icon: 'list', backgroundColor: 'red'}, {text: 'Destinations', icon: 'building-o', backgroundColor: 'green'}, {text: 'Climate +\nGeography', icon: 'sun-o', backgroundColor: 'orange'}, {text: 'Travel Info', icon: 'globe', backgroundColor: 'purple'}, {text: this.favoriteText(), icon: 'star', backgroundColor: '#00ecf4'}]
    }
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.favoriteText = this.favoriteText.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
  }

  favoriteText() {
    return 'Add To Favorites';
    //return this.props.favorites.indexOf(this.props.country.general.name) !== -1 ? 'Remove From Favorites' : 'Add To Favorites';
  }

  renderOptions(data) {
    const self = this;
    return (
      <TouchableHighlight key={data.text} activeOpacity={0} onPress={() => Actions.fastfacts({countryData: this.props.country.general, allCountries: this.props.allCountries, countryRegions: this.props.countryRegions, favorites: this.props.favorites, cachedCountries: this.props.cachedCountries})}>
        <View style={{alignItems: 'center', backgroundColor: data.backgroundColor, height: 200, width: width * .4}}>
          <Icon name={data.icon} style={{marginTop: 45}} size={50} color="#fff" />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{data.text}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  fireClick(option) {
    switch(option) {
      case 'Fast Facts':
        console.log('Fast Facts');
        break;
      case 'Destinations':
        console.log('Destinations');
        break;
      case 'Climate +\nGeography':
        console.log('Climate +\nGeography');
        break;
      case 'Travel Info':
        console.log('Travel Info');
        break;
      case 'Add To Favorites':
        console.log('Add To Favorites');
        break;
      case 'Remove From Favorites':
        console.log('Remove From Favorites');
        break;
    }
  }

  toggleFavorite() {
    console.log('clicked');
    // const self = this;
    // store.get('favorites')
    //   .then((favorites) => {
    //     console.log(favorites);
    //     if(this.state.favorites.indexOf(this.props.selectedCountry.name) === -1) {
    //       //adding to our store + update state
    //       console.log('Adding to favorites');
    //       let newArr = favorites;
    //       newArr.push(this.props.selectedCountry.name);
    //       store.save('favorites', newArr);
    //       self.setState({favorites: newArr});
    //     } else {
    //       let newArr = favorites;
    //       newArr.splice(this.state.favorites.indexOf(this.props.selectedCountry.name), 1);
    //         console.log('Removing from favorites');
    //       store.save('favorites', newArr);
    //       self.setState({favorites: newArr});
    //     }
    //   });
  }

  render(){
    return (
      <View>
        <View style={{alignItems: 'center', marginTop: 15, marginBottom: 15}}>
          <Text style={{fontSize: 25}}>Explore</Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <GridView
            items={this.state.data}
            itemsPerRow={2}
            renderItem={this.renderOptions}
            style={styles.listView}
          />
        </View>
      </View>
    );
  }
}
