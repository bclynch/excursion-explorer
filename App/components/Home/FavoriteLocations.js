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
    flex:1,
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
      data: null
    }
    this.renderFavorites = this.renderFavorites.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.favorites.length > 0) {
      let data = [];
      for(var i = 0; i < nextProps.favorites.length; i++) {
          let obj = {};
          const country = nextProps.favorites[i];
          const photoData = nextProps.cachedCountries[country].flickr.photos.photo[0];
          obj.text = country;
          obj.src = `https://farm${photoData.farm}.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}_b.jpg`;
          data.push(obj);
      }
      this.setState({data: data});
    }
  }

  renderFavorites(data) {
    return (
      <View style={styles.favoriteContainer} key={data.text}>
        <TouchableHighlight activeOpacity={0} onPress={() => this.props.selectFavorite(data.text)}>
          <Image resizeMode='cover' style={styles.image} source={{uri: data.src}}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{data.text}</Text>
            </View>
          </Image>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    if (this.state.data === null) {
      return null;
    }
    return (
      <View>
        <View style={{alignItems: 'center', marginTop: 15, marginBottom: 15}}>
          <Text style={{fontSize: 25}}>Favorite Places</Text>
        </View>
        <View style={{justifyContent: 'center', marginBottom: 20}}>
          <GridView
            items={this.state.data}
            itemsPerRow={2}
            renderItem={this.renderFavorites}
            style={styles.listView}
          />
        </View>
      </View>
    )

  }
}
