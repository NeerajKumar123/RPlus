import React from 'react';
import {Text, View, FlatList, Image} from 'react-native';
import SquareShapeCard from './SquareShapeCard';
import * as Colors from '../constants/ColorDefs';
const Category2by2TypeOne = (props) => {
  const {data,onSelect = ()=>{}}  = props
  const {vertical_name,category,vertical_id} = data
  return (
    <View
      style={{
        marginTop:10,
        alignItems: 'center',
        backgroundColor:Colors.WHITE,
        paddingVertical:13,
        paddingHorizontal:32,
        shadowColor: Colors.GRAY,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
        marginBottom:10,
        elevation:2,
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
        {vertical_name}
      </Text>
      <FlatList
        style={{width: '100%', marginTop: 14, paddingVertical:5,paddingHorizontal:3}}
        showsHorizontalScrollIndicator = {false}
        ItemSeparatorComponent={() => (
          <View style={{height: 14}} />
        )}
        numColumns = {2}
        keyExtractor={(item, index) => 'key_' + index}
        data={category}
        renderItem={({item, index}) => {
          return (
          <SquareShapeCard
            item={item}
            marginRight = {index % 2 == 0 ? 14 : 0}
            onPress={() => {
              onSelect({...item,vertical_id:vertical_id,vertical_name:vertical_name })
            }}
          />)
        }}
      />
    </View>
  );
};

export default Category2by2TypeOne;
