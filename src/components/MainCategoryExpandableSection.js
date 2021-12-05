import React, {useState, useEffect} from 'react';
import {
  Platform,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getCategoryBySubCategory} from '../apihelper/Api.js';
const {width} = Dimensions.get('window');
import * as Colors from '../constants/ColorDefs';
const fruits = require('../../assets/fruits.png');
const up_arrow = require('../../assets/up_arrow.png');
const down_arrow = require('../../assets/down_arrow.png');

const MainCategoryExpandableSection = props => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {image, name, category_id, max_percentage ,color_code = Colors.CLR_CBE8D3} = props.item;
  const storeDetails = global.storeInfo;
  const storeID = storeDetails.id;
  const [subs, setSubs] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isExpanded && (subs == undefined  || subs.length  == 0)) {
      setIsLoading(true);
      getCategoryBySubCategory(
        {store_id: storeID, category_id: category_id},
        res => {
          setIsLoading(false);
          const subs = res && res.payload_categoryBySubCategory;
          setSubs(subs);
        },
      );
    }
  }, [isExpanded]);

  useEffect(() => {
    setSubs(undefined)
    setIsExpanded(false)
  }, [])

  return (
    <View>
      <View
        key={props.item.itemName}
        style={{
          backgroundColor: color_code || Colors.WHITE,
          flexDirection: 'row',
          paddingVertical: 15,
          paddingHorizontal: 20,
        }}>
        <Image
          resizeMode="contain"
          style={{
            width: 100,
            height: 100,
          }}
          source={{uri: image} ? {uri: image} : null}
        />
        <View
          style={{
            flex: 5,
            justifyContent: 'center',
            marginHorizontal: 10,
            marginLeft:20
          }}>
          <Text style = {{fontSize:18}}>{name}</Text>
          <Text>
            {`Get upto `}
            <Text style={{fontWeight: 'bold'}}>{max_percentage}</Text>
            <Text>{` Off`}</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setIsExpanded(!isExpanded);
          }}>
          <Image
            style={{width: 18, height: 18, marginRight:10}}
            source={isExpanded ? up_arrow : down_arrow}
          />
        </TouchableOpacity>
      </View>
      {isExpanded && subs && subs.length > 0 && (
          <FlatList
            style={{
              width: '100%',
              paddingHorizontal: 20,
              backgroundColor: Colors.CLR_E7ECF2
            }}
            horizontal={false}
            keyExtractor={(item, index) => 'key_' + index}
            ItemSeparatorComponent={() => (
              <View style={{height: 5, width: '100%'}} />
            )}
            data={subs}
            renderItem={({item}) => (
              <SubCategorySection
                item={item}
                onSelect={() => {
                  props.onCategorySelected(item);
                }}
              />
            )}
          />
      )}
      {isExpanded && isLoading  && (
        <View
          style={{
            width: '100%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Loading data...</Text>
        </View>
      )}
    </View>
  );
};

const SubCategorySection = props => {
  return (
    <TouchableOpacity
      style={{
        marginVertical:3,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      onPress={() => {
        props.onSelect();
      }}>
      <Text style = {{fontSize:18, color:Colors.BLACK}}>{props.item.name}</Text>
    </TouchableOpacity>
  );
};


export default MainCategoryExpandableSection;
