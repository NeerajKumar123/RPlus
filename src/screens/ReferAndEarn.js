import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Share,
  Alert,
  ScrollView,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {useNavigation} from '@react-navigation/native';
import AppHeader from '../components/AppHeader';
import RPButton from '../components/RPButton';
import RPLoader from '../components/RPLoader';
import * as Colors from '../constants/ColorDefs';
import {getReferralCode, checkReferralCode} from '../apihelper/Api.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppConfigData from '../constants/AppConfigData'

const copy = require('../../assets/copy.png');
const ref_earn_header = require('../../assets/ref_earn_header.png');
const search_icon = require('../../assets/search_icon.png');

const ReferAndEarn = props => {
  const AppData = AppConfigData()
  const navigation = useNavigation();
  const [refAmount, setRefAmount] = useState(100);
  const [refCode, setRefCode] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const companyID = global.storeInfo && global.storeInfo.company_id;
    const storeID = global.storeInfo && global.storeInfo.id;
    const customerID = global.userInfo && global.userInfo.customer_id;
    setIsLoading(true);
    const params = {
      store_id: storeID,
      company_id: companyID,
      customer_id: customerID,
    };
    getReferralCode(params, refRes => {
      setRefCode(refRes?.payload_getReferralCode?.ReferralCode);
      setIsLoading(false);
      checkRefCode();
    });
  }, []);

  const checkRefCode = () => {
    const companyID = global.storeInfo && global.storeInfo.company_id;
    const storeID = global.storeInfo && global.storeInfo.id;
    const customerID = global.userInfo && global.userInfo.customer_id;
    const params = {
      store_id: storeID,
      company_id: companyID,
      customer_id: customerID,
      referral_code: refCode,
      order_value: 1000,
    };
    checkReferralCode(params, refCodeRes => {
    });
  };

  const onShare = async () => {
    const shortUrl =  AppData?.appStoreURL
    try {
      const result = await Share.share({
        message: `Hey! one less thing for you to worry about. I use ${AppData.wallet_app_name} Store regularly to order my daily groceries, It's a super convenient and extremely reliable service. They have everything we need for daily household use. Try it out now !
        Use my code ${refCode} as coupon code on checkout and save flat ₹ ${refAmount} on your first order at ${AppData.wallet_app_name} Store
        Download the App Now!!
        ${shortUrl}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(AppData.title_alert, error.message);
    }
  };

  return (
    <View
    bounces = {false}
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}>
      <AppHeader
        title="Refer and Earn"
        isLeftIconEnabeld={true}
        onLeftPress={() => {
          navigation.navigate('DashboardContainer');
        }}
      />
      <ScrollView>
      {isLoading && <RPLoader />}
      <View
        style={{
          flex: 1.5,
          width: '100%',
          backgroundColor: Colors.CLR_17264D,
          paddingHorizontal: 26,
        }}>
        <Image
          resizeMode="contain"
          style={{width: '100%'}}
          source={ref_earn_header}
        />
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            textAlignVertical: 'center',
            color: Colors.WHITE,
            fontWeight: 'bold',
            lineHeight: 23,
          }}>
          {`Invite your friends to shop on\n`}
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              textAlignVertical: 'center',
              color: Colors.CLR_EE6F12,
              fontWeight: 'bold',
            }}>
            Honey Money Store
          </Text>
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
        <AmountAndCodeView
          refCode={refCode}
          onCodeCopied={code => {
            Clipboard.setString(code);
          }}
          onSendInviteClicked={() => {
            onShare();
          }}
          onHowItWorksClicked = {() =>{
            navigation.navigate('HowItWorks')
          }}
        />
      </View>
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
                  if(item.id == 1){
                    navigation.navigate('FrequentlyAsked',{isFromWallet:true})
                  }else{
                    global.term_wallet && navigation.navigate('RPWebpage', {pageUrl: global.term_wallet});
                  }
                }}
              />
            )}
          />
        </View>
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

const AmountAndCodeView = props => {
  const {
    refCode,
    amount = 100,
    onSendInviteClicked,
    onCodeCopied,
    onHowItWorksClicked,
  } = props;
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
        marginTop:-100,
        paddingVertical: 30,
      }}>
      <Text
        style={{
          fontSize: 26,
          textAlign: 'left',
          textAlignVertical: 'center',
          color: Colors.BLACK,
        }}>
        {`Refer & Earn`}
        <Text
          style={{
            fontSize: 24,
            textAlign: 'left',
            textAlignVertical: 'center',
            color: Colors.BLACK,
            fontWeight: 'bold',
          }}>
          {` Rs.${amount}`}
        </Text>
      </Text>
      <Text
        style={{
          fontSize: 17,
          marginTop: 7,
          textAlign: 'center',
          textAlignVertical: 'center',
          color: Colors.CLR_41517B,
          width: '80%',
        }}>
                {`When your friends buy using your refferal code, they get Rs.100 & you
        get Rs. 100.`}
      </Text>
      {refCode && (
        <View
          style={{
            borderRadius: 4,
            borderStyle: 'dashed',
            borderColor: Colors.GREEN,
            borderWidth: 1,
            width: '80%',
            flexDirection: 'row',
            paddingHorizontal: 30,
            marginTop: 23,
            paddingVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 24,
              textAlign: 'left',
              textAlignVertical: 'center',
              color: Colors.CLR_0D9B4A,
              fontWeight: 'bold',
              marginRight: 30,
            }}>
            {refCode}
          </Text>
          <TouchableOpacity
            onPress={() => {
              onCodeCopied(refCode);
            }}>
            <Image
              resizeMode="stretch"
              style={{width: 25, height: 25}}
              source={copy}
            />
          </TouchableOpacity>
        </View>
      )}
      <RPButton
        width={'80%'}
        marginTop={33}
        fontSize={20}
        height={54}
        title={'Send Invite'}
        backgroundColor={Colors.CLR_EE6F12}
        titleColor={Colors.WHITE}
        onPress={() => {
          onSendInviteClicked();
        }}
      />
      <View style = {{width:'80%', flexDirection:'row',marginTop: 20,justifyContent:'center',alignItems:'center'}}> 
      <TouchableOpacity
        onPress={() => {
          onHowItWorksClicked();
        }}>
        <Text
          style={{
            fontSize: 17,
            fontWeight:'bold',
            textAlign: 'left',
            textAlignVertical: 'center',
            color: Colors.CLR_0376FC
          }}>
          How it works?
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReferAndEarn;
