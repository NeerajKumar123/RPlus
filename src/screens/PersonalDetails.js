import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  DeviceEventEmitter
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Validator from '../helpers/RPValidator';
import {RPCouponInput} from '../components/RPInput';
import {updatePersonalInfo} from '../apihelper/Api'
import RPButton from '../components/RPButton';
import RPLoader from '../components/RPLoader';
import * as Colors from '../constants/ColorDefs';
import {RP_REGEX} from '../constants/StaticValues';
const back = require('../../assets/back.png');
const personal = require('../../assets/personal.png');
const user = require('../../assets/user.png');
const mobile_icon = require('../../assets/mobile.png');
const mail = require('../../assets/mail.png');
const {width} = Dimensions.get('window');
const PersonalDetails = props => {
  const customerID = global.userInfo && global.userInfo.customer_id;
  const userName = global.userInfo && global.userInfo.name;
  const mobileNumber = global.userInfo && global.userInfo.contact;
  const userEmail = global.userInfo && global.userInfo.email;
  const [name, setName] = useState(userName);
  const [mobile, setMobile] = useState(mobileNumber);
  const [email, setEmail] = useState(userEmail);
  const [disable, setDisable] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation()

  const isValidForm = () =>{
   const isNameValid =  Validator.isValidField(name, RP_REGEX.FullName)
   const isEmailValid =  Validator.isValidField(email, RP_REGEX.Email)
   if(isNameValid && isEmailValid){
    setDisable(false)
   }else{
    setDisable(true)
   }
  }

  useEffect(() => {
    console.log('email',email,name)
    isValidForm()
  }, [email, name])

  return (
    <KeyboardAvoidingView
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
            resizeMode="stretch"
            style={{height: 35, width: 20}}
            source={back}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '90%',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          marginTop: 20,
        }}>
        <Image
          resizeMode="contain"
          style={{height: 72, width: 76}}
          source={personal}
        />
        <Text
          style={{
            fontSize: 26,
            textAlign: 'left',
            textAlignVertical: 'center',
            color: Colors.BLACK,
            marginBottom: 8,
            lineHeight: 32,
            marginTop: 14,
          }}>
          {`Personal`}
          <Text
            style={{
              fontSize: 26,
              textAlign: 'left',
              textAlignVertical: 'center',
              color: Colors.BLACK,
              fontWeight: 'bold',
            }}>
            {` Info`}
          </Text>
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          marginTop: 20,
        }}>
        <RPCouponInput
          validationRegex={RP_REGEX.FullName} 
          autoCapitalize = 'sentences'
          errorMessage={'Please enter valid name'}
          keyboardType="default"
          isLeftIconSource={user}
          borderColor={Colors.CLR_0065FF}
          value={''}
          placeholder={'Enter Name'}
          onEndEditing={value => {
            setName(value);
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          marginTop: 20,
        }}>
        <RPCouponInput
          isNonEditable={true}
          validationRegex={RP_REGEX.Mobile}
          errorMessage={'Please enter valid mobile no'}
          keyboardType="phone-pad"
          fontSize="bold"
          isLeftIconSource={mobile_icon}
          borderColor={Colors.CLR_0065FF}
          value={`+91 - ${mobile}`}
          placeholder={'Enter Mobile Number'}
          onEndEditing={value => {
            console.log('onEndEditing', value);
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          marginTop: 20,
        }}>
        <RPCouponInput
          maxLength={40}
          autoCapitalize = 'sentences'
          validationRegex={RP_REGEX.Email}
          errorMessage={'Please enter valid email address'}
          keyboardType="email-address"
          isLeftIconSource={mail}
          borderColor={Colors.CLR_0065FF}
          value={email}
          placeholder={'Enter Email ID'}
          onEndEditing={value => {
            console.log('onEndEditing', value);
            setEmail(value);
          }}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <RPButton
          fontSize={18}
          disable = {disable}
          width="100%"
          backgroundColor = {disable? Colors.CLR_62A0FF :Colors.CLR_0065FF }
          height={70}
          title={'Continue'}
          onPress={() => {
            setIsLoading(true)
            const params = {customer_id:customerID,name:name,contact:mobile,email:email,updated_type:'email'}
            updatePersonalInfo(params, () =>{
              setIsLoading(false)
              DeviceEventEmitter.emit('otp_verified',true)
              global.lastScreenName ? navigation.navigate(global.lastScreenName) : console.log('Not allowed to move');
            })
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};



export default PersonalDetails;
