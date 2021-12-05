import React from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import HotDealsCard ,{HotDealsCard2} from './HotDealsCard';
import * as Colors from '../constants/ColorDefs';

const HotDeals = props => {
  const {details} = props;
  const deals = details.product;
  return (
    <View
      style={{
        marginTop: 10,
        alignItems: 'center',
        paddingVertical: 13,
        backgroundColor: Colors.CLR_E7ECF2,
        paddingHorizontal: 18,
      }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'column',
            width: '60%',
          }}>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'left',
              textAlignVertical: 'center',
              color: Colors.CLR_1D2A39,
              fontWeight: 'bold',
            }}>
            Hot Deals
          </Text>
        </View>
        {/* <View
          style={{
            flexDirection: 'column',
            width: '40%',
          }}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              fontSize: 12,
              textAlign: 'left',
              textAlignVertical: 'center',
              fontWeight: 'bold',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: Colors.CLR_4147D4,
              }}>
              View All
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
      <FlatList
        style={{marginTop: 12, width:'100%'}}
        horizontal={false}
        keyExtractor={(item, index) => 'key_' + index}
        data={deals}
        renderItem={({item}) => (
         <HotDealsCard2
            item={item}
            onLoaderStateChanged = {(isLoading) =>{
              props.onLoaderStateChanged(isLoading)
            }}
            onItemPressed={() => {
              props.onItemPressed(item);
            }}
          />
        )}
      />
    </View>
  );
};

export default HotDeals;
