import {AppID} from '../../app.json';
import * as Colors from '../constants/ColorDefs';
export default function GetAppConfigData() {
  if (AppID == 1) {
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
      app_theme:Colors.THEMME_CLR_RPLUS
    };
  } else if (AppID == 2) {
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
      app_version:"1.5",
      bundle_version:"6",
      AppHeaderGradidentColors :[Colors.CLR_033AA4, Colors.CLR_0095D4],
      app_theme:Colors.THEMME_CLR_HMT
    };
  } else if (AppID == 3) {
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
      app_theme:Colors.THEMME_CLR_HFM
    };
  } else if (AppID == 4) {
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
      app_theme:Colors.THEMME_CLR_GDEES
    };
  }
}

//Testing data
/*
Avinash == 1234 otp
pincodes
1.Rewards Plus ==> All Delhi
2.HMT ==> 110016
3.HMF ==> 110074
3.GDEES ==> 110068
*/
