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

const BannerCard = props => {
  return (
    <TouchableOpacity
      key={props.item.itemName}
      style={{
        backgroundColor: Colors.WHITE,
        flexDirection: 'row',
        shadowColor: Colors.GRAY,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
        height: props.height,
        marginRight:10,
        borderRadius:4,
        overflow:'hidden',
      }}
      onPress={() => {
        props.onPress && props.onPress()
      }}>
      <Image
        style={{width:'100%', height:'100%', alignSelf: 'center'}}
        resizeMode = 'stretch'
        source={{
          uri: props.item.mobile_image,
        }}
      />
    </TouchableOpacity>
  );
};
export default BannerCard;
