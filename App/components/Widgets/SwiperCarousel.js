import React, { Component } from 'react';
import { AppRegistry, Text, View, Dimensions, Image } from 'react-native';
import {Actions} from "react-native-router-flux";
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window');

const styles = {
  wrapper: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  slide1: {
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
  subtext: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {width: 2, height: 2}
  },
  image: {
    width,
    flex: 1
  }
}

export default class SwiperCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderSwiper: this.props.slides
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({renderSwiper: nextProps.slides})
  }

  renderSlides(slides) {
    return slides.map(function(slide, i){
      return(
        <View key={i} style={styles.slide}>
          <Image resizeMode='stretch' style={styles.image} source={{uri: slide.src}}>
            <View style={styles.slide1}>
              <Text style={styles.text}>{slide.country}</Text>
              <Text style={styles.subtext}>{slide.subregion}</Text>
            </View>
          </Image>
        </View>
      );
    });
  }

  render() {
    return (
      <View>
        {this.state.renderSwiper ?
        <Swiper style={styles.wrapper} height={this.props.height} horizontal={this.props.horizontal} autoPlayTimeout={this.props.autoplaySpeed} autoplay>
          {this.renderSlides(this.state.renderSwiper)}
        </Swiper> : <Text>Nada</Text> }
      </View>
    )
  }
}
