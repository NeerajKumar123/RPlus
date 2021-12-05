import React,{useRef} from 'react';
import {Text, View, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Colors from '../constants/ColorDefs';

const SubcategoryList = props => {
  const {subCatlist, onSubCateSelected,selectedValue} = props;
  const flatListRef = useRef(null)
  const isSelected = (item) =>{
    return selectedValue?.subcategory_id == item.subcategory_id
  }
  
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        padding: 10
      }}>
      <FlatList
        ref = {flatListRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          width: '100%',
        }}
        keyExtractor={(item, index) => 'key_' + index}
        ItemSeparatorComponent={() => (
          <View
            style={{height: '100%', width: 20, backgroundColor: Colors.TRANS}}
          />
        )}
        data={subCatlist}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              onSubCateSelected && onSubCateSelected(item);
            }}
            style={{
              height: 35,
              borderWidth: 0.5,
              borderColor: isSelected(item) ? Colors.CLR_0376FC :  'gray',
              paddingHorizontal: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 17,
              backgroundColor: 'white',
            }}>
            <Text style = {{color:isSelected(item) ? Colors.CLR_0376FC  : Colors.BLACK , fontWeight:isSelected(item) ? '800' : 'normal'}}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SubcategoryList;
