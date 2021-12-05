import React, {useEffect, useState} from 'react';
import Lottie from 'lottie-react-native';
import {
  Text,
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as Colors from '../constants/ColorDefs';
import * as Validator from '../helpers/RPValidator';
const car_circular_loader = require('../../assets/car_circular_loader.json');
const RPInput = props => {
  const [value, setValue] = useState();
  useEffect(() => {
    setValue("" + props.value)
  }, [props.value])
  return (
    <View
      style={{
        width: props.width ? props.width : '100%',
        padding: 3,
        borderColor: props.borderColor ? props.borderColor : Colors.GRAY,
        borderWidth: 1,
        borderRadius: 8,
        flexDirection: 'row',
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : Colors.WHITE,
      }}>
      {props.leftText && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 20,
          }}>
          <Text
            style={{
              color: Colors.CLR_161E42,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            {props.leftText}
          </Text>
        </View>
      )}
      <TextInput
        style={{
          fontSize: props.fontSize || 18,
          fontWeight:  props.fontWeight || '400',
          height: 56,
          flex: 1,
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : Colors.WHITE,
        }}
        textAlign={props.textAlign ? props.textAlign : 'left'}
        underlineColorAndroid="transparent"
        value={value}
        keyboardType = {props.keyboardType || 'default'}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        textContentType = 'none'
        returnKeyType = {props.returnKeyType}
        textAlign = {props.textAlign}
        placeholder={props.placeholder}
        maxLength={props.maxLength || 15}
        onFocus={() => {
        }}
        onChangeText={value => {
          props.onChangeText && props.onChangeText(value)
          setValue(value);
        }}
        onEndEditing={() => {
          props.onEndEditing && props.onEndEditing(value);
        }}
      />
    </View>
  );
};

export const RPInputAddress = props => {
  const {keyboardType = 'default',placeholder = 'Enter value',maxLength = 30,autoCapitalize = 'words'} = props
  const [value, setValue] = useState('');
  useEffect(() => {
    setValue(props.value)
  }, [props])

  return (
    <View
      style={{
        width: props.width ? props.width : '100%',
        padding: 3,
        borderColor: Colors.GRAY,
        borderWidth: 1,
        borderRadius: 8,
        flexDirection: 'row',
        paddingHorizontal: 25,
        marginTop: 20,
        backgroundColor: Colors.CLR_F1F3FB,
      }}>
      {props.isLeftIconSource && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            resizeMode="contain"
            style={{width: 30, height: 30, marginRight: 20}}
            source={props.isLeftIconSource}
          />
        </View>
      )}
      <TextInput
        style={{
          fontSize: 18,
          fontWeight: props.fontSize ? props.fontSize : '400',
          height: 48,
          flex: 1,
        }}
        textAlign={props.textAlign ? props.textAlign : 'left'}
        underlineColorAndroid="transparent"
        value={value}
        autoCapitalize = {autoCapitalize}
        autoCompleteType="off"
        autoCorrect={false}
        textContentType = 'none'  
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor="#898FA8"
        maxLength={maxLength}
        onFocus={() => {
        }}
        onChangeText={value => {
          setValue(value);
        }}
        onEndEditing={() => {
          props.onEndEditing && props.onEndEditing(value);
        }}
      />
    </View>
  );
};

export const UnderLinedInput = props => {
  const {
    value,
    keyboardType = 'default',
    maxLength,
    placeholder,
    marginTop = 0,
    isVerificationRequired,
    onVerifyClicked,
    validationRegex,
    errorMessage,
    onVerificationStateChanged,
    isVerified,
  } = props;

  const [textValue, setTextValue] = useState(value);
  const [isValueChanged, setIsValueChanged] = useState(false);
  const [isValid, setIsValid] = useState(true);
  return (
    <View
      style={{
        marginTop: marginTop,
        flexDirection: 'column',
      }}>
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1.0,
          borderColor: Colors.CLR_0376FC,
          justifyContent: 'space-between',
        }}>
        <TextInput
          style={styles.textInputUnderLined}
          returnKeyType="done"
          value={textValue && textValue.toString()}
          accessible={true}
          maxLength={maxLength}
          keyboardType={keyboardType}
          placeholder={placeholder}
          onFocus={() => {
            onVerificationStateChanged(true);
          }}
          onChangeText={value => {
            setTextValue(value);
          }}
          onEndEditing={() => {
            const isValid = Validator.isValidField(textValue, validationRegex);
            const isValueChanged = value != textValue;
            setIsValid(isValid);
            setIsValueChanged(isValueChanged);
            if (isVerificationRequired) {
              onVerificationStateChanged(!isValid || isValueChanged);
            } else {
              onVerificationStateChanged(!isValid);
            }
          }}
        />
        {isVerificationRequired && isValueChanged && isValid && (
          <TouchableOpacity
            disabled={isVerified}
            style={{
              paddingHorizontal: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              onVerifyClicked && onVerifyClicked(textValue);
            }}>
            <Text
              style={{
                color: isVerified ? Colors.CLR_159F5D : Colors.CLR_0376FC,
                fontSize: 14,
                lineHeight: 16,
              }}>
              {isVerified && isValueChanged ? 'Verified' : 'Verfiy'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {!isValid && errorMessage && (
        <Text style={{color: 'red'}}>{errorMessage}</Text>
      )}
    </View>
  );
};

export const RPCouponInput = props => {
  const {
    isRightEnabled,
    placeholder,
    keyboardType,
    errorMessage,
    validationRegex,
    value,
    isNonEditable,
    maxLength = 30,
    isLoading = false,
    autoCapitalize = 'characters'
  } = props;
  const [isValid, setIsValid] = useState(true);
  const [textValue, setTextValue] = useState(value);
  return (
    <View
      style={{
        flexDirection: 'column',
        width:'100%'
      }}>
      <View
        style={{
          width: props.width ? props.width : '100%',
          padding: 3,
          borderRadius: 8,
          flexDirection: 'row',
          backgroundColor: Colors.CLR_F1F3FB,
          overflow: 'hidden',
          paddingHorizontal: 16,
        }}>
        {props.isLeftIconSource && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="contain"
              style={{width: 25, height: 25, marginRight: 20}}
              source={props.isLeftIconSource}
            />
          </View>
        )}
        <TextInput
          editable = {!isNonEditable}
          style={{
            fontSize: 18,
            fontWeight: props.fontSize ? props.fontSize : '400',
            height: 50,
            flex: 1,
          }}
          textAlign={props.textAlign ? props.textAlign : 'left'}
          underlineColorAndroid="transparent"
          value={textValue}
          autoCapitalize = {autoCapitalize}
          autoCompleteType="off"
          autoCorrect={false}
          textContentType = 'none'  
          keyboardType={keyboardType ? keyboardType : 'phone-pad'}
          placeholder={placeholder ? placeholder : 'Enter Coupon Code'}
          placeholderTextColor={Colors.CLR_898FA8}
          maxLength={maxLength}
          onFocus={() => {
          }}
          onChangeText={value => {
            setTextValue(value);
          }}
          onEndEditing={() => {
            const isValid = Validator.isValidField(textValue, validationRegex);
            setIsValid(isValid);
            props.onEndEditing && props.onEndEditing(textValue)
          }}
        />
        {isRightEnabled && !isLoading && (
          <TouchableOpacity
            onPress={() => {
              props.onCheckPress && props.onCheckPress(textValue);
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 20,
            }}>
            <Text
              style={{
                color: Colors.CLR_0376FC,
                fontWeight: 'bold',
                fontSize: 14,
              }}>
              CHECK
            </Text>
          </TouchableOpacity>
        )}
        {isRightEnabled && isLoading && (
          <Lottie
          style={styles.lottie}
          autoPlay
          loop
          source={car_circular_loader}
        />
        )}
      </View>
      {!isValid && errorMessage && (
        <Text style={{color: 'red'}}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default RPInput;

const styles = StyleSheet.create({
  textInputUnderLined: {
    fontSize: 16,
    height: 30,
    fontSize: 16,
    width: '60%',
  },
  lottie: {
    width: 40,
    height: 40,
  },
});
