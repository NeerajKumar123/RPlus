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
import PlusMinusButtons from '../components/PlusMinusButtons'
import { PLUS_MINUS_BUTTON_TYPE } from '../constants/StaticValues'
const sold_out = require('../../assets/sold_out.png');

const FeaturedSimilarProductCard = props => {
  const { name, image, selling_price, mrp, stock } = props.item
  const mprVal = parseFloat(mrp)
  const selling_priceVal = parseFloat(selling_price)
  let off = mprVal &&  selling_priceVal && (mprVal - selling_priceVal) / mprVal * 100
  off = off.toFixed(0)
  off = `${off} % OFF`
  const isOutOfStock = stock < 1 ? true : false
  
  const featuredProductCardStyle = {
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 4,
    width: (width - 40) / 2,
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 12,
    shadowColor: Colors.LIGHTGRAY,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 3,
    shadowOpacity: 1.0,
    elevation:3,
  }
  return (
    <TouchableOpacity
      key={name}
      style={featuredProductCardStyle}
      onPress={() => {
        props.onPress()
      }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <Text
          style={{
            borderRadius: 4,
            borderWidth: 1,
            fontWeight: 'bold',
            fontSize: 12,
            paddingHorizontal: 5,
            paddingVertical: 2,
            color: Colors.GREEN,
            borderColor: Colors.GREEN,
            textAlign: 'center',
          }}>
          {off}
        </Text>
      </View>
      <Image
      resizeMode = 'contain'
        style={{
          width: 70,
          height: 94,
          alignSelf: 'center',
          borderRadius: 4,
          marginTop: 14,
          opacity:isOutOfStock?.3:1,
        }}
        source={{
          uri: image
        }}
      />
      {isOutOfStock && 
      <Image resizeMode = 'contain' style={{width: 70, height: 94, position:'absolute',top:50, alignSelf:'center'}} source={sold_out} />
      }
      <Text
        style={{
          paddingHorizontal: 5,
          fontSize: 12,
          marginTop: 12,
        }}>
        {name}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{ flexDirection: 'column' }}>
          <Text
            style={{
              paddingHorizontal: 5,
              fontSize: 14,
              marginTop: 6,
              fontWeight: 'bold',
            }}>
            {`Rs. ${selling_price}`}
          </Text>
          <Text
            style={{
              paddingHorizontal: 5,
              fontSize: 14,
              marginTop: 6,
              textDecorationStyle: 'solid',
              textDecorationLine: 'line-through',
              color:Colors.GRAY
            }}>
            {`Rs. ${mrp}`}
          </Text>
        </View>
        {!isOutOfStock && 
        <PlusMinusButtons
        onLoaderStateChanged={(isLoading) => {
          props.onLoaderStateChanged(isLoading)
        }}
        onUpdation={() => {
          props.onUpdation && props.onUpdation()
        }}
        item={props.item} quantity={0} type={PLUS_MINUS_BUTTON_TYPE.FeeaturedSimilarProductCard} />
        }
        
      </View>
    </TouchableOpacity>
  );
};



export default FeaturedSimilarProductCard;
