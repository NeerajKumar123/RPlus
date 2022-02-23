import * as Colors from '../constants/ColorDefs';
import DeviceInfo from 'react-native-device-info';

export const PaymentKeys = {
  Rplus:'rzp_live_7NXmXoE72iTqIo',
  HMT:'rzp_live_V6l7WnPe1dfl6E'
}

export default function GetAppConfigData() {
  const appid = getAppID()
  if (appid == 1) {
    //rewardPlusApp
    return {
      cust_email: 'cs@rewardsplus.in',
      cust_mobile_call: '9811995444',
      cust_mobile_whatspp: '9650861174',
      title_alert: 'RewardsPlus Store',
      wallet_app_name: 'RewardsPlus',
      payment_key: 'rzp_live_7NXmXoE72iTqIo',
      isBrandLogoNeeded: true,
      storeListingName: 'storeListing',
      appStoreURL: 'http://itunes.apple.com/app/id1576051283',
      bundle:'com.RewardsPlus.Rplus',
      app_store_name:'RewardsPlus Store',
      app_version:"1.0.3",
      bundle_version:"6",
      AppHeaderGradidentColors :[Colors.CLR_033AA4, Colors.CLR_0095D4],
      app_theme:Colors.THEME_CLR_RPLUS
    };
  } else if (appid == 2) {
    //Hmt App
    return {
      cust_email: 'hmtit@honeymoneytop.com',
      cust_mobile_call: '7291975303',
      cust_mobile_whatspp: '7291975303',
      title_alert: 'HoneyMoneyTop',
      wallet_app_name: 'HONEY MONEY TOP',
      payment_key: 'rzp_live_V6l7WnPe1dfl6E',
      isBrandLogoNeeded: false,
      storeListingName: 'hmtStore',
      appStoreURL: 'https://apps.apple.com/in/app/honey-money-top/id1574488018',
      bundle:'com.honeymoneytop.honeymoneytop',
      app_store_name:'HONEY MONEY TOP',
      app_version:"1.6",
      bundle_version:"7",
      AppHeaderGradidentColors :[Colors.CLR_033AA4, Colors.CLR_0095D4],
      app_theme:Colors.THEME_CLR_HMT
    };
  } else if (appid == 3) {
    //Hmf App
    return {
      cust_email: 'cs@homefreshmart.in',
      cust_mobile_call: '9891180049',
      cust_mobile_whatspp: '9891180049',
      title_alert: 'Home Freshmart',
      wallet_app_name: 'Home Freshmart',
      payment_key: 'rzp_live_7NXmXoE72iTqIo',
      isBrandLogoNeeded: false,
      storeListingName: 'homeFreshStore',
      appStoreURL: 'http://itunes.apple.com/app/id1576051283',
      bundle:'com.rplus.hmf',
      app_store_name:'Home Fresh Mart',
      app_version:"1.0",
      bundle_version:"1",
      AppHeaderGradidentColors :[Colors.CLR_033AA4, Colors.CLR_0095D4],
      app_theme:Colors.THEME_CLR_HFM
    };
  } else if (appid == 4) {
    //Gdees App
    return {
      cust_email: 'cs@gdeessupermart.com',
      cust_mobile_call: '9810220478',
      cust_mobile_whatspp: '9810220478',
      title_alert: 'GDEES',
      wallet_app_name: 'GDEES',
      payment_key: 'rzp_live_7NXmXoE72iTqIo',
      isBrandLogoNeeded: false,
      storeListingName: 'gdeesStore',
      appStoreURL: 'http://itunes.apple.com/app/id1576051283',
      bundle:'com.rplus.gdees',
      app_store_name:'GDEES',
      app_version:"1.0",
      bundle_version:"1",
      AppHeaderGradidentColors :[Colors.CLR_033AA4, Colors.CLR_0095D4],
      app_theme:Colors.THEME_CLR_GDEES
    };
  }else if (appid == 5) {
    //Gdees App
    return {
      cust_email:"cs@anandkand.com",
      cust_mobile_whatspp: "9971197671",
      cust_mobile_call: "9717114434",
      title_alert:"Kandavika adrish",
      wallet_app_name: 'Kandavika adrish',
      payment_key: 'rzp_live_7NXmXoE72iTqIo',
      isBrandLogoNeeded: false,
      storeListingName: 'adrishStore',
      appStoreURL: 'http://itunes.apple.com/app/id1576051283',
      bundle:'com.rplus.Kandavika',
      app_store_name:'Kandavika adrish',
      app_version:"1.0",
      bundle_version:"1",
      AppHeaderGradidentColors :[Colors.CLR_033AA4, Colors.CLR_0095D4],
      app_theme:Colors.THEME_CLR_KANVIKA
    };
  }else if (appid == 6) {
    //Gdees App
    return {
      cust_email:"cs@budget.com",
      cust_mobile_whatspp: "9971197671",
      cust_mobile_call: "9717114434",
      title_alert:"Budget Super Market",
      wallet_app_name: 'Budget Super Market',
      payment_key: 'rzp_live_7NXmXoE72iTqIo',
      isBrandLogoNeeded: false,
      storeListingName: 'budgetStore',
      appStoreURL: 'http://itunes.apple.com',
      bundle:'com.budget.bms',
      app_store_name:'Budget Super Market',
      app_version:"1.0",
      bundle_version:"1",
      AppHeaderGradidentColors :[Colors.CLR_033AA4, Colors.CLR_0095D4],
      app_theme:Colors.THEME_CLR_BMS
    };
  }else if (appid == 7) {
    //Gdees App
    return {
      cust_email:"cs@budget.com",
      cust_mobile_whatspp: "9911329581",
      cust_mobile_call: "9911329581",
      title_alert:"Daily Essentials",
      wallet_app_name: 'Daily Essentials',
      payment_key: 'rzp_live_7NXmXoE72iTqIo',
      isBrandLogoNeeded: false,
      storeListingName: 'smartStore',
      appStoreURL: 'http://itunes.apple.com',
      bundle:'com.budget.bms',
      app_store_name:'Daily Essentials',
      app_version:"1.0",
      bundle_version:"1",
      AppHeaderGradidentColors :[Colors.CLR_033AA4, Colors.CLR_0095D4],
      app_theme:Colors.THEME_CLR_BMS
    };
  }else{
    //rewardPlusApp
    return {
      cust_email: 'cs@rewardsplus.in',
      cust_mobile_call: '9811995444',
      cust_mobile_whatspp: '9650861174',
      title_alert: 'RewardsPlus Store',
      wallet_app_name: 'RewardsPlus',
      payment_key: 'rzp_live_7NXmXoE72iTqIo',
      isBrandLogoNeeded: true,
      storeListingName: 'storeListing',
      appStoreURL: 'http://itunes.apple.com/app/id1576051283',
      bundle:'com.RewardsPlus.Rplus',
      app_store_name:'RewardsPlus Store',
      app_version:"1.0.3",
      bundle_version:"6",
      AppHeaderGradidentColors :[Colors.CLR_033AA4, Colors.CLR_0095D4],
      app_theme:Colors.THEME_CLR_RPLUS
    };
  }
}

//https://rewardsplus.in/api/store/smartStore


const getAppID = () =>{
  let bundleId = DeviceInfo.getBundleId();
  let appID = 10
  if(bundleId == 'com.RewardsPlus.Rplus'){
    appID = 1
  }else if(bundleId == 'com.honeymoneytop.honeymoneytop'){
    appID = 2
  }else if(bundleId == 'com.rplus.hmf'){
    appID = 3
  }else if(bundleId == 'com.rplus.gdees'){
    appID = 4 
  }
  else if(bundleId == 'com.rplus.Kandavika'){
    appID = 5
  }
  else if(bundleId == 'com.budget.bms'){
    appID = 6
  } else if(bundleId == 'com.aspl.des'){
    appID = 7
  }
  return appID
}

//Testing data
/*
Avinash == 1234 otp
pincodes
1.Rewards Plus ==> All Delhi
2.HMT ==> 110016
3.HMF ==> 110074
4.GDEES ==> 110068
5. Adrish ==> 110019
6. BMS == > 110074
*/
