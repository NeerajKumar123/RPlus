import React from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import SubsCard from './SubsCard';
import * as Colors from '../constants/ColorDefs';

const SubscriptionsBlock = () => {
  const deals = [
    {
      image: 'https://picsum.photos/200/300',
    },
    {
      image: 'https://picsum.photos/200/300',
    },
    {
      image: 'https://picsum.photos/200/300',
    },
    {
      image: 'https://picsum.photos/200/300',
    }
    
  ];
  return (
    <View
      style={{
        marginTop: 10,
        paddingVertical: 13,
        borderRadius: 8,
        marginHorizontal:20,
        paddingHorizontal:20,
        backgroundColor: Colors.WHITE,
      }}>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'left',
          color: Colors.BLACK,
          fontWeight: 'bold',
          width: '100%',
        }}>
        Products Subscription
      </Text>
      <FlatList
        horizontal={false}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{height: 14, width:10}} />}
        style={{width: '100%', marginTop: 10, flex:1}}
        keyExtractor={(item, index) => 'key_' + index}
        data={deals}
        renderItem={({item, index}) => (
          <SubsCard
            item={item}
            index={index}
            addClicked = {() =>{
            }}
            subsClicked={() => {
            }}
          />
        )}
      />
    </View>
  );
};

export default SubscriptionsBlock;
