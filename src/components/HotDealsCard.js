import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as Colors from '../constants/ColorDefs';
import PlusMinusButtons from '../components/PlusMinusButtons'
import { PLUS_MINUS_BUTTON_TYPE } from '../constants/StaticValues'
const sold_out = require('../../assets/sold_out.png');

const HotDealsCard = props => {
  const { image, name, mrp, deals_price ,stock} = props.item
  let off = ((mrp - deals_price) / mrp) * 100;
  off = off.toFixed(0);
  off = `${off} % OFF`;
  const isOutOfStock = stock < 1 ? true : false

  return (
    <TouchableOpacity
      onPress={() => {
        props.onItemPressed();
      }}
      key={name}
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
      <Image resizeMode = 'contain' style={{ width: 60, height: 80,opacity:isOutOfStock?.3:1}} source={{ uri: image }} />
      {isOutOfStock && 
      <Image resizeMode = 'contain' style={{width: 60, height: 80, position:'absolute', alignSelf:'center',marginLeft:20}} source={sold_out} />
      }
      <View
        style={{
          flex: 5,
          justifyContent: 'center',
          marginHorizontal: 10,
          marginLeft: 20,
        }}>
        <Text style = {{opacity: isOutOfStock ?.5 : 1}}>{name}</Text>
        <View style={{ flexDirection: 'row', marginTop: 6 }}>
          <Text style={{ fontWeight: 'bold',opacity: isOutOfStock ?.5 : 1 }}>{`Rs. ${deals_price}`}</Text>
          <Text
            style={{
              textDecorationLine: 'line-through',
              textDecorationStyle: 'solid',
              marginHorizontal: 10,
              color:Colors.GRAY
            }}>
            {`Rs. ${mrp}`}
          </Text>
          {!isOutOfStock && 
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
          }
        </View>
        {!isOutOfStock && 
        <View style={{ flexDirection: 'row', marginTop: 10, flex: 1, justifyContent: 'space-between', }}>
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
          {`Get at Flat Rs ${deals_price}`}
        </Text>
        <PlusMinusButtons
          flex={.7}
          item={props.item}
          quantity={0}
          type={PLUS_MINUS_BUTTON_TYPE.HotDealsDashboardCard}
          onLoaderStateChanged={(loaderState) => {
            props.onLoaderStateChanged && props.onLoaderStateChanged(loaderState)
          }}/>
      </View>
        }
      </View>
    </TouchableOpacity>
  );
};

