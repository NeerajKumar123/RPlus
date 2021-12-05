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
import PlusMinusButtons from '../components/PlusMinusButtons'
import {PLUS_MINUS_BUTTON_TYPE} from '../constants/StaticValues'
const ananda_ghee = require('../../assets/ananda_ghee.png');
const deals_discount = require('../../assets/deals_discount.png');
const plus = require('../../assets/plus.png');

const ComboOffersCard = props => {
  const {image,name,selling_price,mrp,deals_price} = props.item
  let off = ((mrp - selling_price) / mrp) * 100;
  off = off.toFixed(0);
  off = `${off} % OFF`;
  return (
    <View
      key={props.item.itemName}
      style={{
        backgroundColor: Colors.WHITE,
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        borderRadius: 4,
        paddingHorizontal: 17,
        paddingVertical: 15,
        shadowColor: Colors.GRAY,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
      }}>
      <Image style={{width: 40, height: 70}} source={{uri: image}} />
      <View
        style={{
          flex: 5,
          justifyContent: 'center',
          marginHorizontal: 10,
          marginLeft:20,
        }}>
        <Text>{name}</Text>
        <View style={{flexDirection: 'row', marginTop: 6}}>
          <Text style={{fontWeight: 'bold'}}>{`Rs. ${selling_price}`}</Text>
          <Text
            style={{
              textDecorationLine: 'line-through',
              textDecorationStyle: 'solid',
              marginHorizontal: 10,
              color:Colors.GRAY
            }}>
            {`Rs. ${mrp}`}
          </Text>
          <Text
            style={{
              borderRadius: 4,
              borderWidth: 1,
              borderColor: Colors.GREEN,
              paddingHorizontal: 5,
              fontWeight: 'bold',
              fontSize: 12,
              color: Colors.GREEN,
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>
            {off}
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text
            style={{
              borderRadius: 4,
              borderWidth: 1,
              borderColor: Colors.ORANGE,
              fontWeight: 'bold',
              fontSize: 12,
              color:Colors.ORANGE,
              textAlign: 'center',
              borderStyle: 'dotted',
              marginLeft: 10,
              paddingVertical: 2,
              paddingHorizontal: 5,
            }}>
            {`Get at Flat Rs ${deals_price}`}
          </Text>
        </View>
      </View>
      <PlusMinusButtons item ={props.item} quantity = {0} type = {PLUS_MINUS_BUTTON_TYPE.ComboOffersDashboardCard}/>
    </View>
  );
};

export default ComboOffersCard;
