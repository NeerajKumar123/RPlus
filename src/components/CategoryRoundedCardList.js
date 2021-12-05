import React,{useRef,useEffect} from 'react';
import {
  Platform,
  Text,
  View,
  FlatList,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
const {width} = Dimensions.get('window');
import * as Colors from '../constants/ColorDefs';
import CategoryCard from './CategoryCard';

const CategoryRoundedCardList = props => {
  const {selectedValue = {}, data, onDataSelected, mappingKey} = props;
  const ref = useRef(null)
  useEffect(() => {
    setTimeout(() => {
      let selectedIndex = data && data.findIndex(x => x[mappingKey] == selectedValue[mappingKey]);
      selectedIndex = selectedIndex < 0 ? 0 :selectedIndex 
      ref.current.scrollToOffset({animated: true,offset:selectedIndex*90})
    }, 1000);
  }, [selectedValue, data])
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {data ? (
        <FlatList
          ref = {ref}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            width: '100%',
            backgroundColor: Colors.WHITE,
            marginVertical:10,
          }}
          getItemLayout={(_, index) => ({
            length: data.length,
            offset: 90 * index,
            index,
          })}
          keyExtractor={(item, index) => 'key_' + index}
          data={data}
          renderItem={({item}) => (
            <CategoryCard
              isSelected={
                selectedValue &&
                selectedValue[mappingKey] == item[mappingKey]
              }
              item={item}
              onPress={() => {
                onDataSelected && onDataSelected(item);
              }}
            />
          )}
        />
      ) : (
        <Text>No data to show</Text>
      )}
    </View>
  );
};

export default CategoryRoundedCardList;
