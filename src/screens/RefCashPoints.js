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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppHeader from '../components/AppHeader';
import RPButton from '../components/RPButton';
import LinearGradient from 'react-native-linear-gradient';
import * as Colors from '../constants/ColorDefs';
import OffersOfTheDay from '../components/OffersOfTheDay';
import RPLoader from '../components/RPLoader';
import {RedeemModel, CongratesRedeemModel} from '../components/RPModels';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const copy = require('../../assets/minus_rect.png');
const rlogo_circle = require('../../assets/rlogo_circle.png');
const ref_points_header = require('../../assets/ref_points_header.png');
const ref_cash_header = require('../../assets/ref_cash_header.png');
import {
  pointHistory,
  redeemPoints,
  userDetails,
  cashHistory,
  topupPaymentProcess,
  topupPaymentSuccess,
  tncList,
} from '../apihelper/Api.js';
import {useIsFocused} from '@react-navigation/native';
import AppConfigData from '../constants/AppConfigData'
const AppData = AppConfigData()



const RefCashPoints = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [refAmount, setRefAmount] = useState(300);
  const [isLoading, setIsLoading] = useState(false);
  const [isCashSelected, setIsCashSelected] = useState(true);
  const [isPointsSelected, setIsPointsSelected] = useState(false);
  const [isRedeemPopVisible, setIsRedeemPopVisible] = useState(false);
  const [isCongratesVisible, setIsCongratesVisible] = useState(false);
  const [pointFaceValue, setPointFaceValue] = useState(1);
  const [userDetailsRes, setUserDetailsRes] = useState();
  const [pointHistoryTrasactions, setPointHistoryTrasactions] = useState();
  const [cashHistoryTrasactions, setCashHistoryTrasactions] = useState();

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
      setUserDetailsRes(userRes?.payload_userDetails);
      cashHistory(params, cashRes => {
        setCashHistoryTrasactions(cashRes?.payload_cashHistory);
        pointHistory(params, pointsRes => {
          setPointHistoryTrasactions(pointsRes?.payload_pointHistory);
          setIsLoading(false);
        });
      });
    });
  };

  const prepareParams = () => {
    const companyID = global.storeInfo && global.storeInfo.company_id;
    const storeID = global.storeInfo && global.storeInfo.id;
    const customerID = global.userInfo && global.userInfo.customer_id;
    const params = {
      store_id: storeID,
      company_id: companyID,
      customer_id: customerID,
      // points:userDetailsRes?.walletpoint
      points: 200,
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
        title={`${AppData.wallet_app_name} Wallet`}
        isLeftIconEnabeld={true}
        onLeftPress={() => {
          navigation.navigate('DashboardContainer');
        }}
      />
      {isLoading && <RPLoader />}
      <ScrollView bounces={false}>
        <LinearGradient
          colors={[Colors.CLR_0057FF, Colors.CLR_101ED9]}
          style={{
            width: '100%',
            alignItems: 'center',
            height: 223,
          }}>
          <View
            style={{
              width: '80%',
              justifyContent: 'space-between',
              flexDirection: 'row',
              height: 54,
              alignItems: 'center',
              marginTop: 30,
            }}>
            <TouchableOpacity
              style={{
                height: '100%',
                borderBottomWidth: 5,
                justifyContent: 'flex-end',
                borderBottomColor: isCashSelected
                  ? Colors.CLR_1ACFFF
                  : Colors.TRANS,
              }}
              onPress={() => {
                setIsCashSelected(true);
                setIsPointsSelected(false);
              }}>
              <Text
                style={{
                  fontSize: 17,
                  textAlign: 'left',
                  textAlignVertical: 'center',
                  color: Colors.WHITE,
                  fontWeight: 'bold',
                  opacity: isCashSelected ? 1 : 0.48,
                  marginBottom: 10,
                }}>
                YOUR CASH
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: '100%',
                borderBottomWidth: 5,
                justifyContent: 'flex-end',
                borderBottomColor: isPointsSelected
                  ? Colors.CLR_1ACFFF
                  : Colors.TRANS,
              }}
              onPress={() => {
                setIsCashSelected(false);
                setIsPointsSelected(true);
              }}>
              <Text
                style={{
                  fontSize: 17,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  color: Colors.WHITE,
                  fontWeight: 'bold',
                  opacity: isPointsSelected ? 1 : 0.48,
                  marginBottom: 10,
                }}>
                YOUR POINTS
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View
          style={{
            height: isCashSelected ? 180 : 270,
            width: '100%',
            width: '100%',
            alignItems: 'center',
            paddingHorizontal: 30,
            backgroundColor: Colors.WHITE,
          }}>
          <CardView
            title={
              isCashSelected
                ? `${AppData.wallet_app_name} Cash`
                : `${AppData.wallet_app_name} Points`
            }
            pointsTitle={
              isCashSelected ? 'Available Balance' : 'Available Points'
            }
            points={
              isCashSelected
                ? `Rs. ${userDetailsRes?.walletcash ? userDetailsRes?.walletcash : 0}`
                : `${userDetailsRes?.walletpoint}`
            }
            name={userDetailsRes?.name}
            bg={isCashSelected ? ref_cash_header : ref_points_header}
          />
          {isPointsSelected && (
            <TouchableOpacity
              onPress={() => {
                Alert.alert('', '1 Point = Re 1');
              }}
              style={{
                position: 'absolute',
                bottom: 100,
                width: '100%',
                alignItems: 'center',
                borderRadius: 4,
                borderColor: Colors.CLR_E3D7A1,
                backgroundColor: Colors.CLR_24524520492,
                height: 54,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 12, color: Colors.CLR_17264D}}>
                {`Your ${AppData.wallet_app_name} Points are worth of Rs. ${
                  pointFaceValue * userDetailsRes?.walletpoint || 0
                }`}
              </Text>
              <Icon
                name={'information-outline'}
                size={15}
                color={Colors.CLR_355ADB}
                style={{position: 'absolute', right: 10}}
              />
            </TouchableOpacity>
          )}
          <View
            style={{
              position: 'absolute',
              bottom: 20,
              width: '100%',
              alignItems: 'center',
            }}>
            <RPButton
              width={'80%'}
              fontSize={20}
              height={54}
              title={isCashSelected ? 'Add Money' : 'Redeem Now'}
              backgroundColor={Colors.CLR_EE6F12}
              titleColor={Colors.WHITE}
              onPress={() => {
                if (isPointsSelected) {
                  if (userDetailsRes?.walletpoint) {
                    setIsRedeemPopVisible(true);
                  } else {
                    Alert.alert(
                      AppData.title_alert,
                      'You don’t have sufficient points to redeem.',
                    );
                  }
                } else {
                  navigation.navigate('AddMoney', {
                    userDetailsRes: userDetailsRes,
                    amount: 500,
                  });
                }
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            width: '100%',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginVertical: 10,
            paddingVertical: 30,
            backgroundColor: Colors.WHITE,
          }}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
            }}>
            <Text
              style={{fontWeight: 'bold', fontSize: 17, color: Colors.BLACK}}>
              Transaction History
            </Text>
          </View>
          {isCashSelected && cashHistoryTrasactions?.length > 0 && (
            <>
              <TransactionHeader />
              <FlatList
                style={{
                  width: '100%',
                  marginTop: 10,
                  paddingBottom: 10,
                  paddingHorizontal: 10,
                }}
                keyExtractor={(item, index) => 'key_' + index}
                ItemSeparatorComponent={() => (
                  <View style={{height: 10, backgroundColor: Colors.TRANS}} />
                )}
                data={
                  isCashSelected
                    ? cashHistoryTrasactions
                    : pointHistoryTrasactions
                }
                renderItem={({item}) => <TransactionCard item={item} />}
              />
            </>
          )}
          {isPointsSelected && pointHistoryTrasactions?.length > 0 && (
            <>
              <TransactionHeader />
              <FlatList
                style={{
                  width: '100%',
                  marginTop: 10,
                  paddingBottom: 10,
                  paddingHorizontal: 10,
                }}
                keyExtractor={(item, index) => 'key_' + index}
                ItemSeparatorComponent={() => (
                  <View style={{height: 10, backgroundColor: Colors.TRANS}} />
                )}
                data={
                  isCashSelected
                    ? cashHistoryTrasactions
                    : pointHistoryTrasactions
                }
                renderItem={({item}) => <TransactionCard item={item} />}
              />
            </>
          )}
        </View>
        {global.promos && global.promos.length > 0 && (
          <OffersOfTheDay
            title={isCashSelected ? 'Special Offers' : 'Refer & Earn'}
            data={global.promos}
            marginHorizontal={0}
            backgroundColor={Colors.WHITE}
            onOfferOfTheDaySelected={item => {
            }}
          />
        )}
        <View
          style={{
            backgroundColor: Colors.WHITE,
            width: '100%',
            paddingHorizontal: 20,
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 17, color: Colors.BLACK}}>
            FAQ/T&C
          </Text>
          <FlatList
            style={{width: '100%', marginTop: 15, paddingBottom: 10}}
            keyExtractor={(item, index) => 'key_' + index}
            ItemSeparatorComponent={() => (
              <View style={{height: 10, backgroundColor: Colors.TRANS}} />
            )}
            data={[
              {title: `Frequently Asked Questions`, id: 1},
              {title: 'Terms & Conditions', id: 2},
            ]}
            renderItem={({item}) => (
              <FAQCard
                item={item}
                onSelectClick={() => {
                  if (item.id == 1) {
                    navigation.navigate('FrequentlyAsked', {
                      isFromWallet: true,
                    });
                  } else {
                    global.term_wallet &&
                      navigation.navigate('RPWebpage', {
                        pageUrl: global.term_wallet,
                      });
                  }
                }}
              />
            )}
          />
        </View>
      </ScrollView>
      {isRedeemPopVisible && (
        <RedeemModel
          pointFaceValue={pointFaceValue}
          walletpoint={userDetailsRes?.walletpoint}
          onCancelClicked={() => {
            setIsRedeemPopVisible(false);
          }}
          onContinueClicked={() => {
            setIsLoading(true);
            setIsRedeemPopVisible(false);
            const params = prepareParams();
            setIsLoading(false);
            redeemPoints(params, redeemRes => {
              if (redeemRes?.status == 1) {
                setIsCongratesVisible(true);
              }
            });
          }}
        />
      )}
      {isCongratesVisible && (
        <CongratesRedeemModel
          pointFaceValue={pointFaceValue}
          walletpoint={userDetailsRes?.walletpoint}
          onClose={() => {
            setIsCongratesVisible(false);
          }}
          onCheckBalance={() => {
            setIsCongratesVisible(false);
            updateData();
          }}
        />
      )}
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

const TransactionHeader = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 35,
        alignItems: 'center',
        backgroundColor: Colors.CLR_20020020027,
        marginTop: 20,
        paddingHorizontal: 10,
      }}>
      <View style={{flex: 1.8, flexDirection: 'column'}}>
        <Text
          style={{
            fontSize: 14,
            textAlign: 'left',
            color: Colors.CLR_17264D,
          }}>
          Descriptions
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 12,
            textAlign: 'left',
            fontSize: 14,
            color: Colors.CLR_17264D,
          }}>
          Credit
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 14,
            textAlign: 'left',
            color: Colors.CLR_17264D,
          }}>
          Debit
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 14,
            textAlign: 'left',
            color: Colors.CLR_17264D,
          }}>
          Balance
        </Text>
      </View>
    </View>
  );
};

const TransactionCard = props => {
  const {item} = props;

  const {
    description = '',
    credit = 0,
    debit = 0,
    balance = 0,
    date = '',
    type = '',
    money_type = '',
    transid = 'TRANS1234',
  } = props.item;

  return (
    <View style={{backgroundColor: Colors.WHITE, flexDirection: 'row'}}>
      <View style={{flex: 1.8, flexDirection: 'column'}}>
        <Text
          style={{
            fontSize: 11,
            textAlign: 'left',
            textAlignVertical: 'center',
            color: Colors.CLR_777976,
          }}>
          {date}
        </Text>
        <Text
          style={{
            fontSize: 12,
            marginTop: 5,
            textAlign: 'left',
            fontWeight: 'bold',
            textAlignVertical: 'center',
            color: Colors.BLACK,
          }}>
          {description}
        </Text>
        <Text
          style={{
            fontSize: 11,
            marginTop: 5,
            textAlign: 'left',
            textAlignVertical: 'center',
            color: Colors.CLR_777976,
          }}>
          {transid}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 12,
            textAlign: 'left',
            textAlignVertical: 'center',
            color: Colors.CLR_409F12,
          }}>
          {`Rs. ${credit}`}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 12,
            textAlign: 'left',
            textAlignVertical: 'center',
            color: Colors.CLR_17264D,
          }}>
          {`Rs. ${debit}`}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 12,
            textAlign: 'left',
            fontWeight: 'bold',
            textAlignVertical: 'center',
            color: Colors.CLR_17264D,
          }}>
          {`Rs. ${balance}`}
        </Text>
      </View>
    </View>
  );
};

const CardView = props => {
  const {
    title = '',
    pointsTitle = '',
    points = '',
    name = 'User',
    bg = undefined,
  } = props;
  return (
    <ImageBackground
      source={bg}
      resizeMode="cover"
      style={{
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: Colors.GRAY,
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowRadius: 10,
        shadowOpacity: 0.5,
        position: 'absolute',
        top: -100,
        width: '100%',
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          paddingVertical: 30,
          paddingLeft: 30,
          paddingRight: 20,
        }}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'left',
              fontWeight: 'bold',
              textAlignVertical: 'center',
              color: Colors.WHITE,
            }}>
            {title}
          </Text>
          <Text
            style={{
              marginTop: 20,
              fontSize: 13,
              textAlign: 'left',
              textAlignVertical: 'center',
              color: Colors.WHITE,
            }}>
            {pointsTitle}
          </Text>
          <Text
            style={{
              fontSize: 30,
              textAlign: 'left',
              fontWeight: 'bold',
              textAlignVertical: 'center',
              color: Colors.WHITE,
            }}>
            {points}
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 25,
              textAlign: 'left',
              fontWeight: 'bold',
              textAlignVertical: 'center',
              color: Colors.WHITE,
            }}>
            {name}
          </Text>
          {AppData.isBrandLogoNeeded && (
            <Image
              resizeMode="contain"
              style={{
                width: 28,
                height: 28,
                borderRadius: 25,
                position: 'absolute',
                right: 0,
                bottom: 0,
              }}
              source={rlogo_circle}
            />
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default RefCashPoints;
