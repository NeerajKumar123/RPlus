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
const milk_pack = require('../../assets/milk_pack.png');
import * as Colors from '../constants/ColorDefs';
const SubsListCard = props => {
  return (
    <View
      key={props.item.itemName}
      style={{
        backgroundColor: Colors.WHITE,
        marginTop: 10,
        flexDirection: 'row',
        borderRadius: 4,
        marginHorizontal: 10,
        paddingVertical: 15,
        shadowColor: Colors.GRAY,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
        paddingHorizontal:10
      }}>
      <Image
        style={{width: 59, height: 59}}
        source={milk_pack}
      />
      <View
        style={{
          flex: 5,
          justifyContent: 'center',
          marginHorizontal: 15,
        }}>
        <Text>Dhara kachhi ghani Mustrud oil</Text>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Text style={{fontWeight: 'bold'}}>Rs. 120</Text>
          <Text
            style={{
              textDecorationLine: 'line-through',
              textDecorationStyle: 'solid',
              marginHorizontal: 10,
              color:Colors.GRAY
            }}>
            Rs. 120
          </Text>
          <Text
            style={{
              borderRadius: 4,
              borderWidth: 1,
              borderColor: Colors.GREEN,
              paddingHorizontal: 5,
              fontWeight: 'bold',
              fontSize: 12,
              color: Colors.GREEN,
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>
            Rs. 120 OFF
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 2,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Icon
          name={'minus-circle-outline'}
          onPress={() => {
          }}
          size={30}
          color={Colors.ORANGE}
        />
        <Text>2</Text>
        <Icon
          name={'plus-circle-outline'}
          size={30}
          color={Colors.ORANGE}
          onPress={() => {
          }}
        />
      </View>
    </View>
  );
};

export default SubsListCard;
