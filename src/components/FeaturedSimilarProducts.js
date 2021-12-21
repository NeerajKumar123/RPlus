import React from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import FeaturedSimilarProductCard from '../components/FeaturedSimilarProductCard';
import * as Colors from '../constants/ColorDefs';

const FeaturedSimilarProducts = props => {
  const {data, title, subtitle, isViewAll} = props;
  return (
    <View
      style={{
        marginTop: 10,
        marginBottom:10,
        elevation:3,
        alignItems: 'center',
        width: '100%',
        paddingVertical: 13,
        shadowColor: Colors.GRAY,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
        backgroundColor:
          props.productListingType == 2 ? Colors.WHITE : Colors.CLR_14273E,
      }}>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'column',
            width: '60%',
          }}>
          {title && (
            <Text
              style={{
                fontSize: 16,
                textAlign: 'left',
                textAlignVertical: 'center',
                color:
                  props.productListingType == 1 ? Colors.WHITE : Colors.BLACK,
                fontWeight: 'bold',
              }}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text
              style={{
                fontSize: 12,
                textAlign: 'left',
                textAlignVertical: 'center',
                color:
                  props.productListingType == 1 ? Colors.WHITE : Colors.BLACK,
                marginTop: 6,
              }}>
              {subtitle}
            </Text>
          )}
        </View>
        {isViewAll && (
          <View
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
                  color:
                    props.productListingType == 1 ? Colors.WHITE : Colors.BLACK,
                }}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{marginTop: 10, width: '100%'}}
        contentContainerStyle={{paddingHorizontal: 20,paddingVertical:10}}
        keyExtractor={(item, index) => 'key_' + index}
        ItemSeparatorComponent={() => <View style={{height: 10, width: 20}} />}
        data={data}
        renderItem={({item, index}) => (
          <FeaturedSimilarProductCard
            isSimilarProcudtTypeCard={
              props.productListingType == 2 ? true : false
            }
            item={item}
            index={index}
            onLoaderStateChanged = {(isLoading) =>{
              props.onLoaderStateChanged && props.onLoaderStateChanged(isLoading)
            }}
            onPlusMinusPressed = {() =>{
              props.onPlusMinusPressed && props.onPlusMinusPressed()
            }}
            onUpdation = {()=>{
              props.onUpdation && props.onUpdation()
            }}
            onPress={() => {
              props.onProductSelected && props.onProductSelected(item);
            }}
          />
        )}
      />
    </View>
  );
};

export default FeaturedSimilarProducts;
