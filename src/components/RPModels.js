import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Image,
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
  Platform,
} from 'react-native';
import * as Colors from '../constants/ColorDefs';
import PopupConatiner from './PopupConatiner';
import {RPCouponInput} from './RPInput';
import RPButton from './RPButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {checkCoupon,checkReferralCode} from '../apihelper/Api';
import DeliveryDateTimeSlotBlock from '../components/DeliveryDateTimeSlotBlock';
const cross = require('../../assets/cross.png');
const redeem_points = require('../../assets/redeem_points.png');
const ref_clap = require('../../assets/ref_clap.png');

const RPModels = props => {
  const coupons = props.coupons;
  const [coupon, setCoupon] = useState(undefined);
  const [isChecking, setIsChecking] = useState(false);
  const [couponValidationMsg, setCouponValidationMsg] = useState(undefined);
  const [isError, setIsError] = useState(false);

  return (
    <PopupConatiner>
      <KeyboardAvoidingView
        style={{
          backgroundColor: Colors.WHITE,
          width: '100%',
          height: 460,
          flexDirection: 'column',
          paddingTop: 20,
        }}>
        <CloseButtonHeader
          title={'Coupons'}
          onClose={() => {
            props.onClose && props.onClose();
          }}
        />
        <View
          style={{
            flexDirection: 'column',
            marginHorizontal: 20,
            marginTop: 10,
          }}>
          <RPCouponInput
            isRightEnabled={true}
            isLoading={isChecking}
            borderColor={Colors.CLR_0065FF}
            value={coupon?.coupon_code ?? ''}
            keyboardType="default"
            onCheckPress={text => {
              Keyboard.dismiss();
              setCoupon(undefined);
              const trimmedText = text && text.trim();
              if (text.length < 4) {
                setIsError(true);
                setCouponValidationMsg('Please enter valid coupon code.');
                return;
              }
              setIsChecking(true);
              const params = {...props.details, coupon_code: trimmedText};
              if(trimmedText.startsWith('RWD')){
                checkReferralCode(params, res => {
                  setIsChecking(false);
                  if (res.status == -1) {
                    setIsError(true);
                    setCouponValidationMsg(
                      'Invalid coupon code or coupon has been expired, Please try another coupon.',
                    );
                  } else {
                    const cval = res?.payload_checkCoupon?.coupon_value ?? 0;
                    const cpn = {coupon_value: cval, coupon_code: trimmedText};
                    setCoupon(cpn);
                    setIsError(false);
                    setCouponValidationMsg(
                      `Great! By applying this coupon you can save Rs. ${cval}.`,
                    );
                  }
                });
              }else{
                checkCoupon(params, res => {
                  setIsChecking(false);
                  if (res.status == -1) {
                    setIsError(true);
                    setCouponValidationMsg(
                      'Invalid coupon code or coupon has been expired, Please try another coupon.',
                    );
                  } else {
                    const cval = res?.payload_checkCoupon?.coupon_value ?? 0;
                    const cpn = {coupon_value: cval, coupon_code: trimmedText};
                    setCoupon(cpn);
                    setIsError(false);
                    setCouponValidationMsg(
                      `Great! By applying this coupon you can save Rs. ${cval}.`,
                    );
                  }
                });
              }
            }}
            onEndEditing={value => {}}
          />
          {couponValidationMsg && (
            <Text
              style={{
                marginTop: 10,
                fontSize: 12,
                color: isError ? 'red' : 'green',
              }}>
              {couponValidationMsg}
            </Text>
          )}
        </View>
        {coupons && coupons.length > 0 && (
          <Text
            style={{
              marginHorizontal: 20,
              fontSize: 15,
              fontWeight: '600',
              color: Colors.BLACK,
              marginVertical: 15,
            }}>
            Or Select from -
          </Text>
        )}
        {coupons && coupons.length > 0 && (
          <FlatList
            style={{width: '100%', marginHorizontal: 20}}
            horizontal={false}
            keyExtractor={(item, index) => 'key_' + index}
            ItemSeparatorComponent={() => (
              <View style={{height: 3, width: '100%'}} />
            )}
            data={coupons}
            renderItem={({item}) => (
              <CouponCard
                selectedCoupon={coupon}
                item={item}
                onCouponSelected={() => {
                  setCoupon(item);
                }}
              />
            )}
          />
        )}
        <ApplyCouponFooter
          maxSaving={coupon?.coupon_value || 0}
          isCoupon={coupon?.coupon_code?.length > 0 ?? false}
          onApplyCoupon={() => {
            props.onApplyCoupon && props.onApplyCoupon(coupon);
          }}
        />
      </KeyboardAvoidingView>
    </PopupConatiner>
  );
};

const CouponCard = props => {
  const {item, selectedCoupon} = props;
  const isSelected =
    selectedCoupon && selectedCoupon.id == item.id ? true : false;
  return (
    <TouchableOpacity
      onPress={() => {
        props.onCouponSelected && props.onCouponSelected();
      }}
      style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 5}}>
      <Icon
        name={isSelected ? 'radiobox-marked' : 'radiobox-blank'}
        size={20}
        color={Colors.CLR_02A3FC}
      />
      <Text style={{marginLeft: 5, fontSize: 14, color: Colors.CLR_49537D}}>
        {`${item.name}(${item.coupon_code})`}
      </Text>
    </TouchableOpacity>
  );
};

const ApplyCouponFooter = props => {
  const {maxSaving, isCoupon} = props;
  return (
    <View
      style={{
        height: 84,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: Colors.CLR_2C3646,
        position:'absolute',
        bottom:Platform.OS === 'ios' ? 0 : 0
      }}>
      <View
        style={{
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 14,
            color: Colors.WHITE,
          }}>
          {`Max saving Rs. ${maxSaving}`}
        </Text>
      </View>

      <View
        style={{
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <RPButton
          fontSize={18}
          width="80%"
          disable={!isCoupon}
          height={43}
          backgroundColor={Colors.CLR_EE6F12}
          title={'Apply Coupon'}
          onPress={() => {
            props.onApplyCoupon && props.onApplyCoupon();
          }}
        />
      </View>
    </View>
  );
};

const CloseButtonHeader = props => {
  const {title} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        height: 30,
      }}>
      <Text
        style={{
          color: Colors.CLR_14273E,
          fontSize: 18,
          fontWeight: 'bold',
        }}>
        {title}
      </Text>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          props.onClose && props.onClose();
        }}>
        <Icon name={'close-circle-outline'} size={30} color={Colors.DARKGRAY} />
      </TouchableOpacity>
    </View>
  );
};

export const VerifyMobileEmail = props => {
  const {title, desc, details} = props;
  const [otp, setOtp] = useState('');
  return (
    <PopupConatiner>
      <View
        style={{
          backgroundColor: Colors.WHITE,
          width: '100%',
          flexDirection: 'column',
          paddingTop: 20,
        }}>
        <CloseButtonHeader
          title={title}
          onClose={() => {
            props.onClose && props.onClose();
          }}
        />
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginHorizontal: 20,
            marginTop: 10,
          }}>
          <Text
            style={{
              width: '70%',
              color: Colors.CLR_14273E,
              fontSize: 14,
              lineHeight: 17,
            }}>
            {desc}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            marginTop: 20,
          }}>
          <RPCouponInput
            placeholder={'Enter OTP'}
            borderColor={Colors.CLR_0065FF}
            value={otp && otp.toString()}
            onEndEditing={value => {
              setOtp(value);
            }}
          />
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            marginHorizontal: 20,
          }}>
          <TouchableOpacity 
          style={{paddingVertical: 8, paddingLeft: 30}}
          onPress = {()=>{
            props?.onResendOtp()
          }}
          >
            <Text
              style={{
                width: '70%',
                color: Colors.CLR_0376FC,
                fontSize: 14,
                lineHeight: 17,
              }}>
              Resend OTP
            </Text>
          </TouchableOpacity>
        </View>
        <SingleBottomButton
          title="Verify OTP"
          onButtonPressed={() => {
            props.onVerifyOTPressed && props.onVerifyOTPressed(otp);
          }}
        />
      </View>
    </PopupConatiner>
  );
};

const SingleBottomButton = props => {
  return (
    <View
      style={{
        height: 65,
        marginTop: 30,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: Colors.CLR_2C3646,
      }}>
      <RPButton
        fontSize={18}
        width="100%"
        height="100%"
        backgroundColor={Colors.CLR_EE6F12}
        title={props.title}
        onPress={() => {
          props.onButtonPressed && props.onButtonPressed();
        }}
      />
    </View>
  );
};

export const RescheduleDateTimeModel = props => {
  const {deliverySlots, timeSlots, deliveryDateSlot, deliveryTimeSlot} = props;

  const [mdeliveryDateSlot, setMDeliveryDateSlot] = useState(deliveryDateSlot);
  const [mdeliveryTimeSlot, setMDeliveryTimeSlot] = useState(deliveryTimeSlot);
  const [mtimeSlots, setMTimeSlots] = useState(timeSlots);
  return (
    <PopupConatiner>
      <View
        style={{
          backgroundColor: Colors.WHITE,
          width: '100%',
          flexDirection: 'column',
          paddingTop: 20,
        }}>
        <CloseButtonHeader
          title={'Re-schedule Order'}
          onClose={() => {
            props.onClose && props.onClose();
          }}
        />
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginHorizontal: 20,
            marginTop: 10,
          }}>
          <Text
            style={{
              width: '70%',
              color: Colors.CLR_14273E,
              fontSize: 14,
              lineHeight: 17,
            }}>
            Re-Schedule Order
          </Text>
        </View>
        {deliverySlots && timeSlots && (
          <DeliveryDateTimeSlotBlock
            deliverySlots={deliverySlots}
            timeSlots={mtimeSlots}
            deliveryDateSlot={mdeliveryDateSlot}
            deliveryTimeSlot={mdeliveryTimeSlot}
            onDateSelected={item => {
              setMDeliveryDateSlot(item);
              setMTimeSlots(item.timeslot);
            }}
            onTimeSlotSelected={item => {
              setMDeliveryTimeSlot(item);
            }}
          />
        )}
        <SingleBottomButton
          title="Reschedule Now"
          onButtonPressed={() => {
            props.rescheduleNow &&
              props.rescheduleNow(mdeliveryDateSlot, mdeliveryTimeSlot);
          }}
        />
      </View>
    </PopupConatiner>
  );
};
export const RedeemModel = props => {
  const {onCancelClicked, onContinueClicked,pointFaceValue,walletpoint} = props;
  const pointsValue = pointFaceValue * walletpoint
  return (
    <PopupConatiner>
      <View
        style={{
          backgroundColor: Colors.CLR_00000090,
          width: '100%',
          flexDirection: 'column',
          paddingTop: 20,
          height: '100%',
          paddingHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: Colors.WHITE,
            borderRadius: 10,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 25,
          }}>
          <Image
            resizeMode="contain"
            style={{
              width: 120,
              height: 120,
            }}
            source={redeem_points}
          />
          <Text
            style={{
              color: Colors.CLR_17264D,
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 5,
            }}>
            Redeem Points
          </Text>
          <Text
            style={{
              color: Colors.CLR_17264D,
              fontSize: 14,
              marginTop: 5,
              textAlign: 'center',
              lineHeight: 20,
            }}>
            {`You are about to redeem ${walletpoint} points for Rs.${pointsValue}. Are you sure? you want to continue.`}
          </Text>
          <View
            style={{
              backgroundColor: Colors.WHITE,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                onCancelClicked();
              }}
              style={{
                width: '40%',
                height: 43,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: Colors.CLR_044BF7,
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <RPButton
              fontSize={18}
              width="50%"
              height={43}
              backgroundColor={Colors.CLR_044BF7}
              title={'Yes, Continue'}
              onPress={() => {
                onContinueClicked();
              }}
            />
          </View>
        </View>
      </View>
    </PopupConatiner>
  );
};

export const CongratesRedeemModel = props => {
  const {onCheckBalance,pointFaceValue,walletpoint} = props;
  const pointsValue = pointFaceValue * walletpoint

  return (
    <PopupConatiner>
      <View
        style={{
          backgroundColor: Colors.CLR_00000090,
          width: '100%',
          flexDirection: 'column',
          paddingTop: 20,
          height: '100%',
          paddingHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: Colors.WHITE,
            borderRadius: 10,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 25,
          }}>
          <View
            style={{
              width: '100%',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                props.onClose && props.onClose();
              }}>
              <Icon
                name={'close-circle-outline'}
                size={30}
                color={Colors.DARKGRAY}
              />
            </TouchableOpacity>
          </View>
          <Image
            resizeMode="contain"
            style={{
              width: 120,
              height: 120,
            }}
            source={ref_clap}
          />
          <Text
            style={{
              color: Colors.CLR_17264D,
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 5,
            }}>
            Congratulations
          </Text>
          <Text
            style={{
              color: Colors.CLR_17264D,
              fontSize: 14,
              marginTop: 5,
              textAlign: 'center',
              lineHeight: 20,
            }}>
            {`You have successfully converted your ${walletpoint} points for cash Rs.${pointsValue}.`}
          </Text>
          <View
            style={{
              backgroundColor: Colors.WHITE,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
              alignItems: 'center',
            }}>
            <RPButton
              fontSize={18}
              width="80%"
              height={43}
              backgroundColor={Colors.CLR_044BF7}
              title={'Check your Cash Balance'}
              onPress={() => {
                onCheckBalance();
              }}
            />
          </View>
        </View>
      </View>
    </PopupConatiner>
  );
};
export default RPModels;
