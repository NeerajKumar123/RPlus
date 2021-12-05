import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as Colors from '../constants/ColorDefs';
import PlusMinusButtons from '../components/PlusMinusButtons'
import {PLUS_MINUS_BUTTON_TYPE} from '../constants/StaticValues'

const DealsOfTheDaycard = props => {
  const {item} = props
  const dealsCardStyle ={
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    borderRadius: 4,
    width: '48%',
    marginRight: props.index % 2 == 0 ? 10 : 0,
    marginTop: props.index == 0 || props.index == 1 ? 0 : 10,
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 12,
  }
  return (
    <TouchableOpacity
      key={item.name}
      style={dealsCardStyle}
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
            paddingVertical: 2 ,
            color: Colors.GREEN,
            borderColor: Colors.GREEN,
            textAlign: 'center',
          }}>
          {`Rs. ${item.mrp - item.deals_price} OFF`}
        </Text>
      </View>
      <Image
      resizeMode = 'contain'
        style={{
          width: 94,
          height: 94,
          alignSelf: 'center',
          borderRadius: 4,
          marginTop: 14,
        }}
        source={{
          uri: item.image
        }}
      />
      <Text
        style={{
          paddingHorizontal: 5,
          fontSize: 12,
          marginTop: 12,
          height:45,
        }}>
        {item.name}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'column'}}>
          <Text
            style={{
              paddingHorizontal: 5,
              fontSize: 14,
              marginTop: 6,
              fontWeight: 'bold',
            }}>
            {item.deals_price}
          </Text>
          <Text
            style={{
              paddingHorizontal: 5,
              fontSize: 14,
              marginTop: 6,
              textDecorationStyle:'solid',
              textDecorationLine:'line-through',
              color:Colors.GRAY
            }}>
            {item.mrp}
          </Text>
        </View>
        <PlusMinusButtons
            flex={.7}
            item={props.item}
            quantity={0}
            type={PLUS_MINUS_BUTTON_TYPE.DealsOfTheDayDashboard}
            onLoaderStateChanged={(loaderState) => {
              props.onLoaderStateChanged && props.onLoaderStateChanged(loaderState)
            }}/>
      </View>
    </TouchableOpacity>
  );
};



export default DealsOfTheDaycard;
