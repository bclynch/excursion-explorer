import React, { Component } from 'react';
import { AppRegistry, Text, View, Image, TouchableHighlight, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
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
        obj.text = country;
        if(nextProps.cachedCountries[country].flickr.photos.photo.length > 0) {
          const photoData = nextProps.cachedCountries[country].flickr.photos.photo[0];
          obj.src = `https://farm${photoData.farm}.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}_b.jpg`;
        } else {
          obj.src = 'no pic'
        }
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
        obj.text = city;
        if(nextProps.cachedCountries[country].destinations[index].features.photos.length > 0) {
          const photoData = nextProps.cachedCountries[country].destinations[index].features.photos[0];
          obj.src = `https://farm${photoData.farm}.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}_b.jpg`;
        } else {
          obj.src = 'no pic';
        }
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
        <TouchableHighlight activeOpacity={0.1} underlayColor={this.props.colors.primary} onPress={() => {data.type === 'country' ? this.props.selectFavoriteCountry(data.text) : this.props.selectFavoriteCity(data.text, data.country, data.index)}}>
          {
            data.src === 'no pic' ?
              <View style={{height: 200, width: width * .4, backgroundColor: this.props.colors.primary}}>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{data.text}</Text>
                </View>
              </View>
              :
              <Image resizeMode='cover' style={styles.image} source={{uri: data.src}}>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{data.text}</Text>
                </View>
              </Image>
          }
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
                        <Text style={{fontSize: 25, color: this.props.colors.textColor}}>Favorite Countries</Text>
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
                        <Text style={{fontSize: 25, color: this.props.colors.textColor}}>Favorite Cities</Text>
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
              [
                (
                  this.props.stateReady ?
                    <View style={{alignItems:'center', width: width * .85}}>
                      <Text style={{fontSize: 24, color: this.props.colors.textColor, textAlign: 'center', marginVertical: 60}}>Looks like you haven't saved any favorite destinations yet!</Text>
                      <Text style={{fontSize: 18, color: this.props.colors.textColor, textAlign: 'center', marginVertical: 20}}>Save any country or city to your favorites to pin them here</Text>
                      <Icon name="globe" size={80} color={this.props.colors.tertiary} />
                    </View>
                    :
                    <ActivityIndicator
                      style={{height: 125}}
                      size="large"
                      color={this.props.colors.tertiary}
                    />
                )
              ]
            )
          ]
        }
      </View>
    )
  }
}
