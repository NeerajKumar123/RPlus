import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Keyboard,
  Alert,
  DeviceEventEmitter
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RPButton from '../components/RPButton';
import * as Colors from '../constants/ColorDefs';
import {verifyOtp, sendOtp} from '../apihelper/Api';
import RPLoader from '../components/RPLoader';
import * as Storage from '../helpers/RPStorage'
const back = require('../../assets/back.png');
const otp = require('../../assets/otp.png');
import AppConfigData from '../constants/AppConfigData'


const VerifyOTP = props => {
  const AppData = AppConfigData()
  const navigation = useNavigation();
  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const input4 = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputs = Array(4).fill(0);
  const {params} = props?.route;
  const [otpParams, setOtpParams] = useState(params)
  const lastScreenName = params && params.lastScreenName
  const [otps, setOtps] = useState(Array(4).fill(''));
  const [_otp, set_otp] = useState('');
  const maskedMobNumber =  otpParams && otpParams.mobile_no && otpParams.mobile_no.replace(/.(?=.{4})/g, 'x');
  const [seconds, UpdateSeconds] = useState(30);
  const [forceUpdate, setForceUpdate] = useState(false);

  const autoPopulate = finalOTP => {
    let str = finalOTP.trim();
    if (str.length !== 4) {
      return;
    }
    str = str.split('');
    if (input1 && input1.current && str[0]) {
      input1.current.setNativeProps({text: str[0]});
    }
    if (input2 && input2.current && str[1]) {
      input2.current.setNativeProps({text: str[1]});
    }
    if (input3 && input3.current && str[2]) {
      input3.current.setNativeProps({text: str[2]});
    }
    if (input4 && input4.current && str[3]) {
      input4.current.setNativeProps({text: str[3]});
      input4.current.focus();
    }
  };

  const focusNext = (index, value) => {
    if (!value || String(value).trim().length === 0 || Number.isNaN(value)) {
      return;
    }
    if (!Number.isInteger(Number(value))) {
      getRef(index).current.clear();
      return;
    }
    if (index < 3) {
      getRef(index + 1).current.focus();
    }

    const _otps = otps;
    _otps[index] = value;
    setOtps(_otps);
    set_otp(_otps.join(''));
    const otp = _otps.join('');
    if (otp.length === 4) {
      Keyboard.dismiss();
    }

    if (index === 3 && otp.length === 4) {
      input4.current.blur();
    }
  };

  const getRef = index => {
    switch (index) {
      case 0:
        return input1;
      case 1:
        return input2;
      case 2:
        return input3;
      case 3:
        return input4;
    }
  };

  const focusPrevious = (key, index) => {
    if (key === 'Backspace' && index > 0) {
      if (otps[index]) {
        getRef(index).current.clear();
        const _otps = otps;
        _otps[index] = '';
        setOtps(_otps);
      } else {
        getRef(index - 1).current.focus();
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
      {isLoading && <RPLoader/>}
      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          marginTop: Platform.OS == 'ios' ? 70 : 50,
        }}>
        <TouchableOpacity
          style={{}}
          key={'props.item.2'}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            resizeMode='stretch'
            style={{height: 35, width: 20}}
            source={back}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          marginTop: 23,
        }}>
        <Image
          resizeMode="contain"
          style={{height: 72, width: 76}}
          source={otp}
        />
      </View>
      <View style={{width: '90%', marginTop: 15}}>
        <Text
          style={{
            fontSize: 26,
            textAlign: 'left',
            textAlignVertical: 'center',
            color: Colors.BLACK,
            marginBottom: 8,
            lineHeight: 32,
          }}>
          {`Verify`}
          <Text
            style={{
              fontSize: 26,
              textAlign: 'left',
              textAlignVertical: 'center',
              color: Colors.BLACK,
              fontWeight: 'bold',
              marginBottom: 8,
            }}>
            {` OTP`}
          </Text>
        </Text>
        <Text
          style={{
            fontSize: 14,
            textAlign: 'left',
            textAlignVertical: 'center',
            color: Colors.GRAY,
            fontWeight: '500',
          }}>
          {`Please enter 4 Digit Verification Code sent to +91- ${maskedMobNumber}`}
        </Text>
      </View>
      <View
        style={{
          width: '90%',
          marginTop: 30,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {inputs.map((i, j) => (
          <TextInput
            key={`${j}_Input_Key`}
            ref={getRef(j)}
            underlineColorAndroid={Colors.TRANS}
            keyboardType='number-pad'
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            textContentType = 'none'
            placeholder=""
            style={[
              styles.otpInput,
              {
                color: Colors.CLR_253858,
                borderColor: getRef(j).current?.isFocused()
                  ? Colors.CLR_0065FF.primary
                  : Colors.CLR_EFF2FC,
              },
            ]}
            clearTextOnFocus={false}
            autoFocus={j === 0}
            maxLength={Platform.OS === 'ios' ? 4 : 1}
            numberOfLines={1}
            selectionColor={Colors.WHITE}
            onChangeText={v => {
              if (v.length === 4 && Platform.OS === 'ios') {
                autoPopulate(v);
              } else {
                focusNext(j, v);
              }
            }}
            returnKeyType="next"
            accessible={true}
            accessibilityLabel="OTP"
            onChange={e => {}}
            onKeyPress={e => focusPrevious(e.nativeEvent.key, j)}
          />
        ))}
      </View>
      <TouchableOpacity
        style={{
          marginVertical: 30,
        }}
        onPress={() => {
          const params = {otp_type: 'mobile', username: otpParams.mobile_no};
            setIsLoading(true);
            sendOtp(params, res => {
              setIsLoading(false);
              const newOtpParams = res && res.payload ? res.payload : {};
              Alert.alert(AppData.title_alert,'OTP sent on your mobile number.')
            });
        }}>
        <Text
          style={{
            fontSize: 14,
            textAlign: 'left',
            textAlignVertical: 'center',
            color: Colors.BLACK,
            lineHeight: 32,
          }}>
          {`Didn't recieve the OTP ?`}
          <Text
            style={{
              fontSize: 14,
              textAlign: 'left',
              textAlignVertical: 'center',
              color: Colors.CLR_0065FF,
              fontWeight: 'bold',
              marginBottom: 8,
            }}>
            {` Resend Code`}
          </Text>
        </Text>
      </TouchableOpacity>
      <RPButton
        fontSize={18}
        width="90%"
        title={'Verify & Proceed'}
        onPress={() => {
          const otp = _otp;
          if (Number.isNaN(otp) || _otp.length < 4) {
            Alert.alert(AppData.title_alert, 'Please enter a valid OTP');
            return;
          }
          setIsLoading(true)
          verifyOtp(params, (res) => {
            setIsLoading(false)
            const userInfo = res && res.payload
            Storage.storeUserData(userInfo,()=>{
              global.userInfo = userInfo
              const userName=  userInfo.name
              if(userName){
                DeviceEventEmitter.emit('otp_verified',true)
                navigation.navigate(global.lastScreenName);
              }else{
                navigation.navigate('PersonalDetails');
              }
            })
          });
        }}
      />
    </View>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  otpInput: {
    width: 56,
    marginHorizontal: 8,
    textAlign: 'center',
    fontSize: 16,
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
  },
});
