import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
  StyleSheet,
  DeviceEventEmitter,
  Alert,
  Linking
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppHeader from '../components/AppHeader';
import RPButton from '../components/RPButton';
import RPLoader from '../components/RPLoader';
import RPModels from '../components/RPModels';
import DeliveryDateTimeSlotBlock from '../components/DeliveryDateTimeSlotBlock';
import {
  getDeliveryDateTimeSlots,
  getDeliveryCharge,
  getCouponList,
  getAddressList,
  checkCoupon
} from '../apihelper/Api';
import * as RPCartManager from '../helpers/RPCartManager';
import * as Colors from '../constants/ColorDefs';
const phone_icon = require('../../assets/phone_icon.png');
import AppConfigData from '../constants/AppConfigData'


const OrderSummary = () => {
  const navigation = useNavigation();
  const AppData = AppConfigData()
  const [deliveryAddress, setDeliveryAddress] = useState(undefined);
  const [slots, setSlots] = useState(undefined);
  const [timeSlots, setTimeSlots] = useState(undefined);
  const [deliveryDateSlot, setDeliveryDateSlot] = useState(undefined);
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalSellingPrice, setTotalSellingPrice] = useState(0);
  const [totalMrp, setTotalMrp] = useState(0);
  const [totalSaved, setTotalSaved] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(undefined);
  const [paybleAmount, setPaybleAmount] = useState(0);
  const [coupons, setCoupons] = useState([]);
  const [showApplyCpnView, setShowApplyCpnView] = useState(false);
  const [cartIDs, setCartIDs] = useState('');
  const [orderPlacedFailedCount, setOrderPlacedFailedCount] = useState(0)
  const companyID = global.storeInfo && global.storeInfo.company_id;
  const storeID = global.storeInfo && global.storeInfo.id;
  const customerID = global.userInfo && global.userInfo.customer_id;

  const updateList = cartItems => {
    let sum = 0;
    let saved = 0;
    let mrp = 0;
    cartItems &&
      cartItems.forEach(item => {
        sum =
          parseInt(sum) + parseInt(item.sellingPrice * item.productQuantity);
        mrp = parseInt(mrp) + parseInt(item.maxPrice * item.productQuantity);
        saved =
          saved +
          parseInt(item.maxPrice * item.productQuantity) -
          parseInt(item.sellingPrice * item.productQuantity);
      });
    setTotalSellingPrice(sum);
    setTotalMrp(mrp);
    setIsLoading(false);
    getCouponList({company_id: companyID,store_id: storeID,customer_id: customerID, sub_total: sum}, res => {
      const details = res && res.payload_couponList;
      setCoupons(details.couponList);
      setDeliveryCharges(details?.deliveryCharge?.delivery_charge)
      const slots =details?.timeSlot;
      const defaultDateSlot = slots && slots[0];
      const defaultTimeSlots = defaultDateSlot && defaultDateSlot.timeslot;
      setSlots(slots);
      setDeliveryDateSlot(defaultDateSlot);
      setTimeSlots(defaultTimeSlots);
      let firstSlotAvailble =  defaultTimeSlots && defaultTimeSlots.find(obj => {
        return obj.slotStatus == true
      })
      setDeliveryTimeSlot(firstSlotAvailble);
      setPaybleAmount(sum + details?.deliveryCharge?.delivery_charge);
      setTotalSaved(saved);
      if(appliedCoupon?.coupon_value){
        setPaybleAmount(sum + deliveryCharges - appliedCoupon.coupon_value);
        setTotalSaved(saved + appliedCoupon.coupon_value);
      }
    });
  };

  useEffect(() => {
    if(appliedCoupon){
      updateList(cartItems)
    }
  }, [appliedCoupon])

  const getCartIDs = cartItems => {
    var ids = cartItems.map(cartItem => cartItem.cartID.toString());
    setCartIDs(ids && ids.join());
  };

  useEffect(() => {
    DeviceEventEmitter.addListener('add_selected', eventData => {
      setDeliveryAddress(eventData);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const params = {
      company_id: companyID,
      store_id: storeID,
      customer_id: customerID,
    };
    RPCartManager.decideAndGetCartData(items => {
      setCartItems(items);
      updateList(items);
      getCartIDs(items);
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    const getAddParams = {store_id: storeID, customer_id: customerID};
    getAddressList(getAddParams, res => {
      const addressList = res?.payload_addressList;
      const results =
        addressList &&
        addressList.filter(item => {
          return item.address_type.toLowerCase() == 'home';
        });
      if (results && results.length > 0) {
        setDeliveryAddress(results[0]);
      }
    });
  }, []);

  const checkDelivery = () => {
    const storePincodes = global?.storeInfo?.pincode;
    const deliveryPincode = deliveryAddress?.pincode;
    const isServing =
      storePincodes &&
      deliveryPincode &&
      storePincodes.includes(deliveryPincode);
    if (isServing) {
      const details = {
        cartIDs: cartIDs,
        coupon: appliedCoupon,
        deliveryTimeSlot: deliveryTimeSlot,
        deliveryDateSlot: deliveryDateSlot,
        deliveryAddress: deliveryAddress,
        cartItemsCount: cartItems.length,
        totalSellingPrice: totalSellingPrice,
        maxPrice: totalMrp,
        discount: totalSaved,
        deliveryCharge: deliveryCharges,
        couponAmount: appliedCoupon?.coupon_value,
        paybleAmount: paybleAmount,
      };
      navigation.navigate('ChoosePayment', details);
    } else {
      Alert.alert(
        AppData.title_alert,
        `We are sorry as of now we are not serving in your Pincode. Please choose another delivery address. We can serve you at following pincodes ${storePincodes}`,
      );
      setTimeout(() => {
        setOrderPlacedFailedCount(orderPlacedFailedCount + 1)
      }, 2000);
    }
  };

  const openLink = (link, linkType) => {
    let finalLink = link;
    if (linkType == 1) { // mail
      if (Platform.OS == 'ios') {
        finalLink = `mailto:${finalLink}`;
      } else {
        finalLink = `mailto:${finalLink}`;
      }
    } else if (linkType == 2) {
      if (Platform.OS == 'ios') {
        finalLink = `telprompt:${finalLink}`;
      } else {
        finalLink = `tel:${finalLink}`;
      }
    } else if (linkType == 3) {
      if (Platform.OS == 'ios') {
        finalLink = `whatsapp://send?text=hello&phone=:${finalLink}`;
      } else {
        finalLink = `whatsapp://send?text=hello&phone=:${finalLink}`;
      }
    }
    Linking.canOpenURL(finalLink)
      .then(supported => {
        if (!supported) {
          Alert.alert(AppData.title_alert, 'Currently not availble');
        } else {
          return Linking.openURL(finalLink);
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.CLR_E7ECF2}}>
      <AppHeader
        title="Order Summary"
        isLeftIconEnabeld={true}
        isExtendedHeader={true}
        isCheckoutStep={true}
        progressIndex={1}
        onLeftPress={() => {
          navigation.goBack();
        }}
      />
      {isLoading && <RPLoader />}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Colors.CLR_E7ECF2,
        }}>
        {deliveryAddress&& (
          <AddressBlock
            address={deliveryAddress}
            onChangeorAddNewAddressPressed={() => {
              global.isFromAccount = false;
              navigation.navigate('Addresses');
            }}
          />
        )}
        <AddOrChangeAddBlock
        title = {deliveryAddress ? 'Change or Add New Address' : 'Add New Address'}
        onChangeorAddNewAddressPressed = {()=>{
          console.log('onChangeorAddNewAddressPressed')
          navigation.navigate('Addresses');
        }}
        />

        {slots && timeSlots && (
          <DeliveryDateTimeSlotBlock
            title={'Choose Delivery Time'}
            deliverySlots={slots}
            timeSlots={timeSlots}
            deliveryDateSlot={deliveryDateSlot}
            deliveryTimeSlot={deliveryTimeSlot}
            onDateSelected={item => {
              setDeliveryDateSlot(item);
              setTimeSlots(item.timeslot);
            }}
            onTimeSlotSelected={item => {
              setDeliveryTimeSlot(item);
            }}
        />
        )}

        {cartItems && (
          <ItemsInCartBlock
            cartItems={cartItems}
            maxPrice={totalMrp}
            sellingPrice={totalSellingPrice}
            saved={totalSaved}
            onItemClicked = {(item) => {
              const params = {
                store_id: item.storeID,
                product_id: item.productID,
                company_id: item.companyID,
              };
              navigation.navigate('ProductDetailsContainer', params)
            }}
          />
        )}
        {cartItems && (
          <PremiumBlock
            coupons={coupons}
            itemCount={cartItems.length}
            maxPrice={totalMrp}
            saved={totalSaved}
            deliveryCharges={deliveryCharges}
            couponDiscount={appliedCoupon && appliedCoupon.coupon_value || 0}
            paybleAmount={paybleAmount}
            onApplyCouponPressed={() => {
              setShowApplyCpnView(true);
            }}
          />
        )}
      </ScrollView>
      <OrderSummaryFooter
        paybleAmount={paybleAmount}
        saved={totalSaved}
        onContinuePressed={() => {
          checkDelivery();
        }}
      />
      {showApplyCpnView && (
        <RPModels
          coupons = {coupons}
          details = {{company_id:companyID,
            store_id:storeID,
            customer_id:customerID,
            sub_total:totalSellingPrice
          }}
          onClose={() => {
            setShowApplyCpnView(false);
          }}
          onApplyCoupon={cpn => {
          console.log('showApplyCpnView',cpn) 
          setAppliedCoupon(cpn)
          setShowApplyCpnView(false);
          }}
        />
      )}
    </View>
  );
};

const AddressBlock = props => {
  const {
    city,
    contact,
    email,
    house_no,
    instruction_delivery,
    landmark,
    name,
    pincode,
    state,
    street,
  } = props.address;
  const displayAddStr = `${house_no} ${street} ${city} ${state}(${pincode})`;
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'column',
        backgroundColor: Colors.WHITE,
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}>
      <Text
        style={{
          color: Colors.CLR_14273E,
          fontWeight: 'bold',
          fontSize: 18,
        }}>
        Delivery Address
      </Text>
      <Text style={styles.textStyle}>{name}</Text>
      <Text style={styles.textStyle}>{displayAddStr}</Text>
      {landmark && <Text style={styles.textStyle}>{landmark}</Text>}
      {instruction_delivery && (
        <Text style={styles.textStyle}>{instruction_delivery}</Text>
      )}
      <Text style={styles.textStyle}>{contact}</Text>
      <Text style={styles.textStyle}>{email}</Text>
    </View>
  );
};

const AddOrChangeAddBlock = props => {
  const {onChangeorAddNewAddressPressed  = () =>{}} = props;
  return (
    <View
    style={{
      marginVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <TouchableOpacity
      style={{
        height: 44,
        width: '80%',
        borderColor: Colors.CLR_02A3FC,
        borderRadius: 4,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => {
        onChangeorAddNewAddressPressed()
      }}>
      <Text
        style={{
          paddingHorizontal: 5,
          fontSize: 14,
          fontWeight: 'bold',
          color: Colors.CLR_02A3FC,
        }}>
        Change or Add new address
      </Text>
    </TouchableOpacity>
  </View>
  );
};

const ItemsInCartBlock = props => {
  const {cartItems, maxPrice, sellingPrice, saved} = props;
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'column',
        backgroundColor: Colors.WHITE,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginTop: 10,
      }}>
      <Text
        style={{
          color: Colors.CLR_14273E,
          fontWeight: 'bold',
          fontSize: 18,
        }}>
        {`${cartItems.length} Items in Cart`}
      </Text>
      <FlatList
        style={{width: '100%', marginTop: 12}}
        horizontal={true}
        keyExtractor={(item, index) => 'key_' + index}
        ItemSeparatorComponent={() => <View style={{width: 15}} />}
        data={cartItems}
        renderItem={({item}) => <CartItem 
        onItemClicked = {() =>{
          props.onItemClicked(item)
        }}
        item={item}
         />}
      />
      <View
        style={{
          width: '100%',
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{color: Colors.CLR_2C3646, fontSize: 16, fontWeight: 'bold'}}>
          {`Rs. ${sellingPrice}`}
        </Text>
        <Text
          style={{
            color: Colors.CLR_2C3646,
            fontSize: 13,
            marginHorizontal: 10,
            textDecorationLine: 'line-through',
            color:Colors.GRAY
          }}>
          {`Rs. ${maxPrice}`}
        </Text>
        <Text
          style={{
            color: Colors.CLR_0D9765,
            fontSize: 14,
            marginHorizontal: 10,
          }}>
          {`Saved Rs. ${saved}`}
        </Text>
      </View>
    </View>
  );
};

const CartItem = props => {
  const {productImage} = props.item;
  return (
    <TouchableOpacity
    onPress = {() =>{
      props.onItemClicked && props.onItemClicked()
    }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderRadius: 4,
        borderColor: 'lightgray',
        borderWidth: 0.5,
      }}>
      <Image
        style={{width: 48, height: 48}}
        resizeMode="contain"
        source={{uri: productImage}}
      />
    </TouchableOpacity>
  );
};

const PremiumBlock = props => {
  const {
    itemCount,
    maxPrice,
    saved,
    deliveryCharges,
    couponDiscount,
    paybleAmount,
    coupons
  } = props;
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'column',
        backgroundColor: Colors.WHITE,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginTop: 20,
        marginBottom: 30,
      }}>
      <Text
        style={{
          color: Colors.CLR_14273E,
          fontWeight: 'bold',
          fontSize: 18,
        }}>
        Price Details
        <Text
          style={{
            color: Colors.CLR_2B415B,
            fontSize: 14,
            fontWeight: 'normal',
          }}>
          {`(${itemCount} ${itemCount > 0 ? 'Items' : 'Item'})`}
        </Text>
      </Text>
      <ItemValue title={'MRP.'} subtitle={`Rs. ${maxPrice}`} />
      <ItemValue title={'Discount.'} subtitle={`Rs. ${saved - (couponDiscount ? couponDiscount : 0)}`} />
      <ItemValue
        title={'Delivery Charges'}
        subtitle={deliveryCharges > 0 ? `Rs. ${deliveryCharges}` : 'Free'}
      />
      {coupons && coupons.length > 0 && (
        <ItemValue
          title={couponDiscount > 0 ? 'Coupon Discount Applied' : 'Coupon Discount'}
          subtitle={couponDiscount > 0 ? `Rs. ${couponDiscount}` : 'Apply Coupon'}
          subsClicked={() => {
            !couponDiscount && props.onApplyCouponPressed && props.onApplyCouponPressed();
          }}
        />
      )}
      <PayableBlock paybleAmount={paybleAmount} />
    </View>
  );
};

const ItemValue = props => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 12,
      }}>
      <Text style={{color: Colors.CLR_2B415B, fontSize: 14}}>
        {props.title}
      </Text>
      <Text
        onPress={() => {
          props.subsClicked();
        }}
        style={{
          color: props.subsClicked ? Colors.CLR_02A3FC : Colors.CLR_2B415B,
          fontSize: 14,
          fontWeight: props.subsClicked ? 'bold' : 'normal',
        }}>
        {props.subtitle}
      </Text>
    </View>
  );
};
const PayableBlock = props => {
  const {paybleAmount} = props;
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 12,
        paddingTop: 13.5,
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
      }}>
      <Text
        style={{color: Colors.CLR_2B415B, fontSize: 14, fontWeight: 'bold'}}>
        Amount Payable
      </Text>
      <Text
        style={{color: Colors.CLR_2B415B, fontSize: 14, fontWeight: 'bold'}}>
        {`Rs. ${paybleAmount}`}
      </Text>
    </View>
  );
};

const OrderSummaryFooter = props => {
  const {paybleAmount, saved} = props;
  return (
    <View
      style={{
        height: 62,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: Colors.CLR_2C3646,
      }}>
      <View
        style={{
          // backgroundColor: '#E1650B',
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
          {`Total Rs. ${paybleAmount}`}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: Colors.WHITE,
          }}>
          {`Saved Rs. ${saved}`}
        </Text>
      </View>
      <View
        style={{
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <RPButton
          fontSize={18}
          width="80%"
          height={43}
          backgroundColor={Colors.CLR_EE6F12}
          title={'Continue'}
          onPress={() => {
            props.onContinuePressed && props.onContinuePressed();
          }}
        />
      </View>
    </View>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  textStyle: {
    color: Colors.CLR_2B415B,
    fontSize: 15,
    fontWeight: '500',
    marginTop: 2,
  },
});
