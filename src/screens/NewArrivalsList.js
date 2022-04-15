import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, Image} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import AppHeader from '../components/AppHeader';
import {NewArrivalListCard} from '../components/FeaturedSimilarProductCard';
import {CategoryCardNewArrival} from '../components/CategoryCard';

import {
  getNewarrivalAllCategoryByStore,
  getNewarrivalProductsByCategory,
} from '../apihelper/Api.js';
import RPLoader from '../components/RPLoader';
import * as Colors from '../constants/ColorDefs';
const cart_icon = require('../../assets/cart_icon.png');
import NoData from '../components/NoData';
import * as RPCartManager from '../helpers/RPCartManager';
const All_Cat_ID = 10000

const NewArrivalsList = props => {
  const navigation = useNavigation();
  const storeID = global.storeInfo.id;
  const [isLoading, setIsLoading] = useState(false);
  const companyID = global.storeInfo.company_id;
  const isFocused = useIsFocused();
  const [cartCount, setCartCount] = useState(0);
  const [categories, setCategories] = useState();
  const [bannerCats, setBannerCats] = useState();
  const [selCatProducts, setSelCatProducts] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const {pageTitle} =  props.route.params

  const updateCart = () => {
    RPCartManager.decideAndGetCartData(cartItems => {
      const count = cartItems && cartItems.length ? cartItems.length : 0;
      setCartCount(count);
      global.badgeCount = count;
    });
  };

  useEffect(() => {
    if (isFocused) {
      updateCart();
    }
  }, [isFocused]);

  useEffect(() => {
    const {allData,allCatIconUrl} = props.route.params;
    let cates = [];
    allData.forEach(element => {
      if (!cates.some(e => e.category_id == element.category_id)) {
        const cateObj = {
          category_id: element.category_id,
          category_name: element?.category_name,
          category_image: element?.category_image,
          category_banner:element?.n_a_image || undefined,
        };
        cates.push(cateObj);
      }
    });
    const allTypeCat = {
      category_id: All_Cat_ID,
      category_name: 'All',
      category_image: allCatIconUrl,
      category_banner:undefined,
    }
    cates = [allTypeCat, ...cates]
    setCategories(cates);
    setSelectedCategory(cates?.[0]);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const {allData} = props.route.params;
      if(selectedCategory?.category_id == All_Cat_ID){
        setSelCatProducts(allData);
  
      }else{
        let products = allData.filter(
          element => element.category_id == selectedCategory.category_id,
        );
        setSelCatProducts(products);
      }
    }
  }, [selectedCategory]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
      }}>
      <AppHeader
        isLeftIconEnabeld={true}
        title={pageTitle ? pageTitle : 'New Arrivals'}
        onLeftPress={() => {
          navigation.goBack();
        }}
        rightIcons={[
          {
            iconSource: cart_icon,
            color: Colors.CLR_5F259F,
            badgeCount: cartCount,
            onPress: () => {
              navigation.navigate('Cart');
            },
            iconBg: Colors.GREEN,
          },
        ]}
      />
      {isLoading && <RPLoader />}
      <View style={{flex: 1, flexDirection: 'row'}}>
        {categories && (
          <FlatList
            style={{
              width: '20%',
              backgroundColor: Colors.WHITE,
              paddingBottom: 30,
            }}
            keyExtractor={(item, index) => 'key_' + index}
            data={categories}
            renderItem={({item, index}) => {
              return (
                <CategoryCardNewArrival
                  isSelected={item.category_id == selectedCategory?.category_id}
                  item={item}
                  onPress={() => {
                    setSelectedCategory(item);
                  }}
                />
              );
            }}
          />
        )}
        <View style={{width: '80%', backgroundColor: Colors.CLR_E7ECF2}}>
          {categories && selCatProducts && (
            <FlatList
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={() => (
                <View style = {{flexDirection:'column', marginBottom:selectedCategory?.category_banner?.length ? 10 : 0}}>
                  {selCatProducts?.length > 0 && (
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 43,
                        paddingHorizontal: 12,
                      }}>
                      <Text
                        style={{
                          color: Colors.CTO_DARK_SHADE,
                          fontSize: 15,
                        }}>{`${selCatProducts?.length} Products`}
                      </Text>
                    </View>
                  )}
                  {selectedCategory?.category_banner?.length && (
                    <Image
                      resizeMode="cover"
                      style={{
                        width: '100%',
                        height: 150,
                        overflow: 'hidden',
                        alignSelf: 'center',
                      }}
                      source={{uri: selectedCategory?.category_banner}}
                    />
                  )}
                </View>
              )}
              ItemSeparatorComponent={() => (
                <View style={{height: 10, width: 20}} />
              )}
              ListFooterComponent={() => (
                <View style={{height: 50, width: 20}} />
              )}
              style={{
                paddingVertical: 5,
                paddingRight: 10,
                paddingLeft: 5,
                width: '100%',
              }}
              numColumns={2}
              keyExtractor={(item, index) => 'key_' + index}
              data={selCatProducts}
              renderItem={({item, index}) => {
                return (
                  <NewArrivalListCard
                    isSelected={true}
                    index={index + 1}
                    item={item}
                    onPress={() => {
                      navigation.navigate('ProductDetailsContainer', {
                        store_id: storeID,
                        product_id: item.product_id,
                        company_id: companyID,
                      });
                    }}
                    onLoaderStateChanged={isLoading => {
                      setIsLoading(isLoading);
                    }}
                    onUpdation={() => {
                      updateCart();
                    }}
                  />
                );
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default NewArrivalsList;
