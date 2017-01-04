import React, { Component } from 'react';
import { AppRegistry, Text, View, Image, TouchableHighlight, Dimensions, ScrollView } from 'react-native';
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
  image: {
    height: 200,
    width: width * .4
  },
  favoriteContainer: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center'
  },
  listView: {
    width: width * .85
  }
}

export default class FavoriteLocations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countryData: null,
      cityData: null
    }
    this.renderFavorites = this.renderFavorites.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.favorites.countries.length > 0) {
      let data = [];
      for(var i = 0; i < nextProps.favorites.countries.length; i++) {
        let obj = {};
        const country = nextProps.favorites.countries[i];
        const photoData = nextProps.cachedCountries[country].flickr.photos.photo[0];
        obj.text = country;
        obj.src = `https://farm${photoData.farm}.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}_b.jpg`;
        obj.type = 'country';
        data.push(obj);
      }
      this.setState({countryData: data});
    }
    if(nextProps.favorites.cities.length > 0) {
      let cityData = [];
      for(var i = 0; i < nextProps.favorites.cities.length; i++) {
        let obj = {};
        const country = nextProps.favorites.cities[i].country;
        const city = nextProps.favorites.cities[i].name;
        const index = nextProps.favorites.cities[i].index;
        const photoData = nextProps.cachedCountries[country].destinations[index].features.photos[0];
        obj.text = city;
        obj.src = `https://farm${photoData.farm}.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}_b.jpg`;
        obj.type = 'city';
        obj.country = country;
        obj.index = index;
        cityData.push(obj);
      }
      this.setState({cityData: cityData});
    }
  }

  renderFavorites(data) {
    return (
      <View style={styles.favoriteContainer} key={data.text}>
        <TouchableHighlight activeOpacity={0} onPress={() => {data.type === 'country' ? this.props.selectFavoriteCountry(data.text) : this.props.selectFavoriteCity(data.text, data.country, data.index)}}>
          <Image resizeMode='cover' style={styles.image} source={{uri: data.src}}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{data.text}</Text>
            </View>
          </Image>
        </TouchableHighlight>
      </View>
    );
  }

  //Bit of a cluster fuck with nested ternary below, but logic is sound. Better way to be dynamic?
  render() {
    return (
      <View>
        {this.state.countryData && this.state.cityData ?
          <View>
            <View style={{alignItems: 'center', marginTop: 15, marginBottom: 15}}>
              <Text style={{fontSize: 25}}>Favorite Countries</Text>
            </View>
            <View style={{justifyContent: 'center', marginBottom: 20}}>
              <GridView
                items={this.state.countryData}
                itemsPerRow={2}
                renderItem={this.renderFavorites}
                style={styles.listView}
              />
            </View>
            <View style={{alignItems: 'center', marginTop: 15, marginBottom: 15}}>
              <Text style={{fontSize: 25}}>Favorite Cities</Text>
            </View>
            <View style={{justifyContent: 'center', marginBottom: 20}}>
              <GridView
                items={this.state.cityData}
                itemsPerRow={2}
                renderItem={this.renderFavorites}
                style={styles.listView}
              />
            </View>
          </View>
          :
          [
            ( this.state.countryData || this.state.cityData ?
              [
                (
                  this.state.countryData ?
                    <View key='a'>
                      <View style={{alignItems: 'center', marginTop: 15, marginBottom: 15}}>
                        <Text style={{fontSize: 25}}>Favorite Countries</Text>
                      </View>
                      <View style={{justifyContent: 'center', marginBottom: 20}}>
                        <GridView
                          items={this.state.countryData}
                          itemsPerRow={2}
                          renderItem={this.renderFavorites}
                          style={styles.listView}
                        />
                      </View>
                    </View>
                    :
                    <View key='b'>
                      <View style={{alignItems: 'center', marginTop: 15, marginBottom: 15}}>
                        <Text style={{fontSize: 25}}>Favorite Cities</Text>
                      </View>
                      <View style={{justifyContent: 'center', marginBottom: 20}}>
                        <GridView
                          items={this.state.cityData}
                          itemsPerRow={2}
                          renderItem={this.renderFavorites}
                          style={styles.listView}
                        />
                      </View>
                    </View>
                )
              ]
              :
              <View key='c'><Text>None</Text></View>
            )
          ]
        }
      </View>
    )
  }
}
