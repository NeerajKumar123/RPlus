import React, { useState } from 'react';
import {
  Platform,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import withCartSubscription from '../components/withCartSubscription'
import * as Colors from '../constants/ColorDefs';
import AppConfigData from '../constants/AppConfigData'


const PlusMinusButtons = props => {
  const AppData = AppConfigData()

  const { quantity } = props;
  return (
    <View
      style={{
        flex: props.flex || 1.8,
        flexDirection: 'row',
        justifyContent: quantity > 0 ? 'space-between' : 'flex-end',
        alignItems: 'center',
      }}>
      {quantity > 0 && (
        <TouchableOpacity
          onPress={() => {
            props.onMinusPressed && props.onMinusPressed();
          }}>
          <Icon name={'minus-circle-outline'} size={25} color={Colors.ORANGE} />
        </TouchableOpacity>
      )}
      {quantity > 0 && <Text style = {{fontWeight:'700'}}>{quantity.toString()}</Text>}
      <TouchableOpacity
        onPress={() => {
          if (quantity >= props.item.no_of_quantity_allowed || quantity >= props.item.maxAllowedQuantity) {
            Alert.alert(AppData.title_alert, props.item && props.item.is_deal ? 'You can buy only one of this item.' :  'You can not add more of this item.')
          } else {
            props.onPlusPressed && props.onPlusPressed();
          }
        }}>
        <Icon name={'plus-circle-outline'} size={25} color={Colors.ORANGE} />
      </TouchableOpacity>
    </View>
  );
};

export default withCartSubscription(PlusMinusButtons);
