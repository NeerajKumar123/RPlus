import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RPInput from '../components/RPInput';
import AppHeader from '../components/AppHeader';
import RPButton from '../components/RPButton';
import LinearGradient from 'react-native-linear-gradient';
import * as Colors from '../constants/ColorDefs';
import RefsOffrers from '../components/RefsOffrers';
import RPLoader from '../components/RPLoader';
import {
  topupOffer,
  topupPaymentProcess,
  topupPaymentSuccess,
} from '../apihelper/Api.js';
import RazorpayCheckout from 'react-native-razorpay';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const copy = require('../../assets/minus_rect.png');
const ref_points_header = require('../../assets/ref_points_header.png');
const ref_cash_header = require('../../assets/ref_cash_header.png');
const car_circular_loader = require('../../assets/car_circular_loader.json');
import Lottie from 'lottie-react-native';
import AppConfigData from '../constants/AppConfigData'

const AddMoney = props => {
  const AppData = AppConfigData()

  const navigation = useNavigation();
  const {userDetailsRes, amount = 0} = props?.route?.params;
  const [selectedAmount, setSelectedAmount] = useState(amount);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingMoney, setIsAddingMoney] = useState(false);
  const [topupOfferRes, setTopupOfferRes] = useState();

  const [trasactions, setTrasactions] = useState([
    '500',
    '1000',
    '1500',
    '2000',
    '2500',
    '3000',
  ]);

  useEffect(() => {
    const companyID = global.storeInfo && global.storeInfo.company_id;
    const storeID = global.storeInfo && global.storeInfo.id;
    const customerID = global.userInfo && global.userInfo.customer_id;
    const params = {
      store_id: storeID,
      company_id: companyID,
      customer_id: customerID,
    };
    setIsLoading(true);
    topupOffer(params, topRes => {
      setTopupOfferRes(topRes?.payload_topupOffer);
      setIsLoading(false);
    });
  }, []);

  const prepareParams = () => {
    const companyID = global.storeInfo && global.storeInfo.company_id;
    const storeID = global.storeInfo && global.storeInfo.id;
    const customerID = global.userInfo && global.userInfo.customer_id;
    const params = {
      company_id: companyID,
      store_id: storeID,
      customer_id: customerID,
      amount: selectedAmount,
      paymentmode: 'online',
    };
    return params;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.CLR_DEE0E3,
        paddingBottom: 30,
      }}>
      <AppHeader
        title="Add Cash"
        isLeftIconEnabeld={true}
        onLeftPress={() => {
          navigation.goBack();
        }}
      />
      {isLoading && <RPLoader />}
      <ScrollView bounces={false}>
        <LinearGradient
          colors={[Colors.CLR_0057FF, Colors.CLR_101ED9]}
          style={{
            width: '100%',
            alignItems: 'center',
            height: 300,
          }}>
          <View
            style={{
              width: '100%',
              marginTop: 30,
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                fontSize: 12,
                textAlign: 'left',
                textAlignVertical: 'center',
                color: Colors.WHITE,
              }}>
              {`Available ${AppData.wallet_app_name} Cash`}
            </Text>
            <Text
              style={{
                fontSize: 28,
                textAlign: 'left',
                color: Colors.WHITE,
                fontWeight: 'bold',
                marginTop: 2,
              }}>
              {`Rs. ${userDetailsRes?.walletcash || 0}`}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              marginTop: 30,
              paddingHorizontal: 20,
            }}>
            <RPInput
              leftText={'Rs. '}
              borderColor={Colors.CLR_0065FF}
              value={selectedAmount}
              autoCompleteType="off"
              maxLength={10}
              keyboardType="number-pad"
              autoCorrect={false}
              textContentType="none"
              placeholder="Enter amount"
              onChangeText={value => {
                console.log('onChangeText', value);
              }}
              onEndEditing={value => {
              }}
            />
          </View>
        </LinearGradient>
        <View
          style={{
            flex: 1,
            width: '100%',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
            height: 250,
          }}>
          <AmountTagsView
            amountTags={trasactions}
            isAdding={isAddingMoney}
            selectedAmount={selectedAmount}
            onAmoutSelected={amount => {
              setSelectedAmount(amount);
            }}
            addMoneyClicked={() => {
              const params = prepareParams();
              setIsAddingMoney(true);
              topupPaymentProcess(params, processRes => {
                setIsAddingMoney(false);
                if (
                  processRes.status != -1 &&
                  processRes?.payload_topupPaymentProcess
                ) {
                  const {
                    order_date,
                    order_id,
                  } = processRes.payload_topupPaymentProcess;
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
                    key:  payKey,
                    amount: selectedAmount,
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
                      // handle success
                      const companyID =
                        global.storeInfo && global.storeInfo.company_id;
                      const storeID = global.storeInfo && global.storeInfo.id;
                      const customerID =
                        global.userInfo && global.userInfo.customer_id;
                      const params = {
                        company_id: companyID,
                        store_id: storeID,
                        customer_id: customerID,
                        transection_id: data.razorpay_payment_id,
                        order_id: order_id,
                      };
                      topupPaymentSuccess(params, res => {
                        console.log('res', res);
                        navigation.goBack();
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
            }}
          />
        </View>
        {topupOfferRes && topupOfferRes.length > 0 && (
          <RefsOffrers
            title={'Add more & earn CashBack'}
            data={topupOfferRes}
            marginHorizontal={0}
            backgroundColor={Colors.WHITE}
            onOfferOfTheDaySelected={item => {
              console.log('Special Offers clicked');
            }}
          />
        )}
      </ScrollView>
    </View>
  );
};

const FAQCard = props => {
  const {onSelectClick, item} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        onSelectClick();
      }}
      style={{
        flexDirection: 'row',
        height: 53,
        paddingLeft: 30,
        paddingRight: 24,
        alignItems: 'center',
        backgroundColor: Colors.CLR_ECECEC,
        borderRadius: 4,
      }}>
      <Text style={{fontSize: 14, color: Colors.CLR_17264D}}>{item.title}</Text>
      <Icon
        name={'chevron-right'}
        size={25}
        color={Colors.CLR_355ADB}
        style={{position: 'absolute', right: 24}}
      />
    </TouchableOpacity>
  );
};

const AmountTagsView = props => {
  const {amountTags, selectedAmount, onAmoutSelected, addMoneyClicked} = props;

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        shadowColor: Colors.GRAY,
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowRadius: 10,
        shadowOpacity: 0.5,
        backgroundColor: Colors.WHITE,
        width: '100%',
        position: 'absolute',
        top: -100,
        paddingVertical: 30,
        paddingHorizontal: 10,
      }}>
      <Text
        style={{
          fontSize: 15,
          textAlign: 'left',
          fontWeight: 'bold',
          width: '100%',
          paddingHorizontal: 20,
          color: Colors.BLACK,
        }}>
        Popular Top-up
      </Text>
      <FlatList
        style={{width: '100%', marginTop: 15}}
        keyExtractor={(item, index) => 'key_' + index}
        numColumns={3}
        data={amountTags}
        scrollEnabled={false}
        horizontal={false}
        ItemSeparatorComponent={() => {
          return <View style={{width: '100%', height: 10}} />;
        }}
        renderItem={({item, index}) => (
          <AmountTagButton
            index={index}
            isSelected={item == selectedAmount}
            item={item}
            onSelectClick={() => {
              onAmoutSelected(item);
            }}
          />
        )}
      />
      {props.isAdding ? (
        <Lottie
          style={{
            marginTop: 10,
            width: 40,
            height: 40,
          }}
          autoPlay
          loop
          source={car_circular_loader}
        />
      ) : (
        <RPButton
          width={'80%'}
          fontSize={20}
          height={54}
          marginTop={30}
          title={'Add Money'}
          backgroundColor={Colors.CLR_EE6F12}
          titleColor={Colors.WHITE}
          onPress={() => {
            addMoneyClicked();
          }}
        />
      )}
    </View>
  );
};
const AmountTagButton = props => {
  const {onSelectClick, item, index, isSelected} = props;
  const {width} = Dimensions.get('window');
  return (
    <TouchableOpacity
      onPress={() => {
        onSelectClick();
      }}
      style={{
        height: 53,
        width: (width - 80) / 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        borderWidth: isSelected ? 2 : 1,
        borderColor: isSelected ? Colors.CLR_0936E9 : Colors.CLR_A6A6A6,
        marginHorizontal: index == 1 || index == 4 ? 10 : 0,
        backgroundColor: Colors.WHITE,
      }}>
      <Text
        style={{fontSize: 14, color: Colors.CLR_71788C}}>{`Rs.${item}`}</Text>
    </TouchableOpacity>
  );
};

export default AddMoney;
