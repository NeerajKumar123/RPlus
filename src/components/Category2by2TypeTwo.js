import React from 'react';
import {Text, View, FlatList, Image} from 'react-native';
import {SquareShapeCardDryFruit} from './SquareShapeCard';
import * as Colors from '../constants/ColorDefs';
const Category2by2TypeTwo = (props) => {
  const hbData = props.data
  return (
    <View
      style={{
        marginTop:10,
        alignItems: 'center',
        backgroundColor:Colors.WHITE,
        paddingVertical:13,
        paddingHorizontal:20,
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
        Dry Fruits
      </Text>
      <FlatList
        showsHorizontalScrollIndicator = {false}
        numColumns = {2}
        ItemSeparatorComponent={() => <View style={{height: 10, width:20}} />}
        style={{width: '100%', marginTop: 14, paddingVertical:5}}
        keyExtractor={(item, index) => 'key_' + index}
        data={hbData}
        renderItem={({item}) => {
          return (
          <SquareShapeCardDryFruit
            item={item}
            marginRight = {10}
            onPress={() => {
              props?.onCardClicked(item)
            }}
          />)
        }}
      />
    </View>
  );
};

export default Category2by2TypeTwo;
