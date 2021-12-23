import React, {useEffect, useState} from 'react';
import {Text, View, FlatList} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import AppHeader from '../components/AppHeader';
import CategoryRoundedCardList from '../components/CategoryRoundedCardList';
import SubcategoryList from '../components/SubcategoryList';
import VerticalProductCard from '../components/VerticalProductCard';
import {
  getVerticalByCategory,
  getCategoryBySubCategory,
  getProductBySubCategory,
} from '../apihelper/Api.js';
import RPLoader from '../components/RPLoader';
import * as Colors from '../constants/ColorDefs';
const cart_icon = require('../../assets/cart_icon.png');
const search_icon = require('../../assets/search_icon.png');
import SearchProductModel from '../components/SearchProductModel';
import NoData from '../components/NoData';
import * as RPCartManager from '../helpers/RPCartManager';

const ExploreByVertical = props => {
  const navigation = useNavigation();
  const vertical = global.vertical
    ? global.vertical
    : global.verticals && global.verticals[0];
  const storeID = global.storeInfo.id;
  const companyID = global.storeInfo.company_id;
  const [categories, setCategories] = useState(undefined);
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [subCategories, setSubCategories] = useState(undefined);
  const [selectedSubCategory, setSelectedSubCategory] = useState(undefined);
  const [products, setProducts] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchShowing, setIsSearchShowing] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const isFocused = useIsFocused();
  const [alreadyFetchedProducts, setAlreadyFetchedProducts] = useState([])
  const [alreadyFetchedSubcats, setAlreadyFetchedSubcats] = useState([])

  // 
  const details = props?.route?.params;
  const level = details?.level
  let showCats = true
  let showSubCats = true
   if (level == 3){
    showCats = false
    showSubCats = true 
  }else if (level == 2){
    showCats = false
    showSubCats = false 
  }
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
    if(!showCats && !showSubCats){
      setSelectedCategory({category_id:vertical?.category_id});
      setSelectedSubCategory({subcategory_id:vertical?.subcategory_id});
    }else if(!showCats && showSubCats){
      setSelectedCategory({category_id:vertical?.category_id});
    }else{
      setIsLoading(true);
      getVerticalByCategory(
        {store_id: storeID, vertical_id: vertical.vertical_id},
        res => {
          const cats = res?.payload_verticalByCategory;
          setCategories(cats);
          setSelectedCategory(global.category ? global.category : cats && cats.length && cats[0]);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        },
      );
    }
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const savedSubcats = checkIfSubcategoriesAlreadyFetched(selectedCategory)
      if(savedSubcats){
        setSubCategories(savedSubcats);
        setSelectedSubCategory(global.subcategory ?  global.subcategory : savedSubcats?.[0]);
      }else{
        setIsLoading(true);
        getCategoryBySubCategory(
          {store_id: storeID, category_id: selectedCategory?.category_id},
          res => {
            const subs = res?.payload_categoryBySubCategory;
            const dataToBeCached = {"category_id": `${selectedCategory?.category_id}`,"subs": subs}
            const ad = [...alreadyFetchedSubcats,dataToBeCached]
            setAlreadyFetchedSubcats(ad)
            setSubCategories(subs);
            setSelectedSubCategory(global.subcategory ?  global.subcategory : subs && subs.length && subs[0]);
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
          },
        );
      }
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedSubCategory) {
      const savedProducts = checkIfProductsAlreadyFetched(selectedCategory,selectedSubCategory)
      if(savedProducts){
        setProducts(savedProducts);
      }else{
        setIsLoading(true);
        getProductBySubCategory(
          {
            store_id: storeID,
            subcategory_id: selectedSubCategory?.subcategory_id,
          },
          res => {
            const prods =  res?.payload_SubCategoryByProduct;
            setProducts(prods);
            const dataToBeCached = {"category_id": `${selectedCategory.category_id}`,subcategory_id:`${selectedSubCategory.subcategory_id}` ,"products": prods}
            const ad = [...alreadyFetchedProducts,dataToBeCached]
            setAlreadyFetchedProducts(ad)
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
          },
        );
      }
    }
  }, [selectedSubCategory]);


  const checkIfSubcategoriesAlreadyFetched = (cat) =>{
    const filtedObjs =  alreadyFetchedSubcats?.filter(item =>{
      return  cat.category_id == item.category_id
    });
    const result = filtedObjs?.[0] 
    return result?.subs
  }

  const checkIfProductsAlreadyFetched = (cat, subcat) =>{
    const filtedObjs =  alreadyFetchedProducts?.filter(item =>{
      return  cat.category_id == item.category_id && subcat.subcategory_id == item.subcategory_id
    });
    const result = filtedObjs?.[0] 
    return result?.products
  }


  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
      }}>
      <AppHeader
        isLeftIconEnabeld={true}
        title={vertical.name}
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
          {
            iconSource: search_icon,
            color: Colors.CLR_5F259F,
            onPress: () => {
              setIsSearchShowing(true);
            },
            iconBg: Colors.GREEN,
          },
        ]}
      />
      {isSearchShowing && (
        <SearchProductModel
          storeID={storeID}
          onProductSelection={item => {
            setIsSearchShowing(false);
            navigation.navigate('ProductDetailsContainer', {
              store_id: storeID,
              product_id: item.product_id,
              company_id: companyID,
            });
          }}
          onClosePressed={() => {
            setIsSearchShowing(false);
          }}
        />
      )}
      {showCats && categories && categories.length > 0 && selectedCategory && (
        <CategoryRoundedCardList
          selectedValue={selectedCategory}
          data={categories}
          mappingKey={'category_id'}
          onDataSelected={selectedData => {
            setSelectedCategory(selectedData);
          }}
        />
      )}
      {showSubCats && subCategories && (
        <SubcategoryList
          subCatlist={subCategories}
          selectedValue={selectedSubCategory}
          mappingKey={'subcategory_id'}
          onSubCateSelected={subCate => {
            setSelectedSubCategory(subCate);
          }}
        />
      )}
      {products && products.length > 0 && (
        <FlatList
          style={{width: '100%', marginTop: 12, backgroundColor: Colors.WHITE}}
          horizontal={false}
          keyExtractor={(item, index) => 'key_' + index}
          ItemSeparatorComponent={() => (
            <View style={{height: 10, width: '100%'}} />
          )}
          data={products}
          renderItem={({item}) => (
            <VerticalProductCard
              item={item}
              onUpdation={() => {
                updateCart();
              }}
              onProductSelected={() => {
                navigation.navigate('ProductDetailsContainer', {
                  store_id: storeID,
                  product_id: item.product_id,
                  company_id: companyID,
                });
              }}
              onLoaderStateChanged={(isLoading) => {
                setIsLoading(isLoading)
              }}      
            />
          )}
          ListFooterComponent={() => {
            return <View style={{height: 30, width: '100%'}} />;
          }}
        />
      )}
      {!isLoading &&
      (categories == undefined ||
        !categories.length) ||
        (subCategories == undefined ||
          !subCategories.length) ||
        ((products == undefined || !products.length) && (
          <NoData
            title={'No data found'}
            subtitle={'Please explore other options available.'}
          />
        ))}
      {isLoading && <RPLoader />}
    </View>
  );
};

export default ExploreByVertical;
