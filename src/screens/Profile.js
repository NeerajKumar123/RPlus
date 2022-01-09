import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import AppHeader from '../components/AppHeader';
import RPLoader from '../components/RPLoader';
import {UnderLinedInput} from '../components/RPInput';
import {VerifyMobileEmail} from '../components/RPModels';
import {useNavigation} from '@react-navigation/native';
import * as Colors from '../constants/ColorDefs';
import * as Storage from '../helpers/RPStorage';
import {RP_REGEX} from '../constants/StaticValues';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {sentOTPExistingUser, verifyOTPExistingUser, updateExistingUserInfo,tncList} from '../apihelper/Api';

const notif_icon = require('../../assets/notif_icon.png');
const cart_icon = require('../../assets/cart_icon.png');
const cart_gray = require('../../assets/cart_gray.png');
const loc_gray = require('../../assets/loc_gray.png');
const cust_gray = require('../../assets/cust_gray.png');
const logout_gray = require('../../assets/logout_gray.png');
const av_icon = require('../../assets/av_icon.png');
const edit_icon = require('../../assets/edit_icon.png');
const green_placeholder = require('../../assets/green_placeholder.png');
const wallet = require('../../assets/wallet.png');
const users = require('../../assets/users.png');
const user_profile = require('../../assets/user_profile.png');
import AppConfigData from '../constants/AppConfigData'

const menuConfigs = [
  {
    menuName: 'My Orders',
    menuIcon: cart_gray,
    color: '#353A4F',
    fontWeight: 'normal',
    menuID: 1,
  },
  {
    menuName: 'Wallet',
    menuIcon: wallet,
    color: '#353A4F',
    fontWeight: 'normal',
    menuID: 2,
  },
  {
    menuName: 'Delivery Address',
    menuIcon: loc_gray,
    color: '#353A4F',
    fontWeight: 'normal',
    menuID: 3,
  },
  {
    menuName: 'Customer Services',
    menuIcon: cust_gray,
    color: '#353A4F',
    fontWeight: 'normal',
    menuID: 4,
  },
  {
    menuName: 'Refer & Earn',
    menuIcon: users,
    color: '#353A4F',
    fontWeight: 'normal',
    menuID: 5,
  },
  {
    menuName: 'Logout',
    menuIcon: logout_gray,
    color: '#353A4F',
    fontWeight: 'normal',
   menuID: 6,
  },
];

const Profile = props => {
  const AppData = AppConfigData()
  const [editable, setEditable] = useState(false);
  const navigation = useNavigation();
  const userInfo = global.userInfo ? global.userInfo :{};
  const storeInfo = global.storeInfo ? global.storeInfo :{};
  const badgeCount = global.badgeCount;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const {id} = global.storeInfo
    const {customer_id} = global.userInfo
    const params = {store_id:id, customer_id:customer_id}
    tncList(params, (tncRes) =>{
        if(tncRes?.payload_termsList){
          global.term_refer = tncRes?.payload_termsList?.refer
          global.term_wallet = tncRes?.payload_termsList?.wallet
        }
    })
  }, []);

  const navigateToPage = option => {
    let screenName = '';
    let screenParams = {};
    if (option.menuID == 1) {
      screenName = 'OrderListing'; //
    } else if (option.menuID == 2) {
      screenName = 'RefCashPoints';
      global.isFromAccount = true
      screenParams = {isFromAccount: true};
    } else if (option.menuID == 3) {
      screenName = 'Addresses';
      global.isFromAccount = true
      screenParams = {isFromAccount: true};
    } else if (option.menuID == 4) {
      screenName = 'CustServices';
      global.isFromAccount = true
      screenParams = {isFromAccount: true};
    }else if (option.menuID == 5) {
      screenName = 'ReferAndEarn';
    } else if (option.menuID == 6) {
      const options = [
        {
          text: 'Cancel',
          onPress: () => {
          }
        },
        {
          text: 'Logout',
          onPress: () => {
            Storage.clearAllData(()=>{
              Storage.clearStoresCart(()=>{
                props.onLogout && props.onLogout(1);
              })
            });
          }
        }
      ]
      Alert.alert(AppData.title_alert,'Are you sure you want to logout?',options)
    }
    screenName && navigation.navigate(screenName, screenParams);
  };
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <AppHeader
        isExtendedHeader={true}
        isHome={false}
        isLeftIconEnabeld={false}
        title = " " 
        rightIcons={[
          {
            iconSource: cart_icon,
            color: Colors.CLR_5F259F,
            badgeCount: badgeCount,
            onPress: () => {
              navigation.navigate('Cart');
            },
            iconBg: Colors.GREEN,
          }
        ]}
      />
      <View style={{flex: 1, alignItems: 'center', marginTop: -70}}>
      {isLoading && <RPLoader />}
        {!editable ? (
          <UserDetailsBlockNonEditable
            userInfo={userInfo}
            onEditClicked={() => {
              setEditable(true);
            }}
          />
        ) : (
          <UserDetailsBlockEditable
            userInfo={userInfo}
            onVarificationStateChanged = {(status) =>{
              setIsLoading(status)
            }}
            onSaveChanges={(updatedMobile, updatedEmail) => {
              const params = {
                save_type: 'both',
                mobile: updatedMobile,
                email: updatedEmail,
                customer_id: userInfo.customer_id,
                store_id:storeInfo.id
              };
              updateExistingUserInfo(params, res => {
                const updatedUserInfo = {...userInfo,contact:updatedMobile, email:updatedEmail}
                Storage.storeUserData(updatedUserInfo,()=>{
                  global.userInfo = updatedUserInfo,
                  setEditable(false);
                })
              });
            }}
          />
        )}
        <Options
          onMenuPressed={option => {
            navigateToPage(option);
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Profile;

const UserDetailsBlockNonEditable = props => {
  const {userInfo, onEditClicked} = props;
  const {name, contact, email} = userInfo;
  return (
    <View style={[{...styles.roundedBox}, {flexDirection: 'row'}]}>
      <Image
        resizeMode="contain"
        style={{
          width: 44,
          height: 44,
        }}
        source={user_profile}
      />
      <View style={{flex: 1, marginHorizontal: 20}}>
        <Text
          style={{
            fontSize: 16,
            color: '#353A4F',
            fontWeight: 'bold',
          }}>
          {name}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#353A4F',
            marginVertical: 8,
          }}>
          {`+91- ${contact}`}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#353A4F',
          }}>
          {email}
        </Text>
      </View>
      <View style={{width: 30, height: '100%'}}>
        <TouchableOpacity
          onPress={() => {
            onEditClicked && onEditClicked();
          }}
          style={{
            fontSize: 12,
            textAlign: 'left',
            textAlignVertical: 'center',
            fontWeight: 'bold',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          <Image
            resizeMode="contain"
            style={{width: 20, height: 20}}
            source={edit_icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const UserDetailsBlockEditable = props => {
  const {userInfo, onSaveChanges, onVarificationStateChanged = () =>{}} = props;
  const {contact, email} = userInfo;
  const AppData = AppConfigData()
  const [mobNumber, setMobNumber] = useState(contact);
  const [emailID, setEmailID] = useState(email);
  const [showVerifyOTP, setShowVerifyOTP] = useState(undefined);
  const [isVerificationState, setIsVerificationState] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpDetails, setOtpDetails] = useState(undefined)

  return (
    <View style={[{...styles.roundedBox}, {flexDirection: 'column'}]}>
      <View style={{flexDirection: 'row'}}>
        <Image
          resizeMode="contain"
          style={{
            width: 44,
            height: 44,
          }}
          source={user_profile}
        />
        <View style={{flex: 1, marginHorizontal: 20, flexDirection: 'column'}}>
          <UnderLinedInput
            isVerified={isMobileVerified}
            placeholder={'Mobile No.'}
            maxLength={10}
            isVerificationRequired={true}
            validationRegex={RP_REGEX.Mobile}
            errorMessage="Enter valid mobile number"
            value={mobNumber}
            keyboardType="phone-pad"
            onVerificationStateChanged={isEntered => {
              setIsVerificationState(isEntered);
            }}
            onVerifyClicked={mobileNumber => {
              onVarificationStateChanged(true)
              const params = {otp_type:'mobile',username:mobileNumber,customer_id:userInfo.customer_id,store_id:storeInfo.id}
              sentOTPExistingUser(params,(res) =>{
                onVarificationStateChanged(false)
                const details = res?.payload_sendExistUserOtp
                setOtpDetails(details)
                setMobNumber(mobileNumber)
                if(details){
                  setShowVerifyOTP(1);
                }else{
                  Alert.alert(AppData.title_alert,'Error while verifying mobile number.')
                }
              })
            }}
            onChangeText={text => {
              setMobNumber(text);
            }}
            onEndEditing={event => {
              let userMobileNo =
                event.nativeEvent.text && event.nativeEvent.text.length
                  ? event.nativeEvent.text.trim()
                  : '';
              setMobNumber(userMobileNo);
            }}
          />
          <UnderLinedInput
            isVerified={isEmailVerified}
            placeholder={'Email ID'}
            maxLength={30}
            marginTop={20}
            isVerificationRequired={true}
            validationRegex={RP_REGEX.Email}
            errorMessage="Enter valid email id"
            value={emailID}
            keyboardType="email-address"
            onVerificationStateChanged={isEntered => {
              setIsVerificationState(isEntered);
            }}
            onVerifyClicked={emailID => {
              onVarificationStateChanged(true)
              const params = {otp_type:'email',username:emailID,customer_id:userInfo.customer_id,store_id:storeInfo.id}
              sentOTPExistingUser(params,(res) =>{
                onVarificationStateChanged(false)
                const details = res?.payload_sendExistUserOtp
                setOtpDetails(details)
                setEmailID(emailID)
                if(details){
                  setShowVerifyOTP(2);
                }else{
                  Alert.alert(AppData.title_alert,'Error while verifying.')
                }
              })
            }}
            onChangeText={text => {
              setEmailID(text);
            }}
            onEndEditing={event => {
              let userEmailId =
                event.nativeEvent.text && event.nativeEvent.text.length
                  ? event.nativeEvent.text.trim()
                  : '';
              setEmailID(userEmailId);
            }}
          />
          {showVerifyOTP && (
            <VerifyMobileEmail
            details = {otpDetails}
              title={
                showVerifyOTP == 2 ? 'Verify Email ID' : 'Verify Mobile No'
              }
              desc={
                showVerifyOTP == 2
                  ? 'Enter OTP sent on your email which you want to verify '
                  : 'Enter OTP sent in your mobile No which you want to verify'
              }
              onVerifyOTPressed={() => {
                const params = {otp_type:showVerifyOTP == 2 ? 'email' : 'mobile',otp_id:otpDetails.otp_id, otp : otpDetails.otp,customer_id:userInfo.customer_id,store_id:storeInfo.id}
                verifyOTPExistingUser(params,(res) =>{
                  const status = res
                  if(status){
                    setShowVerifyOTP(undefined);
                    setIsVerificationState(false);
                    showVerifyOTP == 2
                  ? setIsEmailVerified(true)
                  : setIsMobileVerified(true);
                  }else{
                    Alert.alert(AppData.title_alert,'Error while verifying.')
                  }
                })
              }}
              onResendOtp = {()=>{
                const params = {otp_type:'email',username:emailID,customer_id:userInfo.customer_id,store_id:storeInfo.id}
                sentOTPExistingUser(params,(res) =>{
                  const details = res?.payload_sendExistUserOtp
                  setOtpDetails(details)
                  setEmailID(emailID)
                  if(details){
                    setShowVerifyOTP(2);
                  }else{
                    Alert.alert(AppData.title_alert,'Error while verifying.')
                  }
                })
              }}
              onClose={() => {
                setShowVerifyOTP(undefined);
              }}
            />
          )}
        </View>
      </View>
      <SaveButton
        isVerificationState={isVerificationState}
        onSaveChanges={() => {
          onSaveChanges && onSaveChanges(mobNumber, emailID);
        }}
      />
    </View>
  );
};

const SaveButton = props => {
  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      }}>
      <TouchableOpacity
        disabled={props.isVerificationState}
        onPress={() => {
          props.onSaveChanges && props.onSaveChanges();
        }}
        style={{
          fontSize: 12,
          fontWeight: 'bold',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 40,
          paddingVertical: 9,
          borderRadius: 4,
          borderColor: props.isVerificationState
            ? Colors.GRAY
            : Colors.CLR_0376FC,
          borderWidth: 1,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: props.isVerificationState ? Colors.GRAY : Colors.CLR_0376FC,
          }}>
          Save Changes
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Options = props => {
  return (
    <View style={styles.roundedBox}>
      <FlatList
        horizontal={false}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        style={{width: '100%', paddingHorizontal: 30}}
        keyExtractor={(item, index) => 'key_' + index}
        data={menuConfigs}
        ItemSeparatorComponent={() => (
          <View style={{width: '100%', height: 20}} />
        )}
        renderItem={({item}) => (
          <MenuItem
            menuItemPressed={() => {
              props.onMenuPressed && props.onMenuPressed(item);
            }}
            item={item}
          />
        )}
      />
    </View>
  );
};
const MenuItem = props => {
  const {menuIcon, menuName, color, fontWeight} = props.item;
  return (
    <TouchableOpacity
      onPress={() => {
        props.menuItemPressed && props.menuItemPressed();
      }}
      style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image
        resizeMode="contain"
        style={{
          width: 25,
          height: 25,
        }}
        source={menuIcon}
      />
      <Text
        style={{
          fontSize: 16,
          color: color,
          marginLeft: 20,
          fontWeight: fontWeight,
        }}>
        {menuName}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  roundedBox: {
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    width: '90%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 4,
    shadowColor: Colors.GRAY,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
    marginTop: 30,
  },
});
