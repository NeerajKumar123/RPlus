import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Colors from '../constants/ColorDefs';
import AppHeader from '../components/AppHeader';
import OrderInfoCard from '../components/OrderInfoCard';
import RPLoader from '../components/RPLoader';
import {
  getOrderDetails,
  cancelItem,
  rescheduleOrder,
  getDeliveryDateTimeSlots,
} from '../apihelper/Api';
import {RescheduleDateTimeModel} from '../components/RPModels';

const OrderDetails = props => {
  const navigation = useNavigation();
  const [orderDetails, setOrderDetails] = useState(undefined);
  const [orderItems, setOrderItems] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const companyID = global.storeInfo && global.storeInfo.company_id;
  const storeID = global.storeInfo && global.storeInfo.id;
  const customerID = global.userInfo && global.userInfo.customer_id;
  const orderID = props?.route?.params?.order_id;
  const [slots, setSlots] = useState(undefined);
  const [timeSlots, setTimeSlots] = useState(undefined);
  const [deliveryDateSlot, setDeliveryDateSlot] = useState(undefined);
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState(undefined);
  const [showRescheduleModel, setShowRescheduleModel] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();

  useEffect(() => {
    getUpdatedOrderDetails();
  }, []);

  useEffect(() => {
    if (isCancelled) {
      getUpdatedOrderDetails();
    }
  }, [isCancelled]);

  useEffect(() => {
    const params = {
      company_id: companyID,
      store_id: storeID,
      customer_id: customerID,
    };
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

  const getUpdatedOrderDetails = () => {
    const params = {
      company_id: companyID,
      store_id: storeID,
      customer_id: customerID,
      order_id: orderID,
    };
    setIsLoading(true);
    getOrderDetails(params, res => {
      console.log('res', res);
      setOrderDetails(res?.payload_orderDetails);
      setOrderItems(res?.payload_orderDetails?.orderdetails);
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.CLR_E7ECF2,
      }}>
      <AppHeader
        title="Order Details"
        isLeftIconEnabeld={true}
        onLeftPress={() => {
          navigation.goBack();
        }}
      />
      {isLoading && <RPLoader />}
      {orderDetails && (
        <ScrollView style={{padding: 20}} showsVerticalScrollIndicator={false}>
          <DeleiverySlot orderDetails={orderDetails} />
          <DeleiveryAdd orderDetails={orderDetails} />
          <InvoiceDetails orderDetails={orderDetails} />
          {orderItems && (
            <FlatList
              style={{width: '100%', marginTop: 10, marginBottom: 100}}
              horizontal={false}
              keyExtractor={(item, index) => 'key_' + index}
              data={orderItems}
              ItemSeparatorComponent={() => (
                <View style={{width: 10, height: 20}} />
              )}
              renderItem={({item}) => (
                <OrderInfoCard
                  item={item}
                  onTrackOrderPressed={() => {
                    setSelectedOrder(item);
                    navigation.navigate('TrackOrder');
                  }}
                  onCancelPressed={() => {
                    setSelectedOrder(item);
                    setIsLoading(true);
                    const params = {
                      company_id: companyID,
                      store_id: storeID,
                      customer_id: customerID,
                      order_id: orderID,
                      item_id: item.item_id,
                    };
                    cancelItem(params, res => {
                      setIsCancelled(true);
                      setIsLoading(false);
                    });
                  }}
                  onReorderPresssed={() => {
                    setSelectedOrder(item);
                    setShowRescheduleModel(true);
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
              onClose={() => {
                setShowRescheduleModel(false);
              }}
              rescheduleNow={(selectedDateSlot, selectedTimeSlot) => {
                console.log('selected order====>', selectedOrder);
                setShowRescheduleModel(false);
                const params = {
                  company_id: companyID,
                  store_id: storeID,
                  customer_id: customerID,
                  order_id: selectedOrder?.order_id,
                  slot_date: selectedDateSlot?.date,
                  slot_id: selectedTimeSlot?.slot_id,
                };
                rescheduleOrder(params, res => {
                  getUpdatedOrderDetails();
                });
              }}
            />
          )}
        </ScrollView>
      )}
    </View>
  );
};
const Title = props => {
  return (
    <Text
      style={{
        marginTop: props.marginTop ? props.marginTop : 0,
        marginBottom: props.marginBottom ? props.marginBottom : 0,
        color: Colors.CLR_14273E,
        fontSize: 18,
        fontWeight: 'bold',
      }}>
      {props.value}
    </Text>
  );
};

const SubTitle = props => {
  return (
    <Text
      style={{
        marginTop: props.marginTop ? props.marginTop : 0,
        marginBottom: props.marginBottom ? props.marginBottom : 0,
        color: Colors.CLR_161E42,
        fontSize: 14,
      }}>
      {props.value}
    </Text>
  );
};
const TitleSubTitle = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: props.marginTop ? props.marginTop : 0,
        marginBottom: props.marginBottom ? props.marginBottom : 0,
      }}>
      <Text
        style={{
          color: Colors.CLR_161E42,
          fontSize: props.fontSize ? props.fontSize : 12,
        }}>
        {props.title}
      </Text>
      <Text
        style={{
          color: Colors.CLR_16253B,
          fontSize: props.fontSize ? props.fontSize : 12,
          fontWeight: 'bold',
        }}>
        {props.subtitle}
      </Text>
    </View>
  );
};

const getAMOrPM = time => {
  return parseInt(time) > 12 ? 'PM' : 'AM';
};

const DeleiverySlot = props => {
  const {end_time, start_time, slot_date} = props.orderDetails;
  const timeSlot = `${parseInt(start_time) % 12}:00 ${getAMOrPM(
    start_time,
  )} - ${parseInt(end_time) % 12}:00 ${getAMOrPM(end_time)}`;

  let displaydate = slot_date;
  return (
    <View style={{backgroundColor: Colors.WHITE, borderRadius: 4, padding: 15}}>
      <Title value="Delivery Slot" />
      <SubTitle value={timeSlot} marginTop={5} />
      <SubTitle value={displaydate} marginTop={5} />
    </View>
  );
};

const DeleiveryAdd = props => {
  const {
    delivered_name,
    delivered_contact,
    delivered_house_no,
    delivered_street,
    delivered_landmark,
    delivered_city,
    delivered_state,
    delivered_pincode,
  } = props.orderDetails;
  const displayAddStr = `${delivered_house_no} ${delivered_street} ${delivered_city} ${delivered_state}(${delivered_pincode})`;
  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        borderRadius: 4,
        padding: 15,
        marginTop: 20,
      }}>
      <Title value="Delivery Address" />
      {delivered_name && <SubTitle value={delivered_name} marginTop={5} />}
      {delivered_contact && (
        <SubTitle value={delivered_contact} marginTop={5} />
      )}
      {delivered_landmark && (
        <SubTitle value={`Near ${delivered_landmark}`} marginTop={5} />
      )}
      {displayAddStr && <SubTitle value={displayAddStr} marginTop={5} />}
    </View>
  );
};

const InvoiceDetails = props => {
  const {
    invoice_no = 'INVOICE202092',
    order_string,
    paymentmode,
    totalsellingprice,
  } = props.orderDetails;
  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        borderRadius: 4,
        padding: 15,
        marginTop: 20,
      }}>
      <Title value="Invoice Details" />
      <TitleSubTitle title="Invoice No :" subtitle={invoice_no} marginTop={8} />
      <TitleSubTitle
        title="Order No . : "
        subtitle={order_string}
        marginTop={8}
      />
      <TitleSubTitle
        title="Payment Mode. : "
        subtitle={paymentmode}
        marginTop={8}
      />
      <TitleSubTitle
        title="Amount Payable"
        subtitle={`Rs. ${totalsellingprice}`}
        marginTop={15}
        fontSize={16}
      />
    </View>
  );
};

export default OrderDetails;
