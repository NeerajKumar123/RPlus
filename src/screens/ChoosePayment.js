import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppHeader from '../components/AppHeader';
import RPButton from '../components/RPButton';
import * as Colors from '../constants/ColorDefs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  cashonDelivery,
  onlinePaymentProcess,
  onlinePaymentSuccess,
  userDetails,
  walletTransection,
  topupPaymentSuccess,
  topupPaymentProcess,
} from '../apihelper/Api';
import RazorpayCheckout from 'react-native-razorpay';
const phone_icon = require('../../assets/phone_icon.png');
const notif_icon = require('../../assets/notif_icon.png');
const atta = require('../../assets/atta.png');
const car_circular_loader = require('../../assets/car_circular_loader.json');
import Lottie from 'lottie-react-native';
import {useIsFocused} from '@react-navigation/native';
import AppConfigData from '../constants/AppConfigData'

const ChoosePayment = props => {
  const AppData = AppConfigData()
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const details = props?.route?.params;
  const companyID = global.storeInfo && global.storeInfo.company_id;
  const storeID = global.storeInfo && global.storeInfo.id;
  const customerID = global.userInfo && global.userInfo.customer_id;
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlacedFailedCount, setOrderPlacedFailedCount] = useState(0);
  const [walletCash, setWalletCash] = useState(0);
  const [userDetailsRes, setUserDetailsRes] = useState();

  const paymentModes = [
    {displayName: 'Cash on Delivery', name: 'cash', paymentModeID: 1},
    {
      displayName: 'Others UPI IDs/Net Banking',
      name: 'online',
      paymentModeID: 2,
    },
    {displayName: 'Wallet', name: 'wallet', paymentModeID: 3},
  ];
  const [paymentMode, setPaymentMode] = useState(paymentModes[0]);

  const openLink = (link, linkType) => {
    console.log('link', link, linkType);
    let finalLink = link;
    if (linkType == 1) {
      // mail
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
      console.log('adda');
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

  useEffect(() => {
    updateData();
  }, [isFocused]);
  const updateData = () => {
    const companyID = global.storeInfo && global.storeInfo.company_id;
    const storeID = global.storeInfo && global.storeInfo.id;
    const customerID = global.userInfo && global.userInfo.customer_id;
    setIsLoading(true);
    const params = {
      store_id: storeID,
      company_id: companyID,
      customer_id: customerID,
    };
    userDetails(params, userRes => {
      setIsLoading(false);
      console.log('userRes', userRes, userRes?.payload_userDetails?.walletcash);
      setUserDetailsRes(userRes);
      setWalletCash(userRes?.payload_userDetails?.walletcash);
    });
  };

  const prepareParamsAddMoney = () => {
    const companyID = global.storeInfo && global.storeInfo.company_id;
    const storeID = global.storeInfo && global.storeInfo.id;
    const customerID = global.userInfo && global.userInfo.customer_id;
    const params = {
      company_id: companyID,
      store_id: storeID,
      customer_id: customerID,
      amount: details?.paybleAmount - walletCash,
      paymentmode: 'online',
    };
    return params;
  };

  const prepareCommonParams = () => {
    const tsving = details?.discount - (details?.coupon ? details?.coupon?.coupon_value : 0)
    const params = {
      company_id: companyID,
      store_id: storeID,
      customer_id: customerID,
      address_id: details?.deliveryAddress?.address_id ?? 0,
      slot_id: details?.deliveryTimeSlot?.slot_id ?? 0,
      slot_date: details?.deliveryDateSlot?.date ?? '',
      total_paid_amount: details?.paybleAmount ?? 0,
      total_saving: tsving,
      deliveryCharge: details?.deliveryCharge ?? 0,
      couponcode: details?.coupon?.coupon_code ?? '',
      couponValue: details?.coupon?.coupon_value ?? 0,
      paymentmode: paymentMode.name,
      cart_id: details?.cartIDs ?? '',
      plateform:'iOS'
    };
    return params;
  };
  const initiateAddMoney = () => {
    const params = prepareParamsAddMoney();
    setIsLoading(true)
    topupPaymentProcess(params, processRes => {
      setIsLoading(false)
      if (processRes.status != -1 && processRes?.payload_topupPaymentProcess) {
        const {order_date, order_id} = processRes.payload_topupPaymentProcess;
        const store_name = global.storeInfo && global.storeInfo.store_name;
        let payKey = ''
        if(store_name == "HONEY MONEY TOP"){
          payKey = 'rzp_live_V6l7WnPe1dfl6E'
        }else{
          payKey = 'rzp_live_7NXmXoE72iTqIo'
        }
        var options = {
          description: `Add Money towards ${global.storeInfo.store_name}`,
          currency: 'INR',
          key: payKey,
          amount: details?.paybleAmount - walletCash,
          name: AppData.wallet_app_name,
          order_id: order_id, //Replace this with an order_id created using Orders API.
          prefill: {
            email: global.userInfo.email,
            contact: global.userInfo.contact,
            name: global.userInfo.name,
          },
          theme: {color: Colors.CLR_E88219},
        };
        RazorpayCheckout.open(options)
          .then(data => {
            console.log('data', data);
            // handle success
            const companyID = global.storeInfo && global.storeInfo.company_id;
            const storeID = global.storeInfo && global.storeInfo.id;
            const customerID = global.userInfo && global.userInfo.customer_id;
            const params = {
              company_id: companyID,
              store_id: storeID,
              customer_id: customerID,
              transection_id: data.razorpay_payment_id,
              order_id: order_id,
            };
            topupPaymentSuccess(params, res => {
              console.log('topupPaymentSuccess', res,params);
            });
          })
          .catch(error => {
            console.log('error', error);
            // handle failure
            Alert.alert(
              AppData.title_alert,
              error?.description
                ? error?.description
                : 'Facing some technical glich while ordering , Dont worry, Please try with another payment options available.',
            );
          });
      }
    });
  };

  const doWalletTrasaction = () => {
    const params = {
      ...prepareCommonParams(),
      referral_code: '',
      main_user_get: 0,
      referred_user_get: 0,
      plateform:'iOS'
    };
    walletTransection(params, walletTransRes => {
      console.log('walletTransection', walletTransRes);
    });
  };
  const doPayment = () => {
    const params = prepareCommonParams();
    if (paymentMode.paymentModeID == 2) {
      onlinePaymentProcess(params, res => {
        setIsLoading(false);
        if (res.status != -1) {
          const store_name = global.storeInfo && global.storeInfo.store_name;
          let payKey = ''
          if(store_name == "HONEY MONEY TOP"){
            payKey = 'rzp_live_V6l7WnPe1dfl6E'
          }else{
            payKey = 'rzp_live_7NXmXoE72iTqIo'
          }
          var options = {
            description: `Credits towards ${global.storeInfo.store_name}`,
            currency: 'INR',
            key: payKey,
            amount: details?.paybleAmount ?? 0,
            name: AppData.wallet_app_name,
            order_id: res.payload_onlinePaymentProcess?.order_id, //Replace this with an order_id created using Orders API.
            prefill: {
              email: global.userInfo.email,
              contact: global.userInfo.contact,
              name: global.userInfo.name,
            },
            theme: {color: Colors.CLR_E88219},
          };
          console.log('options', JSON.stringify(options))
          RazorpayCheckout.open(options)
            .then(data => {
              // handle success
              const params = {
                company_id: companyID,
                store_id: storeID,
                customer_id: customerID,
                transection_id: data.razorpay_payment_id,
                order_id: res.payload_onlinePaymentProcess?.order_id,
                cart_id: details?.cartIDs ?? '',
                plateform:'iOS'
              };
              onlinePaymentSuccess(params, res => {
                if (res && res.status != 1) {
                  navigation.navigate('Thanks', {
                    ...res?.payload_onlinePaymentProcess,
                  });
                } else {
                  Alert.alert(
                    AppData.title_alert,
                    'Facing some technical glich while ordering , Dont worry we statred working on your refund.',
                  );
                }
              });
            })
            .catch(error => {
              console.log('error', error);
              // handle failure
              if (error && error.code != 2) {
                Alert.alert(
                  AppData.title_alert,
                  'Facing some technical glich while ordering , Dont worry, Please try with another payment options available.',
                );
              }
            });
        }
      });
    } else {
      cashonDelivery(params, res => {
        setIsLoading(false);
        const isSuccess = res?.payload_cashOnDelivery ?? false;
        if (isSuccess) {
          navigation.navigate('Thanks', {...res?.payload_cashOnDelivery});
        } else {
          setOrderPlacedFailedCount(orderPlacedFailedCount + 1);
          Alert.alert(
            AppData.title_alert,
            'Facing some technical glich while ordering , Pls try again later',
          );
        }
      });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.CLR_E7ECF2}}>
      <AppHeader
        title="Payment"
        isLeftIconEnabeld={true}
        isExtendedHeader={true}
        isCheckoutStep={true}
        progressIndex={2}
        phone_icon
        onLeftPress={() => {
          navigation.goBack();
        }}
        rightIcons={
          orderPlacedFailedCount > 0
            ? [
                {
                  iconSource: phone_icon,
                  color: Colors.CLR_5F259F,
                  onPress: () => {
                    openLink('9650861174', 2);
                  },
                },
              ]
            : []
        }
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Colors.CLR_E7ECF2,
        }}>
        <PaymentModeBlock
          paymentMode={paymentMode}
          paymentModes={paymentModes}
          cash={walletCash}
          details={details}
          onPaymentModeSelected={item => {
            setPaymentMode(item);
          }}
        />
        <PremiumBlock details={details} />
      </ScrollView>
      <OrderSummaryFooter
        details={details}
        isLoading={isLoading}
        onContinuePressed={() => {
          if (paymentMode.paymentModeID == 3) {
            if (walletCash > details?.paybleAmount) {
              doWalletTrasaction();
            } else {
              const options = [
                {
                  text: 'Cancel',
                  onPress: () => {
                    console.log('Cancel');
                  },
                },
                {
                  text: 'Add Money',
                  onPress: () => {
                    initiateAddMoney();
                  },
                },
              ];
              Alert.alert(
                AppData.title_alert,
                'Seems you have less amount in your wallet, Please add amount to the wallet first.',
                options,
              );
            }
          } else {
            setIsLoading(true);
            doPayment();
          }
        }}
      />
    </View>
  );
};

const PaymentModeBlock = props => {
  const {paymentModes, paymentMode} = props;
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
        Add a payment method
      </Text>
      {paymentModes && (
        <FlatList
          style={{width: '100%', marginTop: 12}}
          horizontal={false}
          keyExtractor={(item, index) => 'key_' + index}
          ItemSeparatorComponent={() => (
            <View style={{height: 10, width: '100%'}} />
          )}
          data={paymentModes}
          renderItem={({item}) => (
            <PaymentTypeCard
              item={item}
              cash={props.cash}
              paymentMode={paymentMode}
              onPaymentModeSelected={() => {
                props.onPaymentModeSelected &&
                  props.onPaymentModeSelected(item);
              }}
            />
          )}
        />
      )}
    </View>
  );
};
const PaymentTypeCard = props => {
  const {paymentMode, item} = props;
  const isSelected = paymentMode
    ? paymentMode.paymentModeID == item.paymentModeID
    : false;
  return (
    <TouchableOpacity
      onPress={() => {
        props.onPaymentModeSelected && props.onPaymentModeSelected();
      }}
      style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 5}}>
      <Icon
        name={isSelected ? 'radiobox-marked' : 'radiobox-blank'}
        size={20}
        color={Colors.CLR_02A3FC}
      />
      <Text style={{marginLeft: 5, fontSize: 14, color: Colors.CLR_49537D}}>
        {item.displayName}
      </Text>
      {item.paymentModeID == 3 && (
        <Text
          style={{
            marginLeft: 5,
            fontSize: 18,
            fontWeight: 'bold',
            color: Colors.CLR_03C47E,
            position: 'absolute',
            right: 20,
          }}>
          {props.cash ? `Rs. ${props.cash}` : `Rs. 0`}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const PremiumBlock = props => {
  const {details} = props;
  const {
    maxPrice,
    discount,
    deliveryCharge,
    couponDiscount,
    paybleAmount,
    cartItemsCount,
  } = details;

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
          {`( ${cartItemsCount} Items )`}
        </Text>
      </Text>
      <ItemValue title={'MRP.'} subtitle={`Rs. ${maxPrice}`} />
      <ItemValue title={'Discount.'} subtitle={`Rs. ${discount}`} />
      <ItemValue
        title={'Delivery Charges'}
        subtitle={deliveryCharge > 0 ? `Rs. ${deliveryCharge}` : 'Free'}
      />
      {couponDiscount > 0 && (
        <ItemValue
          title={'Coupon Discount'}
          subtitle={`Rs. ${couponDiscount}`}
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
  const {paybleAmount, discount} = props.details;
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
          {`Saved Rs. ${discount}`}
        </Text>
      </View>
      <View
        style={{
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {console.log( props.isLoading )}
        {props.isLoading ? (
          <Lottie
            style={{
              width: 40,
              height: 40,
            }}
            autoPlay
            loop
            source={car_circular_loader}
          />
        ) : (
          <RPButton
            fontSize={18}
            width="80%"
            height={43}
            backgroundColor={Colors.CLR_EE6F12}
            title={'Pay Now'}
            onPress={() => {
              props.onContinuePressed && props.onContinuePressed();
            }}
          />
        )}
      </View>
    </View>
  );
};

export default ChoosePayment;
