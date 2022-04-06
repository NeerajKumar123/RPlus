import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View, Image, ScrollView, Dimensions} from 'react-native';
import * as Colors from '../constants/ColorDefs';
const coming_soon = require('../../assets/coming_soon.png');
import DealsOfTheDay from '../components/DealsOfTheDay';
import HotDeals from '../components/HotDeals';
import AppHeader from '../components/AppHeader';
const notif_icon = require('../../assets/notif_icon.png');
const cart_icon = require('../../assets/cart_icon.png');
import NoData from '../components/NoData';
import RPLoader from '../components/RPLoader';
const {height, width} = Dimensions.get('window');

const Offers = () => {
  const navigation = useNavigation();
  const {storeInfo, badgeCount} = global;
  const storeID = storeInfo.id;
  const [isLoading, setIsLoading] = useState(false)
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent:'center', flexDirection: 'column',backgroundColor:"white"}}>
      <AppHeader
        isHome={true}
        title={storeInfo.store_name}
        subtitle={storeInfo.city_id}
        imageUrl={storeInfo.photo}
        storeIconClicked={() => {
          navigation.goBack();
        }}
        rightIcons={[
          {
            iconSource: cart_icon,
            color: Colors.CLR_5F259F,
            badgeCount: badgeCount,
            onPress: () => {
              navigation.navigate('Cart');
            },
            iconBg: Colors.GREEN,
          },
        ]}
      />
      <ScrollView 
      contentContainerStyle={{
          backgroundColor: Colors.CLR_E7ECF2,
          width: width,
        }}>
      {global.normalDeals && (
         <DealsOfTheDay
         marginTop={1}
         details={global.normalDeals}
         onLoaderStateChanged = {(isShow) =>{
          setIsLoading(isShow)
        }}
         onViewAllClicked={() => {
         }}
         onProductSelected={item => {
           navigation.navigate('ProductDetailsContainer', {
             store_id: storeID,
             product_id: item.product_id,
             company_id: storeInfo.company_id,
           });
         }}
         onDealsEnded={() => {
           global.normalDeals = undefined;
         }}
       />
      )}
      {global.hotDeals && (
          <HotDeals
            marginTop={0}
            details={global.hotDeals}
            onLoaderStateChanged = {(isShow) =>{
              setIsLoading(isShow)
            }}
            onItemPressed={item => {
              navigation.navigate('ProductDetailsContainer', {
                store_id: storeID,
                product_id: item.product_id,
                company_id: storeInfo.company_id,
              });
            }}
          />
      )}
      {isLoading && <RPLoader />}
      {global.hotDeals == undefined && global.normalDeals == undefined &&
        <NoData
            title={'No offer found.'}
            subtitle={'Currently we dont have any offers for you!'}
            // buttonTitle={'Explore other options'}
            onButtonPress={() => {
              navigation.navigate('DashboardContainer', { store_id: storeID});
            }}
          />
      }
      </ScrollView>
    </View>
  );
};

export default Offers;
