import React from 'react';
import {
  Platform,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const {width} = Dimensions.get('window');
import * as Colors from '../constants/ColorDefs';

const AddressCard = props => {
  const {item, isFromAccount, onAddressSelection,selectedAddress} = props;
  const {contact, name, email, city, landmark, state, pincode} = item;
  const displayAdd = `Near ${landmark}, ${city}, ${state}(${pincode})`;
  const isSelected = item.address_id == selectedAddress.address_id
  return (
    <TouchableOpacity
      onPress={(item) => {
        onAddressSelection(item);
      }}
      key={item.itemName}
      style={{
        backgroundColor: Colors.WHITE,
        marginTop: 10,
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'column',
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        {!isFromAccount && (
          <View
            style={{
              flexDirection: 'row',
              width: 30,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 5,
            }}>
            <Icon
              name={isSelected ? 'radiobox-marked' : 'radiobox-blank'}
              size={20}
              color={Colors.CLR_0376FC}
            />
          </View>
        )}
        <View style={{flex: 1}}>
          <Text style={{color: Colors.CLR_161E42, fontSize: 14, marginTop: 12}}>
            {name}
          </Text>
          <Text style={{color: Colors.CLR_161E42, fontSize: 14, marginTop: 12}}>
            {displayAdd}
          </Text>
          <Text style={{color: Colors.CLR_161E42, fontSize: 14, marginTop: 12}}>
            {`+91 -${contact}`}
          </Text>
          <Text style={{color: Colors.CLR_161E42, fontSize: 14, marginTop: 12}}>
            {email}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            height: 35,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}
          onPress={() => {
            props.onDeletePressed && props.onDeletePressed();
          }}>
          <Text
            style={{
              color: Colors.CLR_DD5E5E,
              fontWeight: 'bold',
              fontSize: 14,
            }}>
            Delete
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 35,
            width: 73,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: Colors.CLR_0376FC,
            borderRadius: 4,
            borderWidth: 1,
            paddingHorizontal: 15,
          }}
          onPress={() => {
            props.onEditPressed && props.onEditPressed();
          }}>
          <Text
            style={{
              color: Colors.CLR_0376FC,
              fontWeight: 'bold',
              fontSize: 14,
            }}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default AddressCard;
