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
const {width} = Dimensions.get('window');
import * as Colors from '../constants/ColorDefs';
const cwidth = width - 120
const cheight = cwidth * .47

const SectionBannerCard = props => {
const {item, onPress}  = props
  return (
    <TouchableOpacity
      key={props.imageName}
      style={{
        backgroundColor: Colors.WHITE,
        flexDirection: 'row',
        borderRadius: 4,
        shadowColor: Colors.GRAY,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
        height: cheight,
        width:cwidth,
        overflow:'hidden'
      }}
      onPress={() => {
        props?.onPress()
      }}>
      <Image
      resizeMode = 'stretch'
        style={{width: '100%', height: '100%', alignSelf: 'center'}}
        source={{
          uri: item.image,
        }}
      />
    </TouchableOpacity>
  );
};

export default SectionBannerCard;
