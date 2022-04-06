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
import * as Colors from '../constants/ColorDefs';
import PlusMinusButtons from '../components/PlusMinusButtons';
import { PLUS_MINUS_BUTTON_TYPE } from '../constants/StaticValues';

const CartCard = props => {
  const {
    maxPrice,
    productName,
    sellingPrice,
    productImage,
    productQuantity,
  } = props.item;
  let off = ((maxPrice - sellingPrice) / maxPrice) * 100;
  off = off.toFixed(0);

  return (
    <TouchableOpacity
      onPress={() => {
        props.onProductSelected && props.onProductSelected();
      }}
      key={productName}
      style={{
        backgroundColor: Colors.WHITE,
        marginTop: 10,
        flexDirection: 'row',
        borderRadius: 4,
        marginHorizontal: 10,
        paddingVertical: 15,
        shadowColor: Colors.GRAY,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
        paddingHorizontal: 10,
        elevation: 3
      }}>
      <Image resizeMode='contain' style={{ width: 60, height: 80 }} source={{ uri: productImage }} />
      <View
        style={{
          flex: 5,
          justifyContent: 'center',
          marginHorizontal: 10,
        }}>
        <Text>{productName}</Text>
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Text style={{ fontWeight: 'bold' }}>{`Rs. ${sellingPrice}`}</Text>
          {off > 0 &&
            <Text
              style={{
                textDecorationLine: 'line-through',
                textDecorationStyle: 'solid',
                marginHorizontal: 10,
                color: Colors.GRAY
              }}>
              {`Rs. ${maxPrice}`}
            </Text>
          }
          {off > 0 &&
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
              {`${off} % OFF`}
            </Text>
          }
        </View>
      </View>
      <PlusMinusButtons
        item={props.item}
        quantity={productQuantity}
        type={PLUS_MINUS_BUTTON_TYPE.CartCard}
        onLoaderStateChanged={(loaderState) => {
          props.onLoaderStateChanged && props.onLoaderStateChanged(loaderState)
        }}
        onUpdation={() => {
          props.onUpdation && props.onUpdation()
        }}
      />
    </TouchableOpacity>
  );
};

export default CartCard;
