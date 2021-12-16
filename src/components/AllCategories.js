import React from 'react';
import {Text, View, FlatList, Dimensions, Image} from 'react-native';
import * as Colors from '../constants/ColorDefs';
import {SquareShapeCardBaverage} from './SquareShapeCard';
const {width} = Dimensions.get('window');
const AllCategories = (props) => {
  const {data,onSelect = ()=>{}} = props
  const {vertical_name,category,vertical_id} = data
  return (
    <View
      style={{
        marginTop:10,
        alignItems: 'center',
        backgroundColor:Colors.WHITE,
        paddingVertical:13,
        shadowColor: Colors.GRAY,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
        backgroundColor:Colors.CLR_333F5E,
      }}>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'left',
          textAlignVertical: 'center',
          color: Colors.WHITE,
          fontWeight: 'bold',
          width:'100%',
          paddingHorizontal:32
        }}>
       {vertical_name}
      </Text>
      <FlatList
        showsHorizontalScrollIndicator = {false}
        horizontal = {true}
        ItemSeparatorComponent={() => <View style={{height: 10, width:20}} />}
        style={{width: width, marginTop: 14, paddingVertical:5, paddingHorizontal:32}}
        keyExtractor={(item, index) => 'key_' + index}
        data={category}
        renderItem={({item, index}) => {
          return (
          <SquareShapeCardBaverage
            item={item}
            marginRight = {index == category.length - 1 ? 64 : 0}
            onPress={() => {
              onSelect({...item,vertical_id:vertical_id,vertical_name:vertical_name })
            }}
          />)
        }}
      />
    </View>
  );
};

export default AllCategories;
