import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import StoreCard from '../components/StoreCard';
import NoData from '../components/NoData';
import {tncList} from '../apihelper/Api.js';
import RPLoader from '../components/RPLoader';
import AppHeader from '../components/AppHeader';
import * as Colors from '../constants/ColorDefs';
import * as Storage from '../helpers/RPStorage';
import {isEmpty} from '../helpers/BaseUtility';
const home_bg = require('../../assets/home_bg.png');
const detector = require('../../assets/detector.png');
const empty_orders_image = require('../../assets/empty_orders_image.png');
import AppConfigData from '../constants/AppConfigData'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const hiw_first = require('../../assets/hiw_first.png');
const hiw_second = require('../../assets/hiw_second.png');
const hiw_thrd = require('../../assets/hiw_thrd.png');
const hiw_last = require('../../assets/hiw_last.png');
const dash = require('../../assets/dash.png');
const dash_reverse = require('../../assets/dash_reverse.png');

const HowItWorks = props => {
  const AppData = AppConfigData()
  const navigation = useNavigation();
  const [termsAndConds, setTermsAndConds] = useState([
    {name: 'qs'},
    {name: 'qs'},
    {name: 'qs'},
    {name: 'qs'},
    {name: 'qs'},
    {name: 'qs'},
    {name: 'qs'},
    {name: 'qs'},
  ]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        width: '100%',
        backgroundColor: Colors.CLR_E7ECF2,
      }}>
      <AppHeader
        isLeftIconEnabeld={true}
        title="How it Works"
        onLeftPress={() => {
          navigation.goBack();
        }}
      />
      <View
        style={{
          width: '100%',
          backgroundColor: Colors.CLR_B9E0F7,
          height: 223,
        }}>
        <Image
          resizeMode="contain"
          style={{
            width: '100%',
            height: 174,
            marginTop: 20,
          }}
          source={hiw_first}
        />
      </View>
      <View
        style={{
          backgroundColor: Colors.WHITE,
          width: '90%',
          borderRadius: 6,
          height: 500,
          paddingHorizontal: 30,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            marginTop: 26,
            fontWeight: 'bold',
            color: Colors.CLR_17264D,
          }}>
          How Refer & Earn works
        </Text>
        <Card
            marginTop = {20}
          image={hiw_second}
          dashImage = {dash}
          title="Share the referral code"
          subtitle={'You share the referral code with your loved ones.'}
          isLeft={true}
        />
        <Card
            marginTop = {-10}
          image={hiw_thrd}
          dashImage = {dash_reverse}
          title="Friend makes 1st purchase"
          subtitle={`They order groceries on ${AppData.wallet_app_name} using your referral code`}
          isLeft={false}
        />
        <Card
            marginTop = {-10}
            image={hiw_last}
          title="You get Rs.100 "
          subtitle={'They get instant discounts of ₹100 & you get ₹ 100 in your wallet.'}
          isLeft={true}
        />
      </View>
    </View>
  );
};

const Card = props => {
    const {title, subtitle,image,dashImage, isLeft,marginTop} = props
  return (
    <View style = {{justifyContent:'center', alignItems:'center'}}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: marginTop,
          justifyContent:'center',
          alignItems:'center'
        }}>
            {isLeft && 
             <Image
             resizeMode="contain"
             style={{
               height: 59,
               width: 59,
             }}
             source={image}
           />
            }
        <View
          style={{
            flexDirection: 'column',
            marginLeft: 20,
            flex: 1,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: Colors.CLR_17264D,
            }}>
            {title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: Colors.CLR_525F82,
            }}>
            {subtitle}
          </Text>
        </View>
        {!isLeft && 
             <Image
             resizeMode="contain"
             style={{
               height: 59,
               width: 59,
             }}
             source={image}
           />
            }
      </View>
      {dashImage && 
      <Image
      resizeMode='cover'
      style={{
        width: '80%',
        height: 80,
      }}
      source={dashImage}
    />
      }
      
    </View>
  );
};

export default HowItWorks;
