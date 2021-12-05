import React from 'react';
import {
  Platform,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
const { width } = Dimensions.get('window');
import * as Colors from '../constants/ColorDefs';
const share = require('../../assets/share.png');

const PDImageBannerCard = props => {
  const { image_url } = props.item
  const {isOutOfStock} = props
  return (
    <TouchableOpacity
      onPress={() => {
        props.onClick && props.onClick()
      }}
      key={props.item.itemName}
      style={{
        flexDirection: 'row',
        height: props.height || 150,
        width: props.width,
      }}>
      <Image
        resizeMode='contain'
        style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 8, opacity:isOutOfStock? .3:1 }}
        source={{
          uri: image_url
        }}
      />
      {/* <TouchableOpacity 
      onPress={() => {
        props.onShareClicked && props.onShareClicked()
      }}
        style={{ position: 'absolute', right: -40, top: 30, backgroundColor: Colors.GRAY, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          resizeMode='contain'
          style={{ width: 25, height: 25 }}
          source={share}
        />
      </TouchableOpacity> */}

    </TouchableOpacity>
  );
};

export default PDImageBannerCard;
