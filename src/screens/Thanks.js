
import React ,{useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../components/AppHeader';
import RPButton from '../components/RPButton'
import * as Colors from '../constants/ColorDefs';
const thanks = require('../../assets/thanks.png');
const Thanks = props => {
  const navigation = useNavigation()
  const orderDetails = props?.route?.params
  const userName = global.userInfo.name
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'column',
        backgroundColor:Colors.CLR_E7ECF2,
        flex:1
      }}>
      <AppHeader
        title="Thank You"
        isLeftIconEnabeld={true}
        onLeftPress={() => {
          navigation.navigate('DashboardContainer')
        }}
      />
      {orderDetails && 
      <View style = {{padding:20}} >
      <View style={{ alignItems: 'center', width: '100%', borderRadius:8, overflow:'hidden', backgroundColor:Colors.WHITE}}>
        <Image
          resizeMode="contain"
          style={{
            width: 84,
            height: 84,
            marginTop:30
          }}
          source={thanks}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: Colors.CLR_14273E,
            marginTop: 15,
          }}>
          {`Thank you, ${userName || 'User'}`}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: Colors.CLR_49537D,
            marginTop: 10,
            marginHorizontal:30,
            textAlign: 'center',
          }}>
          Your Grocery Order has been placed successfully.
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: Colors.CLR_08B354,
            marginTop: 15,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {`Order ID:  ${orderDetails.order_id}`}
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: Colors.CLR_49537D,
            marginTop: 10,
            textAlign: 'center',
          }}>
          Scheduled Delivery Time
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: Colors.CLR_49537D,
            marginTop: 5,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
          }}>
          {`${orderDetails.delivery_start_time} - ${orderDetails.delivery_end_time}, ${orderDetails.delivery_date}`}
        </Text>
        <View style={{marginTop:36,flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width:'80%', paddingBottom:30}}>
          <RPButton
            width={115}
            height = {44}
            title={'Shop More'}
            backgroundColor={Colors.WHITE}
            titleColor = {Colors.CLR_0376FC}
            borderColor = {Colors.CLR_0376FC}
            onPress={() => {
              navigation.navigate('DashboardContainer')
            }}
          />
          {/* <RPButton
            title={'Track Order'}
            width={115}
            height = {44}
            backgroundColor={Colors.CLR_EE6F12}
            titleColor = {Colors.WHITE}
            onPress={() => {
              navigation.navigate('TrackOrder');
            }}
          /> */}
        </View>
      </View>
      </View>
      }
    </View>
  );
};

export default Thanks