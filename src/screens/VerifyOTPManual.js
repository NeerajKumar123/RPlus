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
  DeviceEventEmitter,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RPButton from '../components/RPButton';
import * as Colors from '../constants/ColorDefs';
import {verifyOtp, sendOtp} from '../apihelper/Api';
import RPInput from '../components/RPInput';
import RPLoader from '../components/RPLoader';
import * as Storage from '../helpers/RPStorage';
const back = require('../../assets/back.png');
const otpImage = require('../../assets/otp.png');
import AppConfigData from '../constants/AppConfigData'


const VerifyOTP = props => {
  const AppData = AppConfigData()
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const {params} = props?.route;
  const [otpParams, setOtpParams] = useState(params);
  const lastScreenName = params && params.lastScreenName;
  const [otp, setOTP] = useState('');
  const maskedMobNumber =
    otpParams &&
    otpParams.mobile_no &&
    otpParams.mobile_no.replace(/.(?=.{4})/g, 'x');

  const enteredMobileNo = params.mobile_no
  return (
    <ScrollView
    keyboardShouldPersistTaps='handled'
    contentContainerStyle={{
      flex: 1,
      backgroundColor: Colors.WHITE,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 20
    }}>
      {isLoading && <RPLoader />}
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
            resizeMode="stretch"
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
          source={otpImage}
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
        <RPInput
          borderColor={Colors.CLR_0065FF}
          keyboardType = 'phone-pad'
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
          textContentType="none"
          placeholder=""
          returnKeyType="done"
          textAlign = 'center'
          fontSize = {25}
          maxLength = {4}
          fontWeight = '800'  
          value={otp}
          onChangeText = {(value) =>{
              setOTP(value)
          }}
          onEndEditing={value => {
            setOTP(value);
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          marginVertical: 30,
        }}
        onPress={() => {
          const params = {otp_type: 'mobile', username: enteredMobileNo};
          setIsLoading(true);
          sendOtp(params, res => {
            setOTP('')
            setIsLoading(false);
            if(res.status != -1){
              const newOtpParams = res && res.payload ? res.payload : {};
              setOtpParams({...params,...newOtpParams})
              Alert.alert(AppData.title_alert, 'OTP sent on your mobile number.');
              }else{
                Alert.alert(AppData.title_alert, 'Something went wrong, please try again later.');
              }
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
          if (Number.isNaN(otp) || otp.length < 4 || (otpParams?.otp != otp)) {
            Alert.alert(AppData.title_alert, 'Please enter a valid OTP');
            return;
          }
          setIsLoading(true);
          const verifyParams = {otp_type:otpParams?.otp_type,otp_id:otpParams?.otp_id,otp:otpParams?.otp,company_id:otpParams?.company_id}
          verifyOtp(verifyParams, res => {
            setTimeout(() => {
              setIsLoading(false);
            }, 300);
            if(res?.status == -1){
              Alert.alert(AppData.title_alert, 'Currently, we are facing some technical glitch ,please retry.');
              return
            }
            const userInfo = res && res.payload;
              Storage.storeUserData(userInfo, () => {
                global.userInfo = userInfo;
                const userName = userInfo.name;
                // check if new customer....
                if (userName) {
                  DeviceEventEmitter.emit('otp_verified', true);
                  navigation.navigate(global.lastScreenName,{isSync:true});
                } else {
                  navigation.navigate('PersonalDetails');
                }
              })
          });
        }}
      />
    </ScrollView>
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
