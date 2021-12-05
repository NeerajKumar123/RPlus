import React , {useState} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import ComboOffersCard from './ComboOffersCard';
import * as Colors from '../constants/ColorDefs';

const buy_get_free = require('../../assets/buy_get_free.png');

const ComboOffers = (props) => {
  const hotDeals = props.data.product
  let slicedHotDeals = hotDeals
  slicedHotDeals = slicedHotDeals.slice(0,3)
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <View
      style={{
        marginTop: 10,
        alignItems: 'center',
        paddingVertical: 13,
        shadowColor: Colors.GRAY,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
        backgroundColor: Colors.CLR_4147D4,
      }}>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 30,
          flexDirection: 'row',
        }}>
        <View
          style={{
            flexDirection: 'column',
          }}>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'left',
              textAlignVertical: 'center',
              color: Colors.WHITE,
              fontWeight: 'bold',
            }}>
            Combo Offres
          </Text>
          <Text
            style={{
              fontSize: 12,
              textAlign: 'left',
              textAlignVertical: 'center',
              color: Colors.WHITE,
              opacity: 0.71,
              marginTop: 6,
            }}>
            Buy More Save more
          </Text>
        </View>
        <Image
          style={{
            width: 72,
            height: 48,
            marginLeft: 15,
          }}
          source={buy_get_free}
        />
      </View>
      <FlatList
        style={{width: '100%', marginTop: 12, paddingHorizontal: 10}}
        horizontal={false}
        keyExtractor={(item, index) => 'key_' + index}
        data={!isExpanded ? slicedHotDeals : hotDeals}
        renderItem={({item}) => <ComboOffersCard item={item} />}
      />
      <TouchableOpacity
            onPress={() => {
              setIsExpanded(!isExpanded)
            }}
            style={{
              fontSize: 12,
              textAlign: 'left',
              textAlignVertical: 'center',
              fontWeight: 'bold',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop:17,
              borderRadius: 4,
              paddingHorizontal:5,
              paddingVertical:6,
              backgroundColor:'#3338B3'
            }}>
            <Text
              style={{
              paddingHorizontal: 5,
              color:Colors.WHITE
              }}>
              View More
            </Text>
          </TouchableOpacity>
    </View>
  );
};

export default ComboOffers;
