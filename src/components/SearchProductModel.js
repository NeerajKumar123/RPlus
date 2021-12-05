import React, {useEffect, useState} from 'react';
import {Modal, View, Platform, FlatList, Text, Image,TouchableOpacity,Dimensions} from 'react-native';
import AppHeader from '../components/AppHeader';
import * as Colors from '../constants/ColorDefs';
import SearchBar from '../components/SearchBar';
import {searchProduct} from '../apihelper/Api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const {width} = Dimensions.get('window');

const cross = require('../../assets/cross.png');
export const ImageViewerModel = props => {
  const {images, selImage} = props
  return (
    <Modal
      visible={true}
      animationType="slide"
      presentationStyle="overFullScreen"
      width = {'100%'}
      onCancel={() => {}}>
        <CloseButtonHeader
          title={' '}
          onClose={() => {
            props.onClose && props.onClose();
          }}
        />
       <FlatList
            keyboardShouldPersistTaps='always'
            horizontal={true}
            showsHorizontalScrollIndicator = {false}
            contentContainerStyle = {{width:width*images.length, height:'100%'}}
            keyExtractor={(item, index) => 'key_' + index}
            ItemSeparatorComponent={() => (
              <View style={{width:20, height: '100%'}} />
            )}
            data={images}
            renderItem={({item}) => 
            <Image
            resizeMode = 'contain'
            style = {{width:width, height:'100%'}}
            source = {{uri:item.image_url}}
            />
          }
          />
    </Modal>
  );
};

const CloseButtonHeader = props => {
  const { title } = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        height: 30,
        marginTop:64
      }}>
      <Text
        style={{
          color: Colors.CLR_14273E,
          fontSize: 18,
          fontWeight: 'bold',
        }}>
        {title}
      </Text>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          props.onClose && props.onClose();
        }}>
        <Icon
          name={'close-circle-outline'}
          size={30}
          color={Colors.DARKGRAY}
        />
      </TouchableOpacity>
    </View>
  );
};
const SearchProductModel = props => {
  console.log('props',props)
  const {storeID = 27, onProductSelection = ()=>{}} =  props
  const [searchedItems, setSearchedItems] = useState(undefined);
  const [isSearching, setIsSearching] = useState(false)
  return (
    <Modal
      visible={true}
      animationType="slide"
      presentationStyle="overFullScreen"
      onCancel={() => {}}>
      <AppHeader
        title={" "}
        subtitle={" "}        
        rightIcons={[
          {
            iconSource: cross,
            color: Colors.CLR_5F259F,
            onPress: () => {
              props.onClosePressed && props.onClosePressed();
            },
            iconBg: Colors.GREEN,
          },
        ]}
      />
      <View
        style={{
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: Colors.CLR_E7ECF2,
        }}>
        <SearchBar
          onFocus={() => {
          }}
          onBlur = {() =>{
            setIsSearching(false)
          }}
          onChangeText={query => {
            if (query && query.length > 2) {
              setIsSearching(true)
              const params = {store_id: storeID, keyword: query};
              searchProduct(params, res => {
                setSearchedItems(res?.payload_searchProduct);
                setIsSearching(false)
              });
            }
          }}
        />
        {isSearching && <Text>Fetching your search...</Text>}
        {searchedItems && searchedItems.length > 0 && (
          <FlatList
          keyboardShouldPersistTaps='always'
            style={{width: '90%'}}
            horizontal={false}
            keyExtractor={(item, index) => 'key_' + index}
            ItemSeparatorComponent={() => (
              <View style={{height: 10, width: '100%'}} />
            )}
            data={searchedItems}
            renderItem={({item}) => <SearchedItem 
            onItemPressed = {() =>{
              onProductSelection(item)
            }}
            item={item} />}
          />
        )}
        {!isSearching && (searchedItems == undefined || searchedItems.length == 0) && 
             <Text style  = {{}}>No Result found</Text>
        }
      </View>
    </Modal>
  );
};

const SearchedItem = props => {
  const {name} = props.item;
  return (
    <TouchableOpacity
    onPress = {()=>{
      props.onItemPressed()
    }}
      style={{
        backgroundColor: Colors.WHITE,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 4,
      }}>
      <Text>{name}</Text>
    </TouchableOpacity>
  );
};

export default SearchProductModel;
