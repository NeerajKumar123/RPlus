import React from 'react';
import {Text, View, FlatList, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PromoCard from './PromoCard';
import * as Colors from '../constants/ColorDefs';
import LinearGradient from 'react-native-linear-gradient';
const RefsOffrers = props => {
  const {
    title = 'Offers of the Day',
    marginHorizontal = 18,
    backgroundColor = Colors.CLR_F4D13B,
    data
  } = props;
  if(data?.length <1) return null
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: backgroundColor,
        paddingVertical: 13,
        paddingHorizontal: 20,
        overflow: 'hidden',
        shadowColor: Colors.GRAY,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
        marginVertical: marginHorizontal,
      }}>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'left',
          textAlignVertical: 'center',
          color: Colors.CLR_1D2A39,
          fontWeight: 'bold',
          width: '100%',
        }}>
        {title}
      </Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{height: 10, width: 20}} />}
        style={{width: '100%', marginTop: 14}}
        contentContainerStyle={{paddingHorizontal: 10}}
        keyExtractor={(item, index) => 'key_' + index}
        data={data}
        renderItem={({item}) => {
          return (
            <AddMoneyRefCard
              item={item}
              onPress={() => {
                props?.onOfferOfTheDaySelected(item);
              }}
            />
          );
        }}
      />
    </View>
  );
};

const AddMoneyRefCard = props => {
  const {order_amount,offer_amount}  =props.item
  return (
    <LinearGradient
      colors={[Colors.CLR_4F379F, Colors.CLR_AA13BD]}
      style={{
        width: 178,
        alignItems: 'center',
        height: 94,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 16,
          color: Colors.WHITE,
        }}>
        {`Add Rs ${order_amount} \n& Get`}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 16,
          marginTop: 5,
          color: Colors.CLR_EE6F12,
        }}>
        {`Rs. ${offer_amount}`}
      </Text>
    </LinearGradient>
  );
};

export default RefsOffrers;
