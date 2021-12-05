import React from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import AvailablePackSize from './AvailablePackSize';
import * as Colors from '../constants/ColorDefs';

const PDPackSizes = (props) => {
  return (
    <View
      style={{
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 10
      }}>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'left',
          color: Colors.CLR_16253B,
          fontWeight: 'bold',
          width: '100%',
        }}>
        Available pack size
      </Text>
      <FlatList
        style={{ width: '100%', marginTop: 10, paddingBottom: 10 }}
        scrollEnabled={false}
        horizontal={false}
        keyExtractor={(item, index) => 'key_' + index}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        data={props.productDetails.product_tags}
        renderItem={({ item }) => 
        <AvailablePackSize
          selectedTag = {props.selectedTag}
          packSizeSelected={() => {
            props.packSizeSelected && props.packSizeSelected(item)
          }}
          item={item} />
        }
      />
    </View>
  );
};

export default PDPackSizes;
