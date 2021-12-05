import React from 'react';
import {Text, View, FlatList, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CategoryCardGrid} from './CategoryCard';
import * as Colors from '../constants/ColorDefs';

const ExploreCategory = props => {
  const {data} = props;
  const navigation = useNavigation();
  return (
    <View
      style={{
        marginTop: 100,
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        paddingVertical: 13,
        paddingHorizontal: 20,
        borderRadius: 4,
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
          width: '100%',
        }}>
        Explore by Category
      </Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{width: '100%', marginTop: 14}}
        keyExtractor={(item, index) => 'key_' + index}
        numColumns={3}
        data={data}
        ItemSeparatorComponent={() => <View style={{width: 8, height: 10}} />}
        renderItem={({item, index}) => (
          <CategoryCardGrid
            item={item}
            index={index}
            onPress={() => {
              props.onVerticalSelected && props.onVerticalSelected(item);
            }}
          />
        )}
      />
    </View>
  );
};

export default ExploreCategory;
