import React from 'react';
import {Text, View, TouchableOpacity, Dimensions, Alert} from 'react-native';
const {width} = Dimensions.get('window');
import * as Colors from '../constants/ColorDefs';
import withCartSubscription from '../components/withCartSubscription';
import AppConfigData from '../constants/AppConfigData'

const FooterItemAddedToCart = props => {
  const AppData = AppConfigData()
  const quantity = props.quantity;
  const maxStockCount = props.item.no_of_quantity_allowed;
  const isDeal = props.item.deal_price > 0;
  return (
    <View
      style={{
        height: 75,
        width: '100%',
        flexDirection: 'row',
      }}>
      <TouchableOpacity
        onPress={() => {
          props.gotoCartPressed && props.gotoCartPressed();
        }}
        style={{
          backgroundColor: Colors.CLR_2C3646,
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 16,
            color: Colors.WHITE,
            fontWeight: 'bold',
          }}>
          Go to Cart
        </Text>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: Colors.CLR_E1650B,
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            props.onMinusPressed && props.onMinusPressed();
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 32,
            height: 32,
            borderRadius: 4,
            backgroundColor: Colors.CLR_B35009,
          }}>
          <Text
            style={{
              fontSize: 22,
              color: Colors.WHITE,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            -
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 22,
            color: Colors.WHITE,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {quantity}
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (quantity >= maxStockCount) {
              Alert.alert(AppData.title_alert, `Sorry! You can buy only up to ${maxStockCount} unit ${maxStockCount > 1 ? 's':''} of this product.`);
              return;
            }
            props.onPlusPressed && props.onPlusPressed();
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 32,
            height: 32,
            borderRadius: 4,
            backgroundColor: Colors.CLR_B35009,
          }}>
          <Text
            style={{
              fontSize: 22,
              color: Colors.WHITE,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default withCartSubscription(FooterItemAddedToCart);
