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
import { getNotification } from '../apihelper/Api.js';
import SearchProductModel from '../components/SearchProductModel';
import {useIsFocused} from '@react-navigation/native';
import * as Storage from '../helpers/RPStorage';
import NotificationCard from '../components/NotificationCard';
const vertical_bubbles = require('../../assets/vertical_bubbles.png');


const Notification = props => {

const [isLoading, setIsLoading] = useState(false);
const [isReady, setIsReady] = useState(false);
const [notifications, setNotifications] = useState();
const navigation = useNavigation();


useEffect(() => {
  const paramForNotification = { store_id: 25}
  getNotification(paramForNotification, (notificatinRes)=>{
    const notification = notificatinRes.payload_notification
    setNotifications(notification)
    setIsReady(true)
    console.log('notificatinRes======>', JSON.stringify(notification))

    const dummyNotifs = [{
      heading:'heading1',
      image:'https://picsum.photos/200/300',
      description:'Upto 30% Off'
    },
    {
      heading:'heading2',
      image:'https://picsum.photos/200/300',
      description:'Upto 30% Off'
    },
    {
      heading:'heading3',
      image:'https://picsum.photos/200/300',
      description:'Upto 30% Off'
    }]
    setNotifications(dummyNotifs)

  })
  
}, []);





    return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor:Colors.CLR_E7ECF2,
          }}>
          <AppHeader
            title="Notifications"
            isLeftIconEnabeld={true}
            onLeftPress={() => {
              navigation.goBack();
            }}
            rightIcons={[
              {
                iconSource: vertical_bubbles,
                color: Colors.CLR_5F259F,
                iconBg: Colors.GREEN,
                onPress: () => {
                },
              }]}
          />
          {isLoading && <RPLoader />}
          {isReady && notifications && notifications.length == 0 && (
            <EmptyNotif 
            navigation = {navigation}
            />
          )}
          {notifications && notifications.length > 0 && (
              <FlatList
                style={{ width: '100%',flex:1, padding:16 }}
                keyExtractor={(item, index) => 'key_' + index}
                data={notifications}
                renderItem={({ item }) => (
                  <NotificationCard
                  item={item}
                  onLoaderStateChanged = {(isLoading) =>{
                    props.onLoaderStateChanged(isLoading)
                  }}
                  onItemPressed={() => {
                    props.onItemPressed(item);
                  }}
                />
                )}
              />          
              
          )}
        </View>
      );
    };
    

    
    const EmptyNotif = props => {
      const {navigation} = props
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
            There is no notification to show!
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
              navigation.goBack()
            }}
          />
        </View>
      );
    };

export default Notification;