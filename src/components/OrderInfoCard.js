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
import OrderStatus from '../components/OrderStatus';
const OrderInfoCard = props => {
  const {
    order_id = 'ORDER123',
    totalsellingprice = 'Price',
    product_name = 'Item Name',
    items = 2,
    q_number = 3,
    uname = '',
    delivery_stage,
    quantity,
    image,
    mrp,
    selling_price,
    cancel_status = 0
  } = props.item;
  let off = ((mrp - selling_price) / mrp) * 100;
  off = off.toFixed(0);
  off = `${off} % OFF`;

  const {store_name} = global.storeInfo
  return (
    <View
      key={order_id}
      style={{
        backgroundColor: Colors.WHITE,
        borderRadius: 4,
        paddingVertical: 15,
        shadowColor: Colors.GRAY,
        marginTop: 20,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
        paddingHorizontal: 10,
      }}>
      <Text
        style={{
          color: Colors.CLR_16253B,
          fontWeight: 'bold',
          fontSize: 14,
        }}>
        {`Order ID :${order_id}`}
      </Text>
      <View style={{marginTop: 10, flexDirection: 'row'}}>
        <Image
        resizeMode = 'contain'
          style={{width: 60, height: 80}}
          source={{
            uri:image,
          }}
        />
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
            {product_name}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
            <Text
            style={{
              color: Colors.CLR_16253B,
              fontSize: 14,
              marginVertical: 7,
              fontWeight: 'bold',
            }}>
            {`Rs. ${selling_price}`}
            </Text>
            <Text
            style={{
              color: Colors.GRAY,
              fontSize: 14,
              marginVertical: 7,
              fontWeight: 'bold',
              textDecorationLine:'line-through'
            }}>
            {`Rs. ${mrp}`}
            </Text>
            <View>
            <Text
            style={{
              borderRadius: 4,
              borderWidth: 1,
              borderColor: Colors.GREEN,
              paddingHorizontal: 5,
              fontWeight: 'bold',
              fontSize: 12,
              color: Colors.GREEN,
            }}>
            {off}
          </Text>
          </View>
            
          </View>
          <Text
              style={{
                color: Colors.CLR_16253B,
                fontSize: 13,
                marginVertical: 7,
              }}>
              {`Qty : ${quantity}`}
            </Text>
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
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          disabled = {cancel_status }
          style={{
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 15,
            marginRight: 30,
          }}
          onPress={() => {
            props.onCancelPressed && props.onCancelPressed();
          }}>
          <Text
            style={{
              color: Colors.CLR_DD5E5E,
              fontWeight: 'bold',
              fontSize: 14,
              opacity : cancel_status ? .7 : 1.0
            }}>
            {cancel_status ? 'Cancelled' : 'Cancel'}
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
            props.onReorderPresssed && props.onReorderPresssed();
          }}>
          <Text
            style={{
              color: Colors.CLR_0376FC,
              fontWeight: 'bold',
              fontSize: 14,
            }}>
            Re-Order
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

export default OrderInfoCard;
