import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity,DeviceEventEmitter } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CartCard from '../components/CartCard';
import AppHeader from '../components/AppHeader';
import FeaturedSimilarProducts from '../components/FeaturedSimilarProducts';
import RPButton from '../components/RPButton';
import * as Colors from '../constants/ColorDefs';
import * as RPCartManager from '../helpers/RPCartManager';
import RPLoader from '../components/RPLoader';
const green_placeholder = require('../../assets/green_placeholder.png');
const empty_orders_image = require('../../assets/empty_orders_image.png');
const search_icon = require('../../assets/search_icon.png');
import { cartSimilarProduct,addTocartMultiple } from '../apihelper/Api.js';
import SearchProductModel from '../components/SearchProductModel';
import {useIsFocused} from '@react-navigation/native';
import * as Storage from '../helpers/RPStorage';

const Cart = props => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [totalSellingPrice, setTotalSellingPrice] = useState(0);
  const [totalSaved, setTotalSaved] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchShowing, setIsSearchShowing] = useState(false);
  const storeID = global?.storeInfo?.id;
  const custID = global?.userInfo?.customer_id;
  const companyID = global?.storeInfo?.company_id;
  const isFocused = useIsFocused();

  const updateList = cartItems => {
    setCartItems(cartItems ? cartItems : []);
    let sum = 0;
    let saved = 0;
    cartItems &&
      cartItems.forEach(item => {
        sum =
          parseInt(sum) + parseInt(item.sellingPrice * item.productQuantity);
        saved =
          saved +
          parseInt(item.maxPrice * item.productQuantity) -
          parseInt(item.sellingPrice * item.productQuantity);
      });
    setTotalSellingPrice(sum);
    setTotalSaved(saved);
    setIsReady(true);
    setIsLoading(false);
  };

  useEffect(() => {
    const isSyncNeeded = props.route.params?.isSync
    let customerId = global?.userInfo?.customer_id;
    if(isFocused && isSyncNeeded && customerId){
      Storage.getUserCartData(cartItems => {
        updateCartWithMultipleItems(cartItems)
      });
    }
  }, [isFocused]);

  const getRefreshedData = () => {
    setIsLoading(true);
    RPCartManager.decideAndGetCartData(cartItems => {
      updateList(cartItems);
      let cartIds = ''
      cartItems && cartItems.forEach(obj => {
        cartIds += `,${obj.productID}`
      });
      cartIds = cartIds && cartIds.length > 0 ? cartIds.substring(1) : undefined
      if (custID && cartIds) {
        const params = {
          company_id: companyID,
          store_id: storeID,
          customer_id: custID,
          product_id: cartIds
        }
        cartSimilarProduct(params, (similarRes) => {
          setSimilarProducts(similarRes?.payload_cartSimilarProduct)
        })
      }
    });
  };

  useEffect(() => {
    getRefreshedData()
  }, []);

  const prepareparams = (cartItemsUpdateMultiple) =>{
    let cartJson = []
    cartItemsUpdateMultiple.forEach(cartItem => {
      const cartObj = {
        company_id: cartItem?.companyID,
        store_id: cartItem?.storeID,
        product_id: cartItem?.productID,
        image:cartItem?.productImage,
        product_name:cartItem?.productName,
        no_of_quantity_allowed:cartItem?.maxAllowedQuantity,
        is_hot_deals:cartItem?.isDeal,
        mrp:cartItem?.maxPrice,
        selling_price:cartItem?.sellingPrice,
        selling_price:cartItem?.sellingPrice,
        quantity:cartItem?.productQuantity,
        deal_type_id:cartItem?.dealTypeID ? cartItem?.dealTypeID : 1
      }
      cartJson.push(cartObj)
    });
    const params = {
      company_id:companyID,
      store_id:storeID,
      customer_id:custID,
      cartJson:JSON.stringify(cartJson)
    }
    return params
  }
  const updateCartWithMultipleItems = (cartItemsUpdateMultiple) =>{
    const params =  prepareparams(cartItemsUpdateMultiple)
    addTocartMultiple(params,(res)=>{
      getRefreshedData()
    })
  }

  
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <AppHeader
        title="Personal Cart"
        isLeftIconEnabeld={true}
        subtitle={global.pincode ? `Shopping at ${global.pincode}` : ''}
        onLeftPress={() => {
          navigation.goBack();
        }}
        rightIcons={[
          {
            iconSource: search_icon,
            color: Colors.CLR_5F259F,
            badgeCount: 0,
            onPress: () => {
              setIsSearchShowing(true)
            },
            iconBg: Colors.GREEN,
          },
        ]}
      />
      {isLoading && <RPLoader />}
      {isSearchShowing && (
        <SearchProductModel
          storeID={storeID}
          onProductSelection={item => {
            setIsSearchShowing(false);
            const params = {
              store_id: storeID,
              product_id: item.product_id,
              company_id: companyID,
            }
            navigation.push('ProductDetailsContainer',params)
          }}
          onClosePressed={() => {
            setIsSearchShowing(false);
          }}
        />
      )}
      {isReady && cartItems && cartItems.length < 1 && (
        <EmptyCart
          startShoppiingPressed={() => {
            navigation.navigate('DashboardContainer', { store_id: storeID, pageIndex:1});
          }}
        />
      )}
      {cartItems && cartItems.length > 0 && (
        <>
          <CartListHeader sellingTotal={totalSellingPrice} />
          <FlatList
            style={{ width: '100%', marginTop: 12 }}
            horizontal={false}
            keyExtractor={(item, index) => 'key_' + index}
            data={cartItems}
            renderItem={({ item }) => (
              <CartCard
                item={item}
                onLoaderStateChanged={(isLoading) => {
                  setIsLoading(isLoading)
                }}
                onProductSelected={() => {
                  const params = {
                    store_id: storeID,
                    product_id: item.productID,
                    company_id: companyID
                  };
                  navigation.push('ProductDetailsContainer',params)
                }}
                onUpdation={() => {
                  getRefreshedData();
                }}
              />
            )}
            ListFooterComponent={
              similarProducts && similarProducts.length > 0 &&
                  <FeaturedSimilarProducts
                  productListingType={2}
                  data={similarProducts}
                  isViewAll={false}
                  title="Similar Products"
                  subtitle="Exprore similar products"
                  onProductSelected={item => {
                    const params = {
                      store_id: storeID,
                      product_id: item.product_id,
                      company_id: companyID
                    };
                    navigation.push('ProductDetailsContainer',params)
                  }}
                  onLoaderStateChanged={(isLoading) => {
                    setIsLoading(isLoading)
                  }}        
                  onUpdation={() => {
                    getRefreshedData();
                  }}
                  />
              }  
          />          
          <CartFooter
            sellingTotal={totalSellingPrice}
            savedTotal={totalSaved}
            onCheckoutPressed={() => {
              global.lastScreenName = 'Cart';
              // check if user logged in
              const custID =  global.userInfo?.customer_id;
              if (custID) {
                navigation.navigate('OrderSummary');
              } else {
                navigation.navigate('Login');
              }
            }}
          />
        </>
      )}
    </View>
  );
};

const CartListHeader = props => {
  const storeInfo = global.storeInfo;
  const { photo } = storeInfo
  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        width: '100%',
        flexDirection: 'row',
        padding: 20,
      }}>
      <Image
        resizeMode='contain'
        style={{ width: 50, height: 50, alignSelf: 'center', marginRight: 16, borderRadius: 25 }}
        source={photo && photo.length > 0 ? { uri: photo } : green_placeholder}
      />
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'column',
          width: '80%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{ color: Colors.CLR_2B2A40, fontSize: 16 }}>
            {storeInfo ? storeInfo.store_name : 'Store Name'}
          </Text>
          <Text
            style={{
              color: Colors.CLR_2C3646,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            {`Rs. ${props.sellingTotal}`}
          </Text>
        </View>
        <Text style={{ fontSize: 14, color: Colors.CLR_68677B, marginTop: 5 }}>
          {storeInfo ? storeInfo.address : 'Store Address'}
        </Text>
      </View>
    </View>
  );
};

const CartFooter = props => {
  const { sellingTotal, savedTotal } = props;
  return (
    <View
      style={{
        height: 62,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: Colors.CLR_2C3646,
      }}>
      <View
        style={{
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 16,
            color: Colors.WHITE,
            fontWeight: 'bold',
          }}>
          {`Total Rs ${sellingTotal}`}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: Colors.WHITE,
          }}>
          {`Saved Rs ${savedTotal}`}
        </Text>
      </View>
      <View
        style={{
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <RPButton
          fontSize={18}
          width="80%"
          height={43}
          backgroundColor={Colors.CLR_EE6F12}
          title={'Checkout'}
          onPress={() => {
            props.onCheckoutPressed && props.onCheckoutPressed();
          }}
        />
      </View>
    </View>
  );
};

const EmptyCart = props => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'column',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        resizeMode="contain"
        style={{
          width: 143,
          height: 143,
        }}
        source={empty_orders_image}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: Colors.CLR_68708E,
          marginTop: 18,
        }}>
        No Item in the cart.
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: Colors.CLR_68708E,
          marginTop: 8,
          marginBottom: 30,
          width: 230,
          textAlign: 'center'
        }}>
        We are egerly waiting to deliver your first order
      </Text>
      <RPButton
        title={'Start Shopping'}
        backgroundColor={Colors.CLR_EE6F12}
        onPress={() => {
          props.startShoppiingPressed && props.startShoppiingPressed();
        }}
      />
    </View>
  );
};

export default Cart;
