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
import { getDistance } from 'geolib';
import * as Colors from '../constants/ColorDefs';

const right_arrow = require('../../assets/right_arrow.png');
const green_placeholder = require('../../assets/green_placeholder.png');

const StoreCard = props => {
  const {store_name,address,city_id,photo,lat,lon} = props.item
  const {latitude, longitude} =  props.currentLoc
  let calculatedDistance = getDistance(
    { latitude: lat, longitude: lon},
    { latitude: latitude, longitude: longitude }
  );
  calculatedDistance = (calculatedDistance/1000).toFixed(2)
  return (
    <TouchableOpacity
      key={props.item.email}
      onPress = {()=>{
        props.onPress && props.onPress()
      }}
      style={{
        backgroundColor: Colors.WHITE,
        width: width -20,
        marginTop: 10,
        flexDirection: 'row',
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 20,
        shadowColor: Colors.GRAY,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
      }}>
      <Image
        style={{width: 36, height: 36, alignSelf: 'center', borderRadius:8}}
        source={photo ? {uri: photo} : green_placeholder}
      />
      <View
        style={{
          flex: 5,
          justifyContent: 'center',
          marginHorizontal: 18,
        }}>
        <Text style={{color: Colors.CLR_1D2237, fontSize: 15, fontWeight:'bold'}}>{store_name}</Text>
        <Text style={{fontSize: 12, color: '#666C84', marginTop: 5}}>
          {`${address} ${city_id}`}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Text style={{fontSize:12, color:'#EC8C0C'}}>{calculatedDistance} KM</Text>
        <Image
          resizeMode="contain"
          style={{width: 20, height: 20, marginRight: 10, marginTop: 12}}
          source={right_arrow}
        />
      </View>
    </TouchableOpacity>
  );
};

export default StoreCard;
