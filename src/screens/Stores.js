import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StoreCard from '../components/StoreCard';
import NoData from '../components/NoData';
import {
  getStoreList,
  getAddressByLatLong,
} from '../apihelper/Api.js';
import RPLoader from '../components/RPLoader';
import * as Colors from '../constants/ColorDefs';
import * as Storage from '../helpers/RPStorage';
import { isEmpty } from '../helpers/BaseUtility';
const home_bg = require('../../assets/home_bg.png');
const detector = require('../../assets/detector.png');
const empty_orders_image = require('../../assets/empty_orders_image.png');
const no_store = require('../../assets/no_store.png');
import { Config } from '../constants/StaticValues'
import * as RPCartManager from '../helpers/RPCartManager';
import {useIsFocused} from '@react-navigation/native';
import AppConfigData from '../constants/AppConfigData'

const Stores = props => {
  const AppData = AppConfigData()
  const navigation = useNavigation();
  const { location } = props?.route?.params;
  const isFocused = useIsFocused();
  const [stores, setStores] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [addressByLatLong, setAddressByLatLong] = useState('');
  const [dataFetchingDone, setDataFetchingDone] = useState(false);

  const initiateAddFetching = () =>{
    setIsLoading(true);
    getAddressByLatLong(location.latitude, location.longitude, address => {
      const fetchedAddress = address?.results?.[0];
      const formatedAddress = fetchedAddress?.formatted_address;
      const pindoeObj = fetchedAddress?.address_components?.slice(-1)[0];
      if (address && address.status != 1 && pindoeObj && pindoeObj.long_name && formatedAddress) {
        setAddressByLatLong(formatedAddress);
        global.currentLocationAddresss = formatedAddress;
        global.pincode = pindoeObj.long_name;
        getStoreList({pincode: pindoeObj.long_name},AppData?.storeListingName,  response => {
          setIsLoading(false);
          setStores(response.payload);
          setDataFetchingDone(true);
        });
      } else {
        setIsLoading(false);
        setDataFetchingDone(true);
        Alert.alert(
          AppData.title_alert,
          'Error while accessing pincode and address',
        );
      }
    });
  }

  useEffect(() => {
    if (isFocused) {
      initiateAddFetching()
    }
  }, [isFocused]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor:Colors.WHITE
      }}>
      {isLoading && <RPLoader />}
      <View
        style={{
          backgroundColor: Colors.CLR_1D2237,
          width: '100%',
          alignItems: 'center',
        }}>
        <Image
          resizeMode="contain"
          style={{ width: 193, height: 155, marginTop: 50 }}
          source={home_bg}
        />
        <Text
          style={{
            marginTop: 15,
            fontSize: 18,
            textAlign: 'left',
            textAlignVertical: 'center',
            color: Colors.WHITE,
            fontWeight: 'bold',
            marginBottom: 8,
          }}>
          Delivery Location
        </Text>
        <Text
          style={{
            marginTop: 2,
            fontSize: 14,
            textAlign: 'left',
            textAlignVertical: 'center',
            color: Colors.WHITE,
            opacity: 0.67,
            fontWeight: '500',
          }}>
          Set your delivery location to browse stores near you.
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Locator');
          }}
          style={{
            backgroundColor: Colors.CLR_353C59,
            marginHorizontal: 15,
            width: '90%',
            alignItems: 'center',
            flexDirection: 'row',
            padding: 13,
            marginTop: 17,
            marginBottom: 11,
            borderRadius: 2
          }}>
          <Image
            resizeMode="contain"
            style={{ width: 20, height: 20, marginRight: 10 }}
            source={detector}
          />
          <Text
            style={{
              marginTop: 2,
              fontSize: 12,
              textAlign: 'left',
              textAlignVertical: 'center',
              color: Colors.WHITE,
              fontWeight: '500',
              flex: 1
            }}>
            {addressByLatLong}
          </Text>
        </TouchableOpacity>
      </View>
      {dataFetchingDone && isEmpty(stores) && (
        <NoData
          image={no_store}
          bgColor = {Colors.CLR_044BF7}
          title={'Store not available'}
          subtitle={'There is no any store available in your searched area.'}
          buttonTitle={'Search Location'}
          onButtonPress={() => {
            navigation.navigate('Locator');
          }}
        />
      )}
      {stores  && (
        <FlatList
          style={{
            width: '100%',
            marginTop: 12,
            paddingHorizontal: 10,
            marginBottom: 30,
          }}
          horizontal={false}
          keyExtractor={(item, index) => 'key_' + index}
          data={stores}
          renderItem={({ item }) => (
            <StoreCard
              item={item}
              currentLoc={location}
              onPress={() => {
                RPCartManager.decideAndGetCartData(cartItems => {
                  const count = cartItems && cartItems.length ? cartItems.length : 0;
                  const store = global.storeInfo
                  if (store &&  item && store.id != item.id && cartItems.length > 0) {
                    const options = [
                      {
                        text: 'Cancel',
                        onPress: () => {
                        }
                      },
                      {
                        text: 'Clear Cart',
                        onPress: () => {
                          Storage.clearCartData()
                          Storage.clearStoresCart();
                          Storage.saveStoreInfo(item, () => {
                            global.storeInfo = item;
                            navigation.navigate('DashboardContainer', {
                              storeDetails: item,
                            });
                          });      
                        }
                      }
                    ]
                    Alert.alert(AppData.title_alert, `Your cart contains items from ${store.store_name}. Do you want to abandon the cart add items from ${item.store_name}?`, options)
                  } else {
                    Storage.saveStoreInfo(item, () => {
                      global.storeInfo = item;
                      navigation.navigate('DashboardContainer', {
                        storeDetails: item,
                      });
                    });
                  }
                });
            

              }}
            />
          )}
        />
      )}
    </View>
  );
};

export default Stores;
