import React, {useState,useEffect} from 'react';
import {Text, View, Image,FlatList,Share,PermissionsAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RPButton from '../components/RPButton'
import RPLoader from '../components/RPLoader'
import Geolocation from '@react-native-community/geolocation';
import * as Colors from '../constants/ColorDefs';
const location =  require('../../assets/location.png')
const detector =  require('../../assets/detector.png')

const Locator = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const requestLocationPermission = async () => {
    setIsLoading(true)
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('whenInUse')
      getOneTimeLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'Turning on location service allows us to connect you with our nearest store and deliver your order efficiently.',
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
        navigation.navigate('Stores',{location:position.coords});
        setIsLoading(false)
      },
      error => {
        setIsLoading(false)
      },
      configs,
    );
  };
  
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}>
      <View
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Image
          resizeMode="contain"
          style={{width: 300}}
          source={location}
        />
      </View>
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 17,
            textAlign: 'left',
            textAlignVertical: 'center',
            color: Colors.BLACK,
            fontWeight: 'bold',
            marginBottom: 8,
          }}>
          Delivery Location
        </Text>
        {isLoading && <RPLoader />}
        <Text
          style={{
            fontSize: 12,
            textAlign: 'left',
            textAlignVertical: 'center',
            color: Colors.GRAY,
            fontWeight: '500',
            marginBottom: 30,
          }}>
          Set your delivery location to browse stores near you.
        </Text>
        <RPButton
          title={'Detect my location'}
          imageSource={detector}
          onPress={() => {
            requestLocationPermission();      
          }}
        />
        <Text
          style={{
            fontSize: 12,
            textAlign: 'left',
            textAlignVertical: 'center',
            color: Colors.BLACK,
            fontWeight: '500',
            marginVertical: 20,
          }}>
          OR
        </Text>
        <RPButton
          title={'Set location manually'}
          backgroundColor={Colors.CLR_DEECF7}
          titleColor={Colors.CLR_49537D}
          onPress={() => {
            navigation.navigate('SetAddressOnMap');
          }}
        />
      </View>
    </View>
  );
};

export default Locator;
