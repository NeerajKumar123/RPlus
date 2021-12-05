import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  Alert,
  DeviceEventEmitter,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RPButton from '../components/RPButton';
import RPInput from '../components/RPInput';
import * as Colors from '../constants/ColorDefs';
import {sendOtp} from '../apihelper/Api.js';
import RPLoader from '../components/RPLoader';
import * as Validator from '../helpers/RPValidator';
import * as Storage from '../helpers/RPStorage'
import AppConfigData from '../constants/AppConfigData'
import { RP_REGEX } from '../constants/StaticValues';

const or = require('../../assets/or.png');
const mail = require('../../assets/mail.png');
const login_sitting = require('../../assets/login_sitting.png');
const Login = (props) => {
  const navigation = useNavigation();
  const AppData = AppConfigData()
  const passedProps = props?.route?.params;
  const storeInfo = global.storeInfo;
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValidMobileNumber = () => {
    const isValid = Validator.isValidField(mobileNumber, RP_REGEX.Mobile);
    if (!isValid) {
      Alert.alert(AppData.title_alert, 'Please enter valid mobile number');
      return;
    }
    return isValid;
  };

  useEffect(() => {
    DeviceEventEmitter.addListener('otp_verified', eventData => {
      console.log('DeviceEventEmitter', eventData,props);
      props.onLogin && props.onLogin(1)
    });
  }, []);

  return (
    <ScrollView
      keyboardShouldPersistTaps='handled'
      contentContainerStyle={{
        flex: 1,
        backgroundColor: Colors.WHITE,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}>
      {isLoading && <RPLoader />}
      <View style={{width: '90%', marginTop: Platform.OS == 'ios' ? 100 : 50}}>
        <Text
          style={{
            fontSize: 26,
            textAlign: 'left',
            textAlignVertical: 'center',
            color: Colors.BLACK,
            lineHeight: 32,
          }}>
          {`Welcome\nto`}
          <Text
            style={{
              fontSize: 26,
              textAlign: 'left',
              textAlignVertical: 'center',
              color: Colors.BLACK,
              fontWeight: 'bold',
            }}>
            {`  ${storeInfo?.store_name}` || `${AppData.wallet_app_name}`}
          </Text>
        </Text>
        <Text
          style={{
            fontSize: 14,
            textAlign: 'left',
            textAlignVertical: 'center',
            color: Colors.CLR_49537D,
            marginTop: 12,
          }}>
          Create an account to continue shopping
        </Text>
      </View>
      <View style={{width: '90%', marginTop: 80, marginBottom: 30}}>
        <Text
          style={{
            fontSize: 14,
            textAlign: 'left',
            textAlignVertical: 'center',
            color: Colors.CLR_161E42,
            marginBottom: 10,
          }}>
          Enter Mobile No.
        </Text>
        <RPInput
          leftText ={'+91- '}
          borderColor={Colors.CLR_0065FF}
          value={mobileNumber}
          autoCompleteType="off"
          maxLength = {10}
          keyboardType = 'phone-pad'
          autoCorrect={false}
          textContentType="none"
          returnKeyType="done"
          placeholder=""
          onChangeText = {(value) =>{
            setMobileNumber(value)
          }}
          onEndEditing={value => {
            setMobileNumber(value);
          }}
        />
      </View>
      <RPButton
        fontSize={18}
        width="90%"
        title={'Continue'}
        onPress={() => {
          if (isValidMobileNumber()) {
            const params = {otp_type: 'mobile', username: mobileNumber};
            setIsLoading(true);
            sendOtp(params, res => {
              setIsLoading(false);
              const params = res && res.payload ? res.payload : {};
              const details = {
                ...params,
                company_id: 38,
                mobile_no: mobileNumber,
                lastScreenName:passedProps && passedProps.lastScreenName
              };
              if (params.otp) {
                navigation.navigate('VerifyOTPManual', details);
              }
            });
          }
        }}
      />
      <Image
        resizeMode="contain"
        style={{width: '90%', height: 200, marginTop: 50}}
        source={login_sitting}
      />
    </ScrollView>
  );
};

export default Login;
