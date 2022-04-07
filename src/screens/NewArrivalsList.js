import React, {useEffect, useState} from 'react';
import {Text, View, FlatList} from 'react-native';
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

const NewArrivalsList = props => {
  const navigation = useNavigation();
  const storeID = global.storeInfo.id;
  const [isLoading, setIsLoading] = useState(false);
  const companyID = global.storeInfo.company_id;
  const isFocused = useIsFocused();
  const [cartCount, setCartCount] = useState(0);
  const [categories, setCategories] = useState();
  const [selCatProducts, setSelCatProducts] = useState()
  const [selectedCategory, setSelectedCategory] = useState();


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
    const {allData} = props.route.params;
    let cates = []
    allData.forEach(element => {
      if (!cates.some(e => e.category_id == element.category_id)) {
        const cateObj = {category_id:element.category_id, category_name:`cate:${element.category_id}`, category_image:'https://rewardsplus.in/uploads/app/public/company/product/5ee76b5dd96ade3e0c0a57e4.webp'}
        cates.push(cateObj)
      }
      setCategories(cates)
      setSelectedCategory(cates?.[0])
    });
    // const params = {store_id: 46};
    // getNewarrivalAllCategoryByStore(params, res => {
    //   console.log('res', res);
    //   const allCates = res?.payload_newarrivalCategory
    //   setCategories(allCates)
    //   setSelectedCategory(allCates?.[0]);
    // });
  }, []);

  // useEffect(() => {
  //   setIsLoading(true)
  //   const params = {store_id: 46,category_id:54};
  //   getNewarrivalProductsByCategory(params, res => {
  //     console.log('getNewarrivalProductsByCategory====>', res);
  //     setSelCatProducts(res?.payload_newarrival)
  //     setIsLoading(false)
  //   });
  // }, [selectedCategory]);

  useEffect(() => {
    if(selectedCategory){
      const {allData} = props.route.params;
      let products = allData.filter( element => element.category_id == selectedCategory.category_id )
      setSelCatProducts(products)
      console.log('products',products)  
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
        title={'New Arrivals'}
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
      {console.log('categories',categories)}
      <View style = {{flex:1, flexDirection:'row'}}>
        {categories && (
          <FlatList
            style={{
              width: '20%',
              backgroundColor:Colors.WHITE,
              paddingBottom:30
            }}
            keyExtractor={(item, index) => 'key_' + index}
            data={categories}
            renderItem={({item, index}) => {
              return (
                <CategoryCardNewArrival
                  isSelected={true}
                  item={item}
                  onPress={() => {
                    console.log('sdsdsd');
                    setSelectedCategory(item)
                  }}
                />
              );
            }}
          />
        )}
        <View style = {{backgroundColor:'yellow', width:'80%', backgroundColor:Colors.CLR_E7ECF2}}>
          <View style= {{width:'100%', flexDirection:'row', alignItems:'center', height:43, paddingHorizontal:12}}>
          <Text>
            {`${selCatProducts?.length} Products`}
          </Text>
          </View>
          {categories && (
          <FlatList
            showsVerticalScrollIndicator = {false}
            ItemSeparatorComponent={() => (
              <View style={{height: 10, width: 20}} />
            )}
            ListFooterComponent = {() =>  <View style={{height: 50, width: 20}} />}
            style={{
              paddingVertical: 5,
              paddingRight:10,
              paddingLeft:5,
              width:'100%',
            }}
            numColumns = {2}
            keyExtractor={(item, index) => 'key_' + index}
            data={selCatProducts}
            renderItem={({item, index}) => {NewArrivalListCard
              return (
                <NewArrivalListCard
                  isSelected={true}
                  index = {index + 1}
                  item={item}
                  onPress={() => {
                    console.log('sdsdsd', item)
                    navigation.navigate('ProductDetailsContainer', {
                      store_id: storeID,
                      product_id: item.product_id,
                      company_id: companyID,
                    });    
                  }}
                  onLoaderStateChanged = {(isLoading) =>{
                    setIsLoading(isLoading)
                  }}
                  onUpdation = {()=>{
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
