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

const PromoCard = props => {
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
        height: cheight,
        width:cwidth,
        borderRadius:4,
        overflow:'hidden',
      }}
      onPress={() => {
        props?.onPress()
      }}>
      <Image
      resizeMode = 'stretch'
        style={{width:'100%', height:'100%', alignSelf: 'center'}}
        source={{
          uri: props.item.image,
        }}
      />
    </TouchableOpacity>
  );
};

export default PromoCard;
