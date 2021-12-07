import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Colors from '../constants/ColorDefs';
import AppHeader from '../components/AppHeader';
import OrderCard from '../components/OrderCard';
import RPButton from '../components/RPButton';
import RPLoader from '../components/RPLoader';
import {RescheduleDateTimeModel} from '../components/RPModels';
import {
  getOrdersList,
  cancelOrder,
  rescheduleOrder,
  getDeliveryDateTimeSlots,
} from '../apihelper/Api';
const search_icon = require('../../assets/search_icon.png');
const cart_icon = require('../../assets/cart_icon.png');
const empty_orders_image = require('../../assets/empty_orders_image.png');

const OrderListing = () => {
  const navigation = useNavigation();
  const [buttonTypeSelected, setButtonTypeSelected] = useState(1);
  const badgeCount = global.badgeCount;
  const companyID = global.storeInfo && global.storeInfo.company_id;
  const storeID = global.storeInfo && global.storeInfo.id;
  const customerID = global.userInfo && global.userInfo.customer_id;
  const [orders, setOrders] = useState(undefined);
  const [order, setOrder] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false);
  const [slots, setSlots] = useState(undefined);
  const [timeSlots, setTimeSlots] = useState(undefined);
  const [deliveryDateSlot, setDeliveryDateSlot] = useState(undefined);
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState(undefined);
  const [showRescheduleModel, setShowRescheduleModel] = useState(false);

 const updateOrderList = () =>{
  const params = {
    company_id: companyID,
    store_id: storeID,
    customer_id: customerID,
  };
    setIsLoading(true);
    getOrdersList(params, res => {
      const allOrders = res?.payload_orderList
      allOrders && allOrders.sort((a, b) => b.order_id - a.order_id);
      setOrders(allOrders);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    const params = {
      company_id: companyID,
      store_id: storeID,
      customer_id: customerID,
    }
    updateOrderList()
    getDeliveryDateTimeSlots(params, res => {
      const slots = res && res.payload_timeSlot;
      const defaultDateSlot = slots && slots[0];
      const defaultTimeSlots = defaultDateSlot && defaultDateSlot.timeslot;
      setSlots(slots);
      setDeliveryDateSlot(defaultDateSlot);
      setTimeSlots(defaultTimeSlots);
      setDeliveryTimeSlot(defaultTimeSlots && defaultTimeSlots[0]);
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <AppHeader
        title="Orders"
        isLeftIconEnabeld={true}
        onLeftPress={() => {
          navigation.goBack();
        }}
        rightIcons={[
          {
            iconSource: search_icon,
            color: Colors.CLR_5F259F,
            onPress: () => {
              navigation.navigate('DashboardContainer', {store_id: 6});
            },
            iconBg: Colors.GREEN,
          },
          {
            iconSource: cart_icon,
            color: Colors.CLR_5F259F,
            badgeCount: badgeCount,
            onPress: () => {
              navigation.navigate('Cart');
            },
            iconBg: Colors.GREEN,
          },
        ]}
      />
      {isLoading && <RPLoader />}
      {orders && orders.length <= 0 && (
        <NoOrders
          startShoppiingPressed={() => {
          }}
        />
      )}
      {orders && orders.length > 0 && (
        <FlatList
          style={{width: '100%', marginTop: 10}}
          horizontal={false}
          keyExtractor={(item, index) => 'key_' + index}
          data={orders}
          ItemSeparatorComponent={() => (
            <View style={{width: 10, height: 20}} />
          )}
          renderItem={({item}) => (
            <OrderCard
              item={item}
              onCancelPressed={() => {
                setIsLoading(true)
                const params = {
                  company_id: companyID,
                  store_id: storeID,
                  customer_id: customerID,
                  order_id: item.order_id,
                  cancelled_reason: 'other',
                  cancelled_remarks: 'cancelled_remarks',
                };
                cancelOrder(params, res => {
                  updateOrderList()
                  setIsLoading(false)
                });
              }}
              onReschedulePressed={() => {
                setShowRescheduleModel(true)
                setOrder(item)
              }}
              onViewDetailsPressed={() => {
                navigation.navigate('OrderDetails', {...item});
              }}
            />
          )}
        />
      )}
      {slots && timeSlots && showRescheduleModel && (
        <RescheduleDateTimeModel
          title={'Choose Delivery Time'}
          deliverySlots={slots}
          timeSlots={timeSlots}
          deliveryDateSlot={deliveryDateSlot}
          deliveryTimeSlot={deliveryTimeSlot}
          onClose = {() =>{
            setShowRescheduleModel(false)
          }}
          rescheduleNow={(selectedDateSlot, selectedTimeSlot) => {
            setShowRescheduleModel(false)
            setIsLoading(true)
            const params = {
              company_id: companyID,
              store_id: storeID,
              customer_id: customerID,
              order_id: order.order_id,
              slot_date: selectedDateSlot.date,
              slot_id: selectedTimeSlot.slot_id,
            };
            rescheduleOrder(params, res => {
              updateOrderList()
            });
          }}
        />
      )}
    </View>
  );
};
const NoOrders = props => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'column',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        resizeMode="contain"
        style={{
          width: 143,
          height: 143,
        }}
        source={empty_orders_image}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: Colors.CLR_68708E,
          marginTop: 18,
        }}>
        Haven't placed any order yet
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: Colors.CLR_68708E,
          marginTop: 8,
          marginBottom: 30,
          width: 230,
          textAlign: 'center',
        }}>
        We are egerly waiting to deliver your first order
      </Text>
      <RPButton
        title={'Start Shopping'}
        backgroundColor={Colors.CLR_EE6F12}
        onPress={() => {
          props.startShoppiingPressed && props.startShoppiingPressed();
        }}
      />
    </View>
  );
};

const ButtonItem = props => {
  const {item, buttonType} = props;
  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: Colors.WHITE,
        borderBottomWidth: buttonType == item.buttonType ? 3 : 0,
        paddingVertical: 13,
      }}
      onPress={() => {
        props.onPress && props.onPress();
      }}>
      <Text style={{fontSize: 16, fontWeight: 'bold', color: Colors.WHITE}}>
        {item.Name}
      </Text>
    </TouchableOpacity>
  );
};

const Header = props => {
  const headerConfigs = [
    {Name: 'Orders', buttonType: 1},
    {Name: 'Bookings', buttonType: 2},
  ];
  const {selectedButtonType} = props;
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        maxHeight: 90,
        marginTop: -80,
      }}>
      <FlatList
        horizontal={true}
        scrollEnabled={false}
        keyExtractor={(item, index) => 'key_' + index}
        data={headerConfigs}
        ItemSeparatorComponent={() => <View style={{width: 10, height: 20}} />}
        renderItem={({item, index}) => (
          <ButtonItem
            item={item}
            buttonType={selectedButtonType}
            onPress={() => {
              props.onSegmentSelect && props.onSegmentSelect(item);
            }}
          />
        )}
      />
    </View>
  );
};

export default OrderListing;
