import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import AppHeader from '../components/AppHeader';
import BannerCard from '../components/BannerCard';
import SearchProductModel from '../components/SearchProductModel';
import ExploreCategory from '../components/ExploreCategory';
import Promos from '../components/Promos';
import SectionBanners from '../components/SectionBanners';
import DealsOfTheDay from '../components/DealsOfTheDay';
import HotDeals from '../components/HotDeals';
import ComboOffers from '../components/ComboOffers';
import OffersOfTheDay from '../components/OffersOfTheDay';
import SubscriptionsBlock from '../components/SubscriptionsBlock';
import Category2by2TypeOne from '../components/Category2by2TypeOne'
import AllCategories from '../components/AllCategories'
import Category2by2TypeTwo from '../components/Category2by2TypeTwo'
import Category3by3Block from '../components/Category3by3Block'
import RPLoader from '../components/RPLoader';
import NoInternetDashBoard from '../components/NoInternetDashBoard';
import * as Colors from '../constants/ColorDefs';
import * as RPCartManager from '../helpers/RPCartManager';
const notif_icon = require('../../assets/notif_icon.png');
const cart_icon = require('../../assets/cart_icon.png');
const { height, width } = Dimensions.get('window');
import { getStoreBanner, getVerticalList, getVerticaldesign,getNotification } from '../apihelper/Api.js';
import messaging from '@react-native-firebase/messaging';

const StoreDashboard = props => {
  const navigation = useNavigation();
  const storeDetails = global?.storeInfo || {};
  const storeID = storeDetails.id;
  const sliderRef = useRef();
  const [hasSubscription, setHasSubscription] = useState(false);
  const [banners, setBanners] = useState([]);
  const [offersoftheday, setOffersoftheday] = useState(undefined);
  const [comboOffers, setComboOffers] = useState(undefined);
  const [promobanners, setPromobanners] = useState(undefined);
  const [sectionbanners, setSectionbanner] = useState(undefined);
  const [dealsOfTheDayDetails, setDealsOfTheDayDetails] = useState(undefined);
  const [hotDealsDetails, setHotDealsDetails] = useState(undefined);
  const [verticals, setVerticals] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isSearchShowing, setIsSearchShowing] = useState(false);
  const [activeIndex, setActiveIndex] = useState(2)
  const isFocused = useIsFocused();
  const cwidth = width - 50
  const cheight = cwidth * .47
  const [isConnected, setIsConnected] = useState(true)
  const [verticalDesignDetails, setVerticalDesignDetails] = useState()

  useEffect(() => {
    requestUserPermission();
    // Register background handler
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    Alert.alert('Message handled in the background!', JSON.stringify(remoteMessage));
});

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      const item = {vertical_id:12,category_id:1,subcategory_id:3,product_id:26}
      doNavigate(item)
    });
    return unsubscribe;
   }, []);

   async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      getFcmToken()
      console.log('Authorization status:', authStatus);
    }
  }

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
    console.log("Failed", "No token received",fcmToken);
    //  Alert.alert("Your Firebase Token is:", fcmToken);
    } else {
     console.log("Failed", "No token received");
    }
  }

  const updateCart = () => {
    RPCartManager.decideAndGetCartData(cartItems => {
      const count = cartItems && cartItems.length ? cartItems.length : 0;
      setCartCount(count);
      global.badgeCount = count;
      setIsLoading(false);
    });
  };


  const init = () => {
    setIsLoading(true);
    updateCart();
    getStoreBanner({ store_id: storeID }, bannersRes => {
      const { payload_banner } = bannersRes;
      setBanners(payload_banner.banner);
      setPromobanners(payload_banner.promobanner);
      setOffersoftheday(payload_banner.offeroftheday);
      setSectionbanner(payload_banner.sectionbanner);
      getVerticalList({ store_id: storeID }, verticalRes => {
        setIsLoading(false);
        const details = verticalRes?.payload_verticalList;
        setVerticals(details?.vertical);
        setDealsOfTheDayDetails(details?.normalDeals);
        setHotDealsDetails(details?.hotDeals);
        global.verticals = details?.vertical;
        global.normalDeals = details?.normalDeals;
        global.hotDeals = details?.hotDeals;
        global.promos = payload_banner?.promobanner;
      });
    });

    const params = { store_id: storeID,response_type:4 }
    getVerticaldesign(params, (res) =>{
      const designObj = res.payload_verticaldesign
      setVerticalDesignDetails(designObj)
    })
   
  }
  
  useEffect(() => {
    if (isFocused) {
      NetInfo.fetch().then(state => {
        setIsConnected(state.isConnected)
        init()
      });
    }
  }, [isFocused]);

  const doNavigate = item => {
    const isProduct = item.vertical_id && item.category_id && item.subcategory_id && item.product_id
    const isSubCategory = item.vertical_id && item.category_id && item.subcategory_id
    const isCategory = item.vertical_id && item.category_id
    const isVertical = item.vertical_id
    if (isProduct) {
      navigation.navigate('ProductDetailsContainer', {
        store_id: storeID,
        product_id: item.product_id, 
        company_id: storeDetails.company_id,
      });
    } else if (isSubCategory || isCategory || isVertical) {
      global.vertical = item
      global.category = undefined
      global.subcategory = undefined
      let decidedLevel = 4
      if(isSubCategory){
        decidedLevel = 2
      }else if(isCategory){
        decidedLevel = 3
      }
      navigation.navigate('ExploreByVertical',{level:decidedLevel});
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <AppHeader
        isHome={true}
        title={storeDetails.store_name}
        subtitle={storeDetails.city_id}
        imageUrl={storeDetails.photo}
        storeIconClicked={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            const { lat, lon } = global?.storeInfo
            const location = { latitude: lat, longitude: lon }
            navigation.navigate('Stores', { location: location });
          }
        }}
        rightIcons={[
          {
            iconSource: notif_icon,
            color: Colors.CLR_5F259F,
            onPress: () => {
              navigation.navigate('Notification');
            },
            iconBg: Colors.GREEN,
          },
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
      
      {isConnected ?
        <ScrollView
          contentContainerStyle={{
            backgroundColor: Colors.CLR_E7ECF2,
            width: width,
            paddingBottom:10
          }}>
          {isLoading && <RPLoader />}
          <View
            style={{
              backgroundColor: Colors.CLR_0065FF,
              width: '100%',
              alignItems: 'center',
              height: 170,
              zIndex: 1000,
            }}>
            {isSearchShowing && (
              <SearchProductModel
                storeID={storeID}
                onProductSelection={(item) => {
                  setIsSearchShowing(false);
                  navigation.navigate('ProductDetailsContainer', {
                    store_id: storeID,
                    product_id: item.product_id,
                    company_id: storeDetails.company_id,
                  });
                }}
                onClosePressed={() => {
                  setIsSearchShowing(false);
                }}
              />
            )}
            <SearchBar
              onPress={() => {
                setIsSearchShowing(true);
              }}
            />
            {banners && (
              <>
                <Carousel
                  containerCustomStyle={{
                    paddingTop: 0,
                    position: 'absolute',
                    top: 90,
                    width:'100%'
                  }}
                  ref={sliderRef}
                  data={banners}
                  renderItem={({ item }) => (
                    <BannerCard
                      item={item}
                      height={cheight}
                      onPress={() => {
                        doNavigate(item);
                      }}
                    />
                  )}
                  layout={'default'}
                  sliderWidth={width}
                  itemWidth={cwidth}
                  inactiveSlideScale={1}
                  inactiveSlideOpacity={1}
                  paddingTop={12}
                  scrollEnabled={true}
                  enableSnap={true}
                  layoutCardOffset={0}
                  activeSlideAlignment='start'
                  lockScrollWhileSnapping={true}
                  enableSnap={true}
                  enableMomentum={true}
                  decelerationRate={0.9}
                  pagingEnabled={true}
                  firstItem={0}
                  autoplay={true}
                  loop={true}
                />
              </>
            )}
          </View>
          <View style={{ paddingHorizontal: 18 }}>
            {verticals && verticals.length > 0 ? (
              <ExploreCategory
                data={verticals}
                onVerticalSelected={vertical => {
                  doNavigate(vertical)
                }}
              />
            )
              :
              <View style={{ marginTop: 100 }} />
            }
            {hasSubscription && <SubscriptionsBlock />}
            {promobanners && promobanners.length > 0 && (
              <Promos
                data={promobanners}
                onPromoSelected={item => {
                  doNavigate(item);
                }}
              />
            )}
          </View>
          {dealsOfTheDayDetails && (
            <DealsOfTheDay
              onViewAllClicked={() => {
              }}
              onProductSelected={item => {
                navigation.navigate('ProductDetailsContainer', {
                  store_id: storeID,
                  product_id: item.product_id,
                  company_id: storeDetails.company_id,
                });
              }}
              onDealsEnded={() => {
                // setDealsOfTheDayDetails(undefined);
              }}
              details={dealsOfTheDayDetails}
              onLoaderStateChanged={(isShow) => {
                setIsLoading(isShow)
                if (!isShow) {
                  updateCart()
                }
              }}
            />
          )}
          {hotDealsDetails && (
            <HotDeals
              details={hotDealsDetails}
              onLoaderStateChanged={(isShow) => {
                setIsLoading(isShow)
                if (!isShow) {
                  updateCart()
                }
              }}
              onItemPressed={item => {
                navigation.navigate('ProductDetailsContainer', {
                  store_id: storeID,
                  product_id: item.product_id,
                  company_id: storeDetails.company_id,
                });
              }}
            />
          )}
         
          {verticalDesignDetails?.d_even.map((evenCates)=>{
            return (
            <Category2by2TypeOne 
              data={evenCates}
              onSelect = {(item)=>{
                doNavigate(item)
            }}
              />)
          })
          }

          {verticalDesignDetails?.all.map((allCates)=>{
            return (
            <AllCategories 
                data={allCates}
               onSelect = {(item)=>{
                doNavigate(item)
            }}
            />)
          })
          }
          {sectionbanners && sectionbanners.length > 0 && (
              <SectionBanners data={sectionbanners}
                onSectionBannerSelected={item => {
                  doNavigate(item);
                }}
              />
            )}
          {verticalDesignDetails?.d_three.map((threeCates)=>{
            return (
            <Category3by3Block
              data={threeCates}
              onSelect = {(item)=>{
                doNavigate(item)
            }}

              />)
          })
          }
          {offersoftheday && offersoftheday.length > 0 && (
            <OffersOfTheDay
              data={offersoftheday}
              onOfferOfTheDaySelected={(item) => {
                doNavigate(item)
              }}
            />
          )}
          {comboOffers && <ComboOffers data={comboOffers} />}
        </ScrollView>
        :
        <NoInternetDashBoard
          onButtonPress={() => {
            setIsConnected(true)
            init()
          }}
        />
      }
    </View>
  );
};

const SearchBar = props => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress();
      }}
      style={{
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 50,
        width: width - 20,
        marginVertical: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderRadius: 4,
      }}>
      <Text style={{ fontSize: 16, color: Colors.CLR_8797AA }}>
        Search your product
      </Text>
    </TouchableOpacity>
  );
};

export default StoreDashboard;
