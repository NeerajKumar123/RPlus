import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Locator from '../screens/Locator';
import SetAddressOnMap from '../screens/SetAddressOnMap';
import Stores from '../screens/Stores';
import Offers from '../screens/Offers';
import ExploreCategoriesContainer from '../screens/ExploreCategoriesContainer';
import Profile from '../screens/Profile';
import Cart from '../screens/Cart';
import ProductDetailsContainer from '../screens/ProductDetailsContainer';
import SubsListContainer from '../screens/SubsListContainer';
import SubsSummary from '../screens/SubsSummary';
import OrderSummary from '../screens/OrderSummary';
import OrderListing from '../screens/OrderListing';
import AddNewAddress from '../screens/AddNewAddress';
import Login from '../screens/Login';
import PersonalDetails from '../screens/PersonalDetails';
import CustServices from '../screens/CustServices';
import VerifyOTP from '../screens/VerifyOTP';
import VerifyOTPManual from '../screens/VerifyOTPManual';
import DashboardContainer from '../screens/DashboardContainer';
import Addresses from '../screens/Addresses';
import ExploreByVertical from '../screens/ExploreByVertical';
import ChoosePayment from '../screens/ChoosePayment';
import Thanks from '../screens/Thanks';
import OrderDetails from '../screens/OrderDetails';
import TrackOrder from '../screens/TrackOrder';
import ReferAndEarn from '../screens/ReferAndEarn';
import RefCashPoints from '../screens/RefCashPoints';
import AddMoney from '../screens/AddMoney';
import FrequentlyAsked from '../screens/FrequentlyAsked';
import TermsAndConditions from '../screens/TermsAndConditions';
import HowItWorks from '../screens/HowItWorks';
import RPWebpage from '../screens/RPWebpage';
import Notification from '../screens/Notification';
import DeviceInfo from 'react-native-device-info';

import {View, Image} from 'react-native';
import * as Storage from '../helpers/RPStorage';
const Stack = createStackNavigator();
const MyStack = () => {

  /* This variable is will used to handle the 
  state if app is has done all pre-calculation 
  for example: loading existing data from DB and other things....
  */
  const [isReady, setIsReady] = useState(false);

  /*
  This variable will be used to hold the store id.
  */
  const [storeID, setStoreID] = useState(0);

  /* This is function will called when 
  this component mounted First,
  We will load data from server using APIs...
  */
  useEffect(() => {
    Storage.loadInitailData(() => {
      setStoreID(global?.storeInfo?.id);
      setIsReady(true);
    });
  }, []);

  const getAppLaunchImage = () =>{
    let bundleId = DeviceInfo.getBundleId();
    let launch;
    if(bundleId == 'com.RewardsPlus.Rplus'){
      launch = require('../../ios/RPlusTargetFiles/MediaRPlus.xcassets/launch.imageset/launch.png');
    }else if(bundleId == 'com.honeymoneytop.honeymoneytop'){
      launch = require('../../ios/HMTTargetFiles/MediaHMT.xcassets/launch.imageset/launch.png');
    }else if(bundleId == 'com.rplus.hmf'){
      launch = require('../../ios/HMFTargetFiles/MediaHMF.xcassets/launch.imageset/launch.png');
    }else if(bundleId == 'com.rplus.gdees'){
      launch = require('../../ios/GDEESTargetFiles/MediaGDEES.xcassets/launch.imageset/launch.png');
    }else if(bundleId == 'com.rplus.Kandavika'){
      launch = require('../../ios/AdrishStoreTargetFiles/MediaKandavika.xcassets/launch.imageset/launch.png');
    }else if(bundleId == 'com.budget.bms'){
      launch = require('../../ios/BMSTargetFiles/MediaBMS.xcassets/launch.imageset/launch.png');
    }else if(bundleId == 'com.aspl.des'){
      launch = require('../../ios/DailyEssentialsTargetFiles/MediaDE.xcassets/launch.imageset/launch.png');
    }
    return launch
  }


  if (!isReady)
    return (
      <View style={{flex: 1}}>
        <Image
          resizeMode="cover"
          style={{height: '100%', width: '100%'}}
          source={getAppLaunchImage()}
        />
      </View>
    );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={
          isReady && storeID ? 'DashboardContainer' : 'Locator'
        }>
        <Stack.Screen
          name="Locator"
          component={Locator}
          options={{title: 'Locator', headerShown: false}}
        />
        <Stack.Screen
          name="SetAddressOnMap"
          component={SetAddressOnMap}
          options={{title: 'SetAddressOnMap', headerShown: false}}
        />
        <Stack.Screen
          name="Addresses"
          component={Addresses}
          options={{title: 'Addresses', headerShown: false}}
        />
        <Stack.Screen
          name="ExploreByVertical"
          component={ExploreByVertical}
          options={{title: 'ExploreByVertical', headerShown: false}}
        />
        <Stack.Screen
          name="Stores"
          component={Stores}
          options={{title: 'Stores', headerShown: false}}
        />
        <Stack.Screen
          name="CustServices"
          component={CustServices}
          options={{title: 'CustServices', headerShown: false}}
        />
        <Stack.Screen
          name="DashboardContainer"
          component={DashboardContainer}
          options={{title: 'DashboardContainer'}}
        />

        <Stack.Screen
          name="ProductDetailsContainer"
          component={ProductDetailsContainer}
          options={{title: 'ProductDetailsContainer', headerShown: false}}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login', headerShown: false}}
        />
        <Stack.Screen
          name="VerifyOTPManual"
          component={VerifyOTPManual}
          options={{title: 'VerifyOTPManual', headerShown: false}}
        />
        <Stack.Screen
          name="PersonalDetails"
          component={PersonalDetails}
          options={{title: 'PersonalDetails', headerShown: false}}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{title: 'Cart', headerShown: false}}
        />
        <Stack.Screen
          name="ExploreCategoriesContainer"
          component={ExploreCategoriesContainer}
          options={{title: 'ExploreCategoriesContainer'}}
        />
        <Stack.Screen
          name="Offers"
          component={Offers}
          options={{title: 'Offers'}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{title: 'Profile'}}
        />
        <Stack.Screen
          name="AddNewAddress"
          component={AddNewAddress}
          options={{title: 'AddNewAddress'}}
        />
        <Stack.Screen
          name="OrderSummary"
          component={OrderSummary}
          options={{title: 'OrderSummary'}}
        />
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetails}
          options={{title: 'OrderDetails', headerShown: false}}
        />
        <Stack.Screen
          name="Thanks"
          component={Thanks}
          options={{title: 'Thanks'}}
        />
        <Stack.Screen
          name="ChoosePayment"
          component={ChoosePayment}
          options={{title: 'Payment'}}
        />
        <Stack.Screen
          name="TrackOrder"
          component={TrackOrder}
          options={{title: 'TrackOrder'}}
        />
        <Stack.Screen
          name="OrderListing"
          component={OrderListing}
          options={{title: 'OrderListing'}}
        />
        <Stack.Screen
          name="SubsSummary"
          component={SubsSummary}
          options={{title: 'SubsSummary'}}
        />
        <Stack.Screen
          name="SubsListContainer"
          component={SubsListContainer}
          options={{title: 'SubsListContainer'}}
        />
        <Stack.Screen
          name="ReferAndEarn"
          component={ReferAndEarn}
          options={{title: 'ReferAndEarn'}}
        />
        <Stack.Screen
          name="RefCashPoints"
          component={RefCashPoints}
          options={{title: 'RefCashPoints'}}
        />
        <Stack.Screen
          name="AddMoney"
          component={AddMoney}
          options={{title: 'AddMoney'}}
        />
        <Stack.Screen
          name="FrequentlyAsked"
          component={FrequentlyAsked}
          options={{title: 'FrequentlyAsked'}}
        />
        <Stack.Screen
          name="TermsAndConditions"
          component={TermsAndConditions}
          options={{title: 'TermsAndConditions'}}
        />
        <Stack.Screen
          name="HowItWorks"
          component={HowItWorks}
          options={{title: 'HowItWorks'}}
        />
        <Stack.Screen
          name="RPWebpage"
          component={RPWebpage}
          options={{title: 'RPWebpage'}}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{title: 'Notification'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MyStack;
