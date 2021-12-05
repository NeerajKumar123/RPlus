import React from 'react';
import {Text, View, FlatList, Image} from 'react-native';
import PromoCard from './PromoCard';
import * as Colors from '../constants/ColorDefs';
const Promos = (props) => {
  const promos = props.data
  return (
    <View
      style={{
        marginTop:10,
        alignItems: 'center',
        backgroundColor:Colors.WHITE,
        paddingVertical:13,
        paddingHorizontal:20,
        borderRadius: 4,
        shadowColor: Colors.GRAY,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
      }}>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'left',
          textAlignVertical: 'center',
          color: Colors.CLR_1D2A39,
          fontWeight: 'bold',
          width:'100%'
        }}>
        Promos for you
      </Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator = {false}
        ItemSeparatorComponent={() => <View style={{height: 10, width:20}} />}
        style={{width: '100%', marginTop: 14, paddingVertical:5}}
        keyExtractor={(item, index) => 'key_' + index}
        data={promos}
        renderItem={({item}) => {
          return (
          <PromoCard
            item={item}
            onPress={() => {
              props?.onPromoSelected(item)
            }}
          />)
        }}
      />
    </View>
  );
};

export default Promos;
