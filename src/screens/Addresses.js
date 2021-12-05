import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity,DeviceEventEmitter} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppHeader from '../components/AppHeader';
import AddressCard from '../components/AddressCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getAddressList, removeToaddress} from '../apihelper/Api';
import * as Colors from '../constants/ColorDefs';
import {useIsFocused} from '@react-navigation/native';
import RPLoader from '../components/RPLoader';
import NoData from '../components/NoData';
const empty_orders_image = require('../../assets/empty_orders_image.png');
const Addresses = props => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState(undefined);
  const [selectedAdd, setSelectedAdd] = useState({});
  const userInfo = global.userInfo ? global.userInfo : {};
  const storeInfo = global.storeInfo ? global.storeInfo : {};
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [isAddressFetchingDone, setIsAddressFetchingDone] = useState(false);
  const updateAddList = () => {
    setIsLoading(true);
    const params = {store_id: storeInfo.id, customer_id: userInfo.customer_id};
    getAddressList(params, res => {
      setAddresses(res?.payload_addressList);
      setIsAddressFetchingDone(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    });
  };
  useEffect(() => {
    updateAddList();
  }, [isFocused]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.CLR_E7ECF2,
        paddingBottom:30
      }}>
      <AppHeader
        title="Addresses"
        isLeftIconEnabeld={true}
        onLeftPress={() => {
          navigation.goBack();
        }}
      />
      <View
        style={{
          flex: 1,
          width: '100%',
          paddingHorizontal: 20,
        }}>
        {addresses && addresses.length > 0 && (
          <AddNewAddressBlock
            adrss = {addresses}
            addNewAddressPressed={() => {
              navigation.navigate('AddNewAddress',{title: addresses?.length > 0 ? 'Add new address' : 'Add address' });
            }}
          />
        )}
        {isLoading && <RPLoader />}
        {isAddressFetchingDone && !addresses.length && (
          <NoData
            image={empty_orders_image}
            title={'No Delivery Address'}
            subtitle={'Add address where you need your delivery'}
            buttonTitle={'Add address'}
            onButtonPress={() => {
              navigation.navigate('AddNewAddress');
            }}
          />
        )}
        {addresses && addresses.length > 0 && (
          <FlatList
            style={{width: '100%', marginTop: 12}}
            horizontal={false}
            keyExtractor={(item, index) => 'key_' + index}
            data={addresses}
            ListHeaderComponent={<ListHeader  count = {addresses.length}/>}
            renderItem={({item}) => (
              <AddressCard
                item={item}
                selectedAddress = {selectedAdd}
                isFromAccount={global.isFromAccount}
                onAddressSelection = {()=>{
                  DeviceEventEmitter.emit('add_selected',item)
                  navigation.goBack();
                }}
                onDeletePressed={() => {
                  const params = {
                    store_id: storeInfo?.id,
                    customer_id: userInfo?.customer_id,
                    address_id: item.address_id,
                  }
                  setIsLoading(true)
                  removeToaddress(params, () => {
                    updateAddList();
                  });
                }}
                onEditPressed={() => {
                  navigation.navigate('AddNewAddress', {
                    ...item,
                    isUpdateAddress: true,
                  });
                }}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

const AddNewAddressBlock = props => {
  return (
    <View
      style={{
        width: '100%',
        height: 61,
        marginTop: 10,
        borderRadius: 4,
        overflow: 'hidden',
        paddingLeft: 5,
        backgroundColor: Colors.CLR_0376FC,
      }}>
      <TouchableOpacity
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          height: '100%',
          backgroundColor: Colors.WHITE,
          paddingHorizontal: 20,
        }}
        onPress={() => {
          props.addNewAddressPressed && props.addNewAddressPressed();
        }}>
        <Text
          style={{
            fontSize: 16,
            color: Colors.CLR_313131,
          }}>
          {props.adrss?.length > 0 ?  'Add new address' : 'Add address'}
        </Text>
        <Icon
          name={'plus'} //radiobox-blank
          onPress={() => {
            props.addNewAddressPressed && props.addNewAddressPressed();
          }}
          size={30}
          color={Colors.CLR_02A3FC}
        />
      </TouchableOpacity>
    </View>
  );
};
const ListHeader = props => {
  const {count} = props
  return (
    <View
      style={{
        height: 44,
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: Colors.CLR_313131,
        }}>
        {`Saved Address`}
      </Text>
      <Text
        style={{
          marginLeft: 3,
          fontSize: 16,
          color: Colors.CLR_313131,
        }}>
        {`(${count})`}
      </Text>
    </View>
  );
};
export default Addresses;
