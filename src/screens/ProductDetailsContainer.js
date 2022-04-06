import React, {useRef, useEffect, useState} from 'react';
import {View, Dimensions, ScrollView, Share, Alert, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import AppHeader from '../components/AppHeader';
import PDImageBannerCard from '../components/PDImageBannerCard';
import ProductBreifDetailsCard from '../components/ProductBreifDetailsCard';
import PDPackSizes from '../components/PDPackSizes';
import FeaturedSimilarProducts from '../components/FeaturedSimilarProducts';
import DetailsContainerFooter from '../components/DetailsContainerFooter';
import FooterItemAddedToCart from '../components/FooterItemAddedToCart';
import PDOffers from '../components/PDOffers';
import ProductDetails from '../components/ProductDetails';
import {getProductDetails} from '../apihelper/Api.js';
import RPLoader from '../components/RPLoader';
import SearchProductModel, {
  ImageViewerModel,
} from '../components/SearchProductModel';
import * as Colors from '../constants/ColorDefs';
import * as RPCartManager from '../helpers/RPCartManager';
import {PLUS_MINUS_BUTTON_TYPE} from '../constants/StaticValues';
import {formatToCartObj} from '../helpers/BaseUtility';
const cart_icon = require('../../assets/cart_icon.png');
const search_icon = require('../../assets/search_icon.png');
const sold_out = require('../../assets/sold_out.png');
import AppConfigData from '../constants/AppConfigData'


const {height, width} = Dimensions.get('window');

const ProductDetailsContainer = props => {
  const navigation = useNavigation();
  const AppData = AppConfigData()
  const sliderRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [productDetails, setProductDetails] = useState(undefined);
  const [quantity, setQuantity] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [storeDetails, setstoreDetails] = useState(props?.route?.params);
  const [isSearchShowing, setIsSearchShowing] = useState(false);
  const [isShowImage, setIsShowImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [tag, setTag] = useState(undefined);
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const updateCart = () => {
    RPCartManager.decideAndGetCartData(cartItems => {
      setCartCount(cartItems && cartItems.length ? cartItems.length : 0);
      if (productDetails) {
        const cartObj = formatToCartObj(
          productDetails,
          productDetails.quantity,
          PLUS_MINUS_BUTTON_TYPE.ProductDetails,
        );
        RPCartManager.isAlreadyAdded(cartObj, (_, addedItem) => {
          setQuantity(addedItem ? addedItem.productQuantity : 0);
          setIsLoading(false);
        });
      }
    });
  };

  useEffect(() => {
    if (storeDetails) {
      setIsLoading(true);
      getProductDetails(storeDetails, productDetails => {
        const payload = productDetails.payload;
        setTag({product_id: payload.product_id});
        setProductDetails(payload);
        setIsOutOfStock(payload?.stock < 1 ? true : false)
        updateCart();
        setIsLoading(false);
        if (payload) {
          const cartObj = formatToCartObj(
            payload,
            payload.quantity,
            PLUS_MINUS_BUTTON_TYPE.ProductDetails,
          );
          RPCartManager.isAlreadyAdded(cartObj, (_, addedItem) => {
            setQuantity(addedItem ? addedItem.productQuantity : 0);
            setIsLoading(false);
          });
        }
      });
    }
  }, [storeDetails]);

  const onShare = async imageUrl => {
    try {
      const result = await Share.share({
        message: `${imageUrl}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(AppData.title_alert, error.message);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.CLR_E7ECF2,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingBottom: 0,
      }}>
      <AppHeader
        title={productDetails?.name || ' '}
        isLeftIconEnabeld={true}
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
      {isLoading && <RPLoader />}
      {productDetails && (
        <ScrollView
          contentContainerStyle={{
            backgroundColor: Colors.CLR_E7ECF2,
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}>
          {isSearchShowing && (
            <SearchProductModel
              storeID={storeDetails.store_id}
              onProductSelection={item => {
                setIsSearchShowing(false);
                const newStoreDetails = {
                  ...storeDetails,
                  product_id: item.product_id,
                };
                setstoreDetails(newStoreDetails);
              }}
              onClosePressed={() => {
                setIsSearchShowing(false);
              }}
            />
          )}
          {productDetails.gallery && (
            <View
              style={{
                backgroundColor: Colors.WHITE,
                width: '100%',
                alignItems: 'center',
                height: 250,
                justifyContent: 'center',
                paddingVertical: 20,
              }}>
              <Carousel
                ref={sliderRef}
                data={productDetails.gallery}
                renderItem={({item}) => (
                  <PDImageBannerCard
                    height={'100%'}
                    isOutOfStock={isOutOfStock}
                    item={item}
                    onClick={() => {
                      setIsShowImage(true);
                      setSelectedImage(item.image_url);
                    }}
                    onShareClicked={() => {
                      onShare(item.image_url);
                    }}
                  />
                )}
                sliderWidth={width}
                itemWidth={width - 88}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                activeSlideAlignment="center"
                scrollEnabled={true}
                enableSnap={false}
                layoutCardOffset={0}
              />
              {isOutOfStock && (
                <Image
                  resizeMode="center"
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 15,
                    left: 10,
                    backgroundColor: Colors.TRANS,
                  }}
                  source={sold_out}
                />
              )}
            </View>
          )}
          {isShowImage && (
            <ImageViewerModel
              onClose={() => setIsShowImage(false)}
              images={productDetails.gallery}
              selImage={selectedImage}
            />
          )}
          {productDetails && (
            <ProductBreifDetailsCard productDetails={productDetails} />
          )}
          {productDetails.product_tags && (
            <PDPackSizes
              productDetails={productDetails}
              selectedTag={tag}
              packSizeSelected={tag => {
                setTag(tag);
                const newStoreDetails = {
                  ...storeDetails,
                  product_id: tag.product_id,
                };
                setstoreDetails(newStoreDetails);
              }}
            />
          )}
          {productDetails.bank_offer && (
            <PDOffers banckOffers={productDetails.bank_offer} />
          )}
          {(productDetails.description ||
            productDetails.benefits ||
            productDetails.other) && (
            <ProductDetails
              about={productDetails.description}
              benefits={productDetails.benefits}
              otherInfo={productDetails.other}
            />
          )}
          {productDetails.featured && productDetails.featured.length > 0 && (
            <FeaturedSimilarProducts
              data={productDetails.featured}
              productListingType={1}
              title="Featured Products"
              subtitle="Hurry Up ! Steal  your deals now"
              isViewAll={false}
              onLoaderStateChanged={isShow => {
                setIsLoading(isShow);
              }}
              onProductSelected={item => {
                const params = {
                  store_id: storeDetails.store_id,
                  product_id: item.product_id,
                  company_id: storeDetails.company_id,
                };
                navigation.push('ProductDetailsContainer', params);
              }}
            />
          )}
          {productDetails.similar && productDetails.similar.length > 0 && (
            <FeaturedSimilarProducts
              productListingType={2}
              data={productDetails.similar}
              isViewAll={false}
              title="Similar Products"
              subtitle="Exprore similar products"
              onLoaderStateChanged={isLoading => {
                setIsLoading(isLoading);
              }}
              onProductSelected={item => {
                const params = {
                  store_id: storeDetails.store_id,
                  product_id: item.product_id,
                  company_id: storeDetails.company_id,
                };
                navigation.push('ProductDetailsContainer', params);
              }}
            />
          )}
        </ScrollView>
      )}

      {productDetails && quantity <= 0 && (
        <DetailsContainerFooter
          item={productDetails}
          quantity={0}
          type={PLUS_MINUS_BUTTON_TYPE.ProductDetails}
          onLoaderStateChanged={isLoading => {
            setIsLoading(isLoading);
          }}
          onUpdation={() => {
            updateCart();
          }}
          gotoCartPressed={() => {
            navigation.navigate('Cart', {store_id: storeDetails.store_id});
          }}
        />
      )}
      {productDetails && quantity > 0 && (
        <FooterItemAddedToCart
          item={productDetails}
          quantity={quantity}
          type={PLUS_MINUS_BUTTON_TYPE.ProductDetails}
          onLoaderStateChanged={isLoading => {
            setIsLoading(isLoading);
          }}
          onUpdation={() => {
            updateCart();
          }}
          gotoCartPressed={() => {
            navigation.navigate('Cart', {store_id: storeDetails.store_id});
          }}
        />
      )}
    </View>
  );
};

export default ProductDetailsContainer;
