import React, { Component } from 'react';
import { AppRegistry, Text, View, ListView, TouchableHighlight, Dimensions, Image } from 'react-native';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const width = Dimensions.get('window').width;

const styles = {
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {width: 2, height: 2}
  },
  image: {
    width: width*.85,
    flex: 1,
    height: 125
  },
  filterOption: {
    marginTop: 15
  }
}

export default class FilterRegion extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  renderRow(data) {
    //Would be nice to have a banner type look for each of the regions
    //Could have accordian look with the rest of the subregions/countries displayed on click
    return (
      <TouchableHighlight activeOpacity={0} style={styles.filterOption}>
        <Image resizeMode='stretch' style={styles.image} source={data.src}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{data.text}</Text>
          </View>
        </Image>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={{flexDirection: 'row', marginTop: 20, width: width*.85, alignSelf: 'center', justifyContent: 'flex-start'}}>
          <Text>Filter By Region</Text>
        </View>
        <ListView style={{marginTop: 10, marginBottom: 100}}
          dataSource={ds.cloneWithRows([{src: require('../img/africa.jpg'), text: 'Africa'}, {src: require('../img/americas.jpeg'), text: 'Americas'}, {src:require('../img/asia.jpg'), text: 'Asia'}, {src: require('../img/europe.jpg'), text: 'Europe'}, {src: require('../img/oceania.jpg'), text: 'Oceania'}, {src: require('../img/polar.jpg'), text: 'Polar'}])}
          renderRow={this.renderRow}
        />
      </View>
    )
  }
}
