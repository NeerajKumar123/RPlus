import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../components/AppHeader';
import RPButton from '../components/RPButton';
import { RPInputAddress } from '../components/RPInput';
import RPLoader from '../components/RPLoader';
import { updateToaddress, addToaddress, getAddressByLatLong } from '../apihelper/Api';
import * as Colors from '../constants/ColorDefs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from '@react-native-community/geolocation';
const detector_blue = require('../../assets/detector_blue.png');
const user = require('../../assets/user.png');
const mail = require('../../assets/mail.png');
const mobile_icon = require('../../assets/mobile.png');
import AppConfigData from '../constants/AppConfigData'
import * as Validator from '../helpers/RPValidator';
import { RP_REGEX } from '../constants/StaticValues';


const AddNewAddress = props => {
  const AppData = AppConfigData()
  const navigation = useNavigation();
  const userInfo = global.userInfo ? global.userInfo : {};
  const storeInfo = global.storeInfo ? global.storeInfo : {};
  const address = props ?.route ?.params ?? {};
  const [coords, setCoords] = useState(undefined);
  const isUpdateAddress = address && address.isUpdateAddress;
  let pageTitle = address ?.title;
  if (isUpdateAddress) {
    pageTitle = 'Update Address'
  }
  const {
    pincode = '',
    name = '',
    contact = '',
    city = '',
    house_no = '',
    state = '',
    street = '',
    landmark = '',
    address_id = 0,
    email
  } = address && address;
  const address_type = {name:address?.address_type || 'home'}
  const [mpincode, setPincode] = useState(pincode);
  const [mname, setName] = useState(name);
  const [memail, setEmail] = useState(email);
  const [mmobile, setMobile] = useState(contact);
  const [mcity, setCity] = useState(city);
  const [mstate, setState] = useState(state);
  const [mhouseNo, setHouseNo] = useState(house_no);
  const [mstreet, setStreet] = useState(street);
  const [mlandmark, setLandmark] = useState(landmark);
  const [maddressType, setAddressType] = useState(address_type);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (coords) {
      setIsLoading(true);
      getAddressByLatLong(coords.latitude, coords.longitude, res => {
        setIsLoading(false);
        filterResults(res)
      });
    }
  }, [coords])


  const filterResults = (res) => {
    const status = res.status
    if (status == "OK") {
      const results = res.results
      const firstObj = results[0]

      const addresscomps = firstObj.address_components

      //settting addresss on global, so that we can access it anywhere in app
      global.currentLocationAddresss = addresscomps.formatted_address;


      //getting and updating pincode value 
      const pincodesObjs = addresscomps.filter((elem) => {
        return elem.types.includes('postal_code')
      })
      const pincode = pincodesObjs[0]
      const x = pincode.long_name
      setPincode(x)
      global.pincode = x;

      //getting and updating state value 
      const statesobj = addresscomps.filter((elem) => {
       return elem.types.includes('administrative_area_level_1')
      })
      const state = statesobj[0]
      const state1 = state.long_name
      setState(state1)

      //getting and updating city value 
      const cityobjs = addresscomps.filter((elem) => {
        return elem.types.includes('administrative_area_level_2')
      })
      const city = cityobjs[0]
      const cityname = city.long_name
      setCity(cityname)
      
      //getting and updating local value 
      const localityobjs = addresscomps.filter((elem) => {
        return elem.types.includes('sublocality_level_1')
      })
      const local = localityobjs[0]
      const localll = local.long_name
      setStreet(localll)
    } else if (status == "OVER_QUERY_LIMIT") {
      Alert.alert(status.title_alert, 'OVER_QUERY_LIMIT');
    }
    else if (status == "ZERO_RESULTS") {
      Alert.alert(status.title_alert, 'ZERO_RESULTS');
    }
    else if (status == "REQUEST_DENIED") {
      Alert.alert(status.title_alert, 'REQUEST_DENIED');
    }
    else if (status == "INVALID_REQUEST") {
      Alert.alert(status.title_alert, 'INVALID_REQUEST');
    }
    else if (status == "UNKNOWN_ERROR") {
      Alert.alert(status.title_alert, 'UNKNOWN_ERROR');
    }
    else {
      Alert.alert(status.title_alert, 'Something went wrong.')
    }


    // const firstObj = res?.results?.[0]
    // if (fpincode && formatedAddress) {
    //   global.currentLocationAddresss = formatedAddress;
    //   global.pincode = fpincode;
    //   setPincode(fpincode)
    //   setCity(fcity)
    //   setState(fstate)
    // } else {
    //   Alert.alert(AppData.title_alert,'Error while accessing pincode and Address');
    // }

  }

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getOneTimeLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          getOneTimeLocation();
        } else {
          console.log('Permission Denied')
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const getOneTimeLocation = () => {
    let configs = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 100000,
    };
    Geolocation.getCurrentPosition(
      position => {
        setCoords(position.coords);
      },
      error => {
        console.log('error', error);
      },
      configs,
    );
  };

  const checkFormValidations = () => {
    let isValidForm = true;
    if (mpincode == undefined || mpincode.length < 6) {
      isValidForm = false;
      Alert.alert(AppData.title_alert, 'Please enter valid pincode.');
    } else if (mname == undefined || mname.length < 2) {
      isValidForm = false;
      Alert.alert(AppData.title_alert, 'Please enter valid name.');
    }else if (!Validator.isValidField(memail, RP_REGEX.Email)) {
      isValidForm = false;
      Alert.alert(AppData.title_alert, 'Please enter valid email.');
    }else if (!Validator.isValidField(mmobile, RP_REGEX.Mobile)) {
      isValidForm = false;
      Alert.alert(AppData.title_alert, 'Please enter valid mobile number.');
    } else if (mcity == undefined || mcity.length < 3) {
      isValidForm = false;
      Alert.alert(AppData.title_alert, 'Please enter valid city.');
    } else if (mstate == undefined || mstate.length < 2) {
      isValidForm = false;
      Alert.alert(AppData.title_alert, 'Please enter valid state.');
    } else if (mhouseNo == undefined || mhouseNo.length < 1) {
      isValidForm = false;
      Alert.alert(AppData.title_alert, 'Please enter valid house number.');
    }else if (mlandmark == undefined || mlandmark?.length < 1) {
      isValidForm = false;
      Alert.alert(AppData.title_alert, 'Please enter valid Landmark.');
    }
    else if (maddressType == undefined || maddressType?.name?.length < 1) {
      isValidForm = false;
      Alert.alert(AppData.title_alert, 'Please enter valid Address Type.');
    }
    return isValidForm;
  };


  return (
    <View style={{ flex: 1, backgroundColor: Colors.CLR_E7ECF2 }}>
      <AppHeader
        isLeftIconEnabeld={true}
        title={pageTitle}
        onLeftPress={() => {
          navigation.goBack();
        }}
      />
      {isLoading && <RPLoader />}
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 50,
            alignItems: 'center',
          }}
          keyboardShouldPersistTaps="handled">
          <RPButton
            title="Detect my location "
            width="90%"
            height={44}
            marginTop={20}
            backgroundColor={Colors.WHITE}
            titleColor={Colors.CLR_0376FC}
            imageSource={detector_blue}
            onPress={() => {
              requestLocationPermission()
            }}
          />
          <View
            style={{
              width: '100%',
              paddingHorizontal: 20,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: Colors.BLACK,
                width: '100%',
              }}>
              Add Delivery Address
          </Text>
            <RPInputAddress //phone-pad
              value={mpincode}
              maxLength={6}
              keyboardType={'phone-pad'}
              placeholder="Enter pincode"
              onEndEditing={value => {
                setPincode(value);
              }}
            />
            <RPInputAddress
              maxLength={30}
              value={mname}
              isLeftIconSource={user}
              placeholder="Enter Your Name"
              onEndEditing={value => {
                setName(value);
              }}
            />
            <RPInputAddress
              maxLength={50}
              value={memail}
              isLeftIconSource={mail}
              placeholder="Enter Your Email Address"
              onEndEditing={value => {
                setEmail(value);
              }}
            />
            <RPInputAddress
              maxLength={10}
              keyboardType={'phone-pad'}
              value={mmobile}
              placeholder="Enter Mobile Number"
              isLeftIconSource={mobile_icon}
              onEndEditing={value => {
                setMobile(value);
              }}
            />
            <RPInputAddress
              maxLength={40}
              value={mcity}
              placeholder="Select City"
              onEndEditing={value => {
                setCity(value);
              }}
            />
            <RPInputAddress
              maxLength={40}
              value={mstate}
              placeholder="Select State"
              onEndEditing={value => {
                setState(value);
              }}
            />
            <RPInputAddress
              value={mhouseNo}
              maxLength={20}
              placeholder="House No/Apartment No"
              onEndEditing={value => {
                setHouseNo(value);
              }}
            />
            <RPInputAddress
              maxLength={30}
              value={mstreet}
              placeholder="Locality/Area /Street"
              onEndEditing={value => {
                setStreet(value);
              }}
            />
            <RPInputAddress
              maxLength={30}
              value={mlandmark}
              placeholder="Landmark"
              onEndEditing={value => {
                setLandmark(value);
              }}
            />
          </View>
          <AddressTypeBlock
            addressType={maddressType}
            typeSelected={type => {
              console.log('type',type)
              setAddressType(type);
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <Footer
        isUpdateAddress={isUpdateAddress}
        onSaveAddressPressed={() => {
          if (checkFormValidations()) {
            setIsLoading(true)
            const commonParams = {
              store_id: storeInfo.id,
              customer_id: userInfo.customer_id,
              pincode: mpincode,
              name: mname,
              contact: mmobile,
              email: userInfo.email,
              city: mcity,
              state: mstate,
              house_no: mhouseNo,
              street: mstreet,
              landmark: mlandmark,
              address_type: maddressType?.name || 'home',
              email:memail
            };
            if (address_id) {
              const params = { ...commonParams, address_id: address_id };
              updateToaddress(params, res => {
                setIsLoading(false)
                navigation.goBack();
              });
            } else {
              addToaddress(commonParams, res => {
                setIsLoading(false)
                if (res.status == -1) {
                  Alert.alert(AppData.title_alert, `Entered address can not be ${isUpdateAddress ? 'updated.' : 'saved.'}`)
                } else {
                  navigation.goBack();
                }
              });
            }
          }
        }}
      />
    </View>
  );
};

const Footer = props => {
  const { isUpdateAddress } = props;
  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: Colors.CLR_EE6F12,
      }}
      onPress={() => {
        props.onSaveAddressPressed();
      }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.WHITE }}>
        {isUpdateAddress ? 'Update Address' : 'Save Address'}
      </Text>
    </TouchableOpacity>
  );
};
const AddressTypeBlock = props => {
  const { addressType = { name: 'Home' }} = props;
  const types = [{ name: 'Home' }, { name: 'Office' }, { name: 'Other' }];
  return (
    <View
      style={{
        flexDirection: 'column',
        paddingVertical: 10,
        marginHorizontal: 10,
        marginBottom: 20,
        width: '90%',
      }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: Colors.BLACK,
          width: '100%',
        }}>
        Address Type
      </Text>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        {types.map(item => {
          return (
            <TouchableOpacity
              key={item.name}
              style={{
                paddingHorizontal: 30,
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                flexDirection: 'row'
              }}
              onPress={() => {
                props.typeSelected(item);
              }}>
              <Icon
                name={item.name?.toLowerCase() == addressType?.name?.toLowerCase()
                    ? 'radiobox-marked'
                    : 'radiobox-blank'
                }
                onPress={() => {
                }}
                size={20}
                color={Colors.CLR_0376FC}
              />
              <Text
                style={{ marginLeft: 5, fontSize: 14, color: Colors.CLR_49537D }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
export default AddNewAddress;
