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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const green_placeholder = require('../../assets/green_placeholder.png');
const {width} = Dimensions.get('window');
let kotak =  require('../../assets/kotak.png')
import * as Colors from '../constants/ColorDefs'
const AvailableOfferCard = props => {
  const {logo,description} = props.item
  return (
    <View
      key={props.item.itemName}
      onPress={() => {
      }}
      style={{
        backgroundColor: Colors.WHITE,
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 0,
        paddingVertical: 8,
        alignItems:'center',
      }}>
      <Image
        resizeMode="contain"
        style={{
          width: 38,
          height: 38,
          alignSelf: 'center',
        }}
        source={logo.length > 0 ? {uri: logo} :{green_placeholder}}
      />
      <Text style={{flex: 1, marginLeft: 15, fontSize: 12, color: Colors.CLR_16253B}}>
        {description}
      </Text>
    </View>
  );
};

export default AvailableOfferCard;
