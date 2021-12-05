import React from 'react';
import {Text, View, FlatList, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PromoCard from './PromoCard';
import * as Colors from '../constants/ColorDefs';
const OffersOfTheDay = (props) => {
  const offers = props.data
  const {title = 'Offers of the Day',marginHorizontal = 18, backgroundColor =Colors.CLR_F4D13B } = props
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor:backgroundColor,
        paddingVertical:13,
        paddingHorizontal:20,
        overflow:'hidden',
        shadowColor: Colors.GRAY,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
        marginVertical:marginHorizontal,
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
        {title}
      </Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator = {false}
        ItemSeparatorComponent={() => <View style={{height: 10, width:20}} />}
        style={{width: '100%', marginTop: 14}}
        contentContainerStyle = {{paddingHorizontal:10}}
        keyExtractor={(item, index) => 'key_' + index}
        data={offers}
        renderItem={({item}) => {
          return (
          <PromoCard
            item={item}
            onPress={() => {
              props?.onOfferOfTheDaySelected(item)
            }}
          />)
        }}
      />
    </View>
  );
};

export default OffersOfTheDay;
