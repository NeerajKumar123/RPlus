import React, {useEffect, useState} from 'react';
import {Text, View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppHeader from '../components/AppHeader';
import MainCategoryExpandableSection from '../components/MainCategoryExpandableSection';
import CategoryRoundedCardList from '../components/CategoryRoundedCardList';
import * as Colors from '../constants/ColorDefs';
import {
  getVerticalByCategory,
  getCategoryBySubCategory,
  getProductBySubCategory,
} from '../apihelper/Api.js';
import NoData from '../components/NoData';
import RPLoader from '../components/RPLoader';

const ExploreCategoriesContainer = () => {
  const navigation = useNavigation();
  const verticals = global.verticals;
  const [selectedVertical, setSelectedVertical] = useState();
  const [categories, setCategories] = useState(undefined);
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const storeID = global.storeInfo.id;
  const companyID = global.storeInfo.company_id;

  useEffect(() => {
    const ver_id = selectedVertical && selectedVertical.vertical_id
    ver_id && setIsLoading(true);
    ver_id && getVerticalByCategory(
      {store_id: storeID, vertical_id: ver_id},
      res => {
        const cats = res && res.payload_verticalByCategory;
        setCategories(cats);
        setSelectedCategory(cats && cats.length && cats[0]);
        setIsLoading(false);
      },
    );
  }, [selectedVertical]);


  useEffect(() => {
    global.vertical = undefined
    global.category = undefined
    global.subcategory = undefined
    setSelectedVertical(verticals && verticals[0])
  }, [])

  const doNavigate = item => {
    const isSubCategory = item.category_id && item.subcategory_id;
   if (isSubCategory) {
      global.vertical = item;
      global.category = undefined;
      global.subcategory = undefined;
      let decidedLevel = 4;
      if (isSubCategory) {
        decidedLevel = 2;
      }
      navigation.navigate('ExploreByVertical', {level: decidedLevel});
    }
  };


  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
      }}>
      <AppHeader
        title="Explore Categories"
        onLeftPress={() => {
          navigation.goBack();
        }}
      />
      {verticals && selectedVertical && (
        <CategoryRoundedCardList
          selectedValue={selectedVertical}
          data={verticals}
          mappingKey={'vertical_id'}
          onDataSelected={selectedData => {
            setCategories(undefined);
            setSelectedVertical(selectedData);
            global.category = undefined
            global.subcategory = undefined  
          }}
        />
      )}
      {isLoading && <RPLoader />}
      {categories && categories.length > 0 && (
        <FlatList
          style={{width: '100%', marginTop: 12, backgroundColor: Colors.WHITE}}
          horizontal={false}
          keyExtractor={(item, index) => 'key_' + index}
          data={categories}
          ItemSeparatorComponent={() => (
            <View style={{height: 2, width: '100%'}} />
          )}
          renderItem={({item, index}) => (
            <MainCategoryExpandableSection
              item={item}
              index={index}
              onCategorySelected={(subcat) => {
                doNavigate(subcat)
              }}
            />
          )}
        />
      )}
      {categories == undefined ||
        (!categories.length && (
          <NoData
            title={'No data found'}
            subtitle={'Please explore other options available.'}
          />
        ))}
    </View>
  );
};

export default ExploreCategoriesContainer;
