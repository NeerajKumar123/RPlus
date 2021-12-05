import React from 'react';
import {Text, View, FlatList, Image,Dimensions} from 'react-native';
import {Category3by3BlockCard} from './CategoryCard';
import * as Colors from '../constants/ColorDefs';
const { height, width } = Dimensions.get('window');
const Category3by3Block = (props) => {
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
        paddingHorizontal:32,
      }}>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'left',
          textAlignVertical: 'center',
          color: Colors.CLR_1D2A39,
          fontWeight: 'bold',
          width:'100%',
        }}>
        {vertical_name}
      </Text>
      <FlatList
        numColumns = {3}
        showsHorizontalScrollIndicator = {false}
        contentContainerStyle = {{justifyContent:'space-between'}}
        style={{width:'100%', marginTop: 14, paddingVertical:5}}
        keyExtractor={(item, index) => 'key_' + index}
        data={category}
        renderItem={({item,index}) => {
          return (
          <Category3by3BlockCard
            item={item}
            index = {index}
            onPress={() => {
              onSelect({...item,vertical_id:vertical_id,vertical_name:vertical_name })
            }}
          />)
        }}
      />
    </View>
  );
};

export default Category3by3Block;
