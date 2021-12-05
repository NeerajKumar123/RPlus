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
import RPButton from '../components/RPButton';
const {width} = Dimensions.get('window');
import * as Colors from '../constants/ColorDefs';

const atta = require('../../assets/atta.png');

const OrderCard = props => {
  const {
    order_string = 'ORDER123',
    totalsellingprice = 'Price',
    image,
    item_name = 'Item Name',
    items = 2,
    ordered_on = '02-02-2021 9:10:48',
    delivery_date = '02-02-2021 9:10:48',
    q_number = 3,
    store_name = 'Honey top',
    uname = '',
    status,
  } = props.item;
  let finalItemName = item_name
  if(items > 1){
    finalItemName = `${item_name} & ${items-1} more items`
  }
  let orderDisplayText = 'Ordered';
  let bgColor = Colors.GREEN;
  switch (status) {
    case 1:
      orderDisplayText = 'Ordered';
      bgColor = Colors.GREEN;
      break;

    case 2:
      orderDisplayText = 'Cancelled';
      bgColor = Colors.RED;
      break;

    case 3:
      orderDisplayText = 'Resheudled';
      bgColor = Colors.CLR_0065FF;
      break;

    case 4:
      orderDisplayText = 'Delivered';
      bgColor = Colors.CLR_0065FF;
      break;

    default:
      break;
  }
  return (
    <View
      key={props.item.itemName}
      style={{
        backgroundColor: Colors.WHITE,
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: Colors.CLR_16253B,
            fontWeight: 'bold',
            fontSize: 14,
          }}>
          {`Order ID :${order_string}`}
        </Text>
        <Text
          style={{
            color: Colors.WHITE,
            fontSize: 12,
            backgroundColor: bgColor,
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderRadius: 2,
            overflow:'hidden'
          }}>
          {orderDisplayText}
        </Text>
      </View>

      <View style={{marginTop: 10, flexDirection: 'row'}}>
        <Image resizeMode = 'contain' style={{width: 60, height: 80}} source={{uri: image}} />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            marginHorizontal: 10,
            flex: 5,
          }}>
          <Text
            style={{
              color: Colors.CLR_16253B,
              fontSize: 13,
            }}>
            {finalItemName}
          </Text>
          <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 2,
          }}>
          <Text
            style={{
              color: Colors.CLR_16253B,
              fontSize: 14,
              marginTop: 8,
              fontWeight: 'bold',
            }}>
            {`Rs. ${totalsellingprice}`}
          </Text>
        </View>
          <Text
            style={{
              color: Colors.CLR_16253B,
              fontSize: 13,
              marginVertical: 7,
            }}>
            {`Seller : ${store_name}`}
          </Text>
        </View>
      </View>
      <View style={{marginTop: 10}}>
        <FlatList
          style={{width: '100%'}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => 'key_' + index}
          data={[
            {itemName: 'Fastest Delivery'},
            {itemName: '100% Gunuine Product'},
          ]}
          ItemSeparatorComponent={() => (
            <View style={{width: 10, height: 20}} />
          )}
          renderItem={({item}) => <Feature item={item} />}
        />
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}
          onPress={() => {
            props?.onReschedulePressed();
          }}>
          <Text
            style={{
              color: Colors.CLR_0376FC,
              fontWeight: 'bold',
              fontSize: 14,
            }}>
            Re-Schedule
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: Colors.CLR_0376FC,
            borderRadius: 4,
            borderWidth: 1,
            paddingHorizontal: 15,
          }}
          onPress={() => {
            props.onViewDetailsPressed();
          }}>
          <Text
            style={{
              color: Colors.CLR_0376FC,
              fontWeight: 'bold',
              fontSize: 14,
            }}>
            View Details
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Feature = props => {
  return (
    <View
      style={{
        backgroundColor: Colors.CLR_E4E9F2,
        paddingVertical: 5,
        paddingHorizontal: 7,
        borderRadius: 4,
      }}>
      <Text
        style={{
          color: '#676E8A',
          fontSize: 12,
        }}>
        {props.item.itemName}
      </Text>
    </View>
  );
};

export default OrderCard;
