import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import StoreCard from '../components/StoreCard';
import NoData from '../components/NoData';
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

const TermsAndConditions = props => {
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
  const [isLoading, setIsLoading] = useState(false);
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
        title="Terms & Conditions"
        onLeftPress={() => {
          navigation.goBack();
        }}
      />
      {isLoading && <RPLoader />}
      {termsAndConds && (
        <FlatList
          style={{
            width: '100%',
            paddingHorizontal: 17,
            marginBottom: 30,
          }}
          horizontal={false}
          keyExtractor={(item, index) => 'key_' + index}
          data={termsAndConds}
          renderItem={({item}) => <TermsCard item={item} />}
        />
      )}
    </View>
  );
};

const TermsCard = props => {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: Colors.WHITE,
        marginTop: 10,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 4,
      }}>
      <Text
        style={{color: Colors.CLR_17264D, fontSize: 14, fontWeight: 'bold'}}>
        1.
      </Text>
      <Text style={{color: Colors.CLR_17264D, fontSize: 14, marginLeft: 10}}>
        {`Who can refer on ${AppData.wallet_app_name}?`}
      </Text>
    </View>
  );
};

export default TermsAndConditions;
