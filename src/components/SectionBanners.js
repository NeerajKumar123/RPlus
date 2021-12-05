import React from 'react';
import {View, FlatList} from 'react-native';
import SectionBannerCard from './SectionBannerCard';

const SectionBanners = props => {
  const sectionBanners = props.data
  return (
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{height: 10, width: 20}} />}
      style={{paddingVertical: 5,marginTop:10, borderRadius:4}}
      keyExtractor={(item, index) => 'key_' + index}
      data={sectionBanners}
      renderItem={({item}) => {
        return (
          <SectionBannerCard
            item={item}
            onPress={() => {
              props?.onSectionBannerSelected(item)
            }}
          />
        );
      }}
    />
  );
};

export default SectionBanners;
