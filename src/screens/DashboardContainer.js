import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import StoreDashboard from '../screens/StoreDashboard';
import Offers from '../screens/Offers';
import Profile from '../screens/Profile';
import Login from '../screens/Login';
import ExploreCategoriesContainer from '../screens/ExploreCategoriesContainer';
import BottomTab from '../components/BottomTab';
import * as Storage from '../helpers/RPStorage'


const DashboardContainer = props => {
  const [currentSeletedIndex, setCurrentSeletedIndex] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      Storage.loadInitailData(()=>{
        setIsLoggedIn(global.userInfo && global.userInfo.customer_id)
      })
    }, [currentSeletedIndex])
  return (
    <View style={{flex: 1}}>
      {currentSeletedIndex == 1 && <StoreDashboard />}
      {currentSeletedIndex == 2 && <ExploreCategoriesContainer />}
      {currentSeletedIndex == 3 && <Offers />}
      {currentSeletedIndex == 4 && isLoggedIn && (
        <Profile
          onLogout={(updatedIndex) => {
            setIsLoggedIn(false);
            updatedIndex && setCurrentSeletedIndex(updatedIndex)
          }}
        />
      )}
      {currentSeletedIndex == 4 && !isLoggedIn && (
        <Login
          onLogin={(updatedIndex) => {
            setIsLoggedIn(true);
            updatedIndex && setCurrentSeletedIndex(updatedIndex)
          }}
        />
      )}
      <BottomTab
        selectedIndex={currentSeletedIndex}
        onTabSelected={index => {
          if(!isLoggedIn){
            global.lastScreenName = 'DashboardContainer'
          }else{
            global.lastScreenName = undefined
          }
          setCurrentSeletedIndex(index);
        }}
      />
    </View>
  );
};

export default DashboardContainer;
