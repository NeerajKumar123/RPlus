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

const tabConfigs = [
  {
    tabName: 'Home',
    iconSelected: homeSelected,
    iconUnselected: homeUnselected,
  },
  {
    tabName: 'Category',
    iconSelected: cateSelected,
    iconUnselected: cateUnselected,
  },
  {
    tabName: 'Offers',
    iconSelected: offersSelected,
    iconUnselected: offersUnselected,
  },
  {
    tabName: 'Account',
    iconSelected: accountSelected,
    iconUnselected: accountUnselected,
  },
];

const BottomTab = props => {
  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        height: 80,
        width: '100%',
        paddingBottom: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {tabConfigs &&
        tabConfigs.map((item, index) => {
          return (
            <Tab
              key={item.tabName}
              item={item}
              isSelected={props.selectedIndex == index + 1 ? true : false}
              onSelected={() => {
                props.onTabSelected(index + 1);
              }}
            />
          );
        })}
    </View>
  );
};

const Tab = props => {
  const {item, isSelected} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        props.onSelected();
      }}
      key={item.tabName}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isSelected
          ? Colors.CLR_RGBA100159221023
          : Colors.WHITE,
        flexDirection: 'row',
        borderRadius: 18,
        height: 36,
        paddingHorizontal:8
      }}>
      <Image
        resizeMode="contain"
        style={{width: 24, height: 24}}
        source={isSelected ? item.iconSelected : item.iconUnselected}
      />
      {isSelected && (
        <Text
          style={{
            marginLeft: 7,
            color: Colors.CLR_14273E,
            fontSize: 11,
            fontWeight: 'bold',
          }}>
          {item.tabName}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default BottomTab;
