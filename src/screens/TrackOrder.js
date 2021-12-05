
import React from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppHeader from '../components/AppHeader';
import RPButton from '../components/RPButton'
import * as Colors from '../constants/ColorDefs';
const thanks = require('../../assets/thanks.png');
const progressConfigs = [
  {
    index: 1,
    tabName: 'Order Placed'
  },
  {
    index: 2,
    tabName: 'Item Packed'
  },
  {
    index: 3,
    tabName: 'Out for Delivery'
  },
  {
    index: 4,
    tabName: 'Delivered'
  },
];
const TrackOrder = props => {
    const navigation = useNavigation()
    const progressIndex = 2
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AppHeader
        title="Track order"
        isLeftIconEnabeld={true}
        onLeftPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView style = {{width:'100%', height:'100%', paddingHorizontal:20, paddingTop:30}}>
       {progressConfigs &&
        progressConfigs.map((item, index) => {
          return (
            <StatusItem
              key={item.tabName}
              item={item}
              itemIndex={index}
              progressIndex={progressIndex}
              onSelected={() => {
                props.onTabSelected(index + 1);
              }}
            />
          );
        })}
        </ScrollView>
      </View>
    );
  };

  const StatusItem = props => {
    const {item, itemIndex, progressIndex} = props;
    console.log('progressIndex',progressIndex, itemIndex)
    return (
      <View
        key={item.tabName}
        style={{
          alignItems: 'flex-start',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          flex: 1,
        }}>
        {itemIndex != 0 && <View style = {{backgroundColor: progressIndex > itemIndex ? Colors.CLR_0376FC : Colors.GRAY, height:50, width:5, marginLeft:5}} />}
        <View style = {{flexDirection:'row'}}>
        <View
            style={{
              backgroundColor:progressIndex > itemIndex ? Colors.CLR_0376FC : Colors.GRAY,
              height: 15,
              width: 15,
              borderRadius: 7.5,
            }}
          />
          <Text style= {{textAlign: 'left', fontSize:13,width:'100%', marginLeft:20}} >
            {item.tabName}
        </Text>
          </View>
          </View>
          
        
    );
  };
  

  export default TrackOrder