import React from 'react';
import {
  Platform,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const {width} = Dimensions.get('window');
import * as Colors from '../constants/ColorDefs';

const homeSelected = require('../../assets/home_selected.png');
const homeUnselected = require('../../assets/home_normal.png');
const cateSelected = require('../../assets/category_selected.png');
const cateUnselected = require('../../assets/category_normal.png');
const offersSelected = require('../../assets/offer_selected.png');
const offersUnselected = require('../../assets/offer_normal.png');
const accountSelected = require('../../assets/account_selected.png');
const accountUnselected = require('../../assets/account_normal.png');

const progressConfigs = [
  {
    tabName: '1',
    iconSelected: homeSelected,
    iconUnselected: homeUnselected,
  },
  {
    tabName: '2',
    iconSelected: cateSelected,
    iconUnselected: cateUnselected,
  },
  {
    tabName: '3',
    iconSelected: offersSelected,
    iconUnselected: offersUnselected,
  },
];

const CheckoutSteps = props => {
  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {progressConfigs &&
        progressConfigs.map((item, index) => {
          return (
            <Step
              key={item.tabName}
              item={item}
              itemIndex = {index}
              progressIndex = {props.progressIndex}
              onSelected={() => {
                props.onTabSelected(index + 1);
              }}
            />
          );
        })}
    </View>
  );
};

const Step = props => {
  const {item, itemIndex, progressIndex} = props;
  return (
    <TouchableOpacity
      disabled={true}
      key={item.tabName}
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        height: 36,
        width:item.tabName == 3 ? 20 :150
      }}>
      <View
        style={{
          backgroundColor: progressIndex > itemIndex ? Colors.CLR_03C47E : Colors.WHITE,
          height: 20,
          width: 20,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color:progressIndex > itemIndex ? Colors.WHITE  : Colors.BLACK,
            fontSize: 13,
            fontWeight: 'bold',
          }}>
          {item.tabName}
        </Text>
      </View>
      <View style = {{backgroundColor:progressIndex > itemIndex + 1 ? Colors.WHITE :'orange', flex:1, height:progressIndex > itemIndex + 1 ? 1 : .5}}/>
    </TouchableOpacity>
  );
};

export default CheckoutSteps;
