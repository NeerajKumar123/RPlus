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
const { width } = Dimensions.get('window');
import * as Colors from '../constants/ColorDefs';
const plus = require('../../assets/plus.png');
const green_placeholder = require('../../assets/green_placeholder.png');

const AvailablePackSize = props => {
  const { mrp, selling_price, deal_price, image, q_number, uname,product_id } = props.item;
  const isDeal = deal_price > 0;
  const price = isDeal ? deal_price : selling_price
  let off = Math.ceil(((mrp - price) / mrp) * 100)
  off = off.toFixed(0);
  off = `${off} % OFF`;
  const pKgRate = selling_price / q_number
  const isSelected = props.selectedTag?.product_id == product_id

  return (
    <TouchableOpacity
    onPress={() => {
      props.packSizeSelected && props.packSizeSelected()
    }}
      key={props.item.itemName}
      style={{
        backgroundColor: Colors.WHITE,
        width: '100%',
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
        borderColor:Colors.CLR_E88219,
        borderWidth:isSelected ? 1: 0
      }}>
      <Image
        resizeMode='contain'
        style={{ width: 65, height: 65, alignSelf: 'center', marginRight: 16}}
        source={image && image.length > 0 ? { uri: image } : green_placeholder}
      />
      <View
        style={{
          flex: 5,
          justifyContent: 'center',
          marginLeft: 20,
        }}>
        <View style={{ flexDirection: 'row', marginTop: 6, justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold' }}>Rs. {selling_price}</Text>
          <Text
            style={{
              textDecorationLine: 'line-through',
              textDecorationStyle: 'solid',
              marginHorizontal: 10,
              color:Colors.GRAY
            }}>
            Rs. {mrp}
          </Text>
          <Text style={{ fontWeight: 'bold' }}>Rs. {pKgRate}/{uname}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Text
            style={{
              borderRadius: 4,
              borderWidth: 1,
              borderColor: Colors.GREEN,
              fontWeight: 'bold',
              fontSize: 12,
              color: Colors.GREEN,
              textAlign: 'center',
              borderStyle: 'dotted',
              paddingVertical: 2,
              paddingHorizontal: 5,
            }}>
            {off}
          </Text>
          <TouchableOpacity
            onPress={() => {
              props.packSizeSelected && props.packSizeSelected()
            }}
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
           <Icon name={ isSelected ? 'radiobox-marked' : 'radiobox-blank'} size={20} color={Colors.CLR_E88219} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AvailablePackSize;
