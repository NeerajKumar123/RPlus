import React,{useState} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import * as Colors from '../constants/ColorDefs';
import PlusMinusButtons from './PlusMinusButtons';
import {PLUS_MINUS_BUTTON_TYPE} from '../constants/StaticValues';
const sold_out = require('../../assets/sold_out.png');

const VerticalProductCard = props => {
  const [isNotified, setIsNotified] = useState(false)
  const {mrp, name, selling_price, image,stock} = props.item;
  let off = ((mrp - selling_price) / mrp) * 100;
  off = off.toFixed(0);
  const isOutOfStock = stock < 1 ? true : false;

  return (
    <TouchableOpacity
      onPress={() => {
        props.onProductSelected && props.onProductSelected();
      }}
      key={name}
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
      }}>
      <Image resizeMode = 'contain' style={{width: 65, height: 65, opacity:isOutOfStock ? .3 : 1}} source={{uri: image}} />
      {isOutOfStock && 
      <Image resizeMode = 'contain' style={{width: 65, height: 65, position:'absolute', top:15, left:10}} source={sold_out} />
      }
      <View
        style={{
          flex: 5,
          justifyContent: 'center',
          marginHorizontal: 10,
        }}>
        <Text style = {{color: isOutOfStock ? 'darkgray' : '#000000'}}>{name}</Text>
        {isOutOfStock ? (
        <View style={{flexDirection: 'row', marginTop: 6, justifyContent:'space-between', alignItems:'center', width:'100%'}}>
          <Text style={{fontWeight: 'bold',color:'darkgray'}}>
          {`Rs. ${mrp}`}
          </Text>
        </View>
      ) : (
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Text style={{fontWeight: 'bold'}}>{`Rs. ${selling_price}`}</Text>
          {off > 0 && 
           <Text
           style={{
             textDecorationLine: 'line-through',
             textDecorationStyle: 'solid',
             marginHorizontal: 10,
             color:Colors.GRAY
           }}>
           {`Rs. ${mrp}`}
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
      )}
      </View>
      {!isOutOfStock &&
      <PlusMinusButtons
      onUpdation={() => {
        props.onUpdation && props.onUpdation();
      }}
      onLoaderStateChanged={(loaderState) => {
        props.onLoaderStateChanged && props.onLoaderStateChanged(loaderState)
      }}
      item={props.item}
      quantity={0}
      type={PLUS_MINUS_BUTTON_TYPE.VertialProductCard}
    />
      }
      
    </TouchableOpacity>
  );
};

export default VerticalProductCard;
