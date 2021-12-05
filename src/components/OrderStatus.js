import React from 'react';
import {
  Platform,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const {width} = Dimensions.get('window');
import * as Colors from '../constants/ColorDefs';
const homeSelected = require('../../assets/home_selected.png');
const homeUnselected = require('../../assets/home_normal.png');
const cateSelected = require('../../assets/category_selected.png');
const cateUnselected = require('../../assets/category_normal.png');
const offersSelected = require('../../assets/offer_selected.png');
const offersUnselected = require('../../assets/offer_normal.png');
const accountSelected = require('../../assets/account_selected.png');
const accountUnselected = require('../../assets/account_normal.png');

const progressConfigs = [
  {
    index: 1,
    tabName: 'Order Placed',
    iconSelected: homeSelected,
    iconUnselected: homeUnselected,
  },
  {
    index: 2,
    tabName: 'Item Packed',
    iconSelected: cateSelected,
    iconUnselected: cateUnselected,
  },
  {
    index: 3,
    tabName: 'Out for Delivery',
    iconSelected: offersSelected,
    iconUnselected: offersUnselected,
  },
  {
    index: 4,
    tabName: 'Delivered',
    iconSelected: offersSelected,
    iconUnselected: offersUnselected,
  },
];
const OrderStatus = props => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 20,
      }}>
      {progressConfigs &&
        progressConfigs.map((item, index) => {
          return (
            <StatusItem
              key={item.tabName}
              item={item}
              itemIndex={index}
              progressIndex={props.progressIndex}
              onSelected={() => {
                props.onTabSelected(index + 1);
              }}
            />
          );
        })}
    </TouchableOpacity>
  );
};

const StatusItem = props => {
  const {item, itemIndex, progressIndex} = props;
  let alignment = 'center'
  if(itemIndex == 0){
    alignment = 'left'
  }else if(itemIndex == 3){
      alignment = 'right'
  }else{
      alignment = 'center'
  }
  return (
    <View
      key={item.tabName}
      style={{
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 36,
        flex: 1,
        backgroundColor: 'red',
        marginHorizontal: 1,
      }}>
      <View
        style={{
          backgroundColor: 'orange',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{flex:itemIndex == 0 ? 0 : 1, height: 10, backgroundColor: 'green'}} />
        <View
          style={{
            height: 15,
            width: 15,
            borderRadius: 7.5,
          }}
        />
        <View style={{flex:itemIndex == 3 ? 0 : 1, height: 10, backgroundColor: 'green'}} />
      </View>
      <Text style= {{textAlign: alignment, fontSize:10, backgroundColor:'white', width:'100%'}} >
          {item.tabName}
          </Text>
    </View>
  );
};

// const StatusItem = props => {
//   const {item, itemIndex, progressIndex} = props;
//   return (
//     <View
//       key={item.tabName}
//       style={{
//         alignItems: 'center',
//         flexDirection: 'column',
//         justifyContent:'flex-start',
//         height: 36,
//         width:(width - 60 )/4,
//         backgroundColor: 'red',
//         marginHorizontal: 1,
//       }}>
//       <View style={{
//         alignItems: 'center',
//         flexDirection: 'row',
//         height: 36,
//         backgroundColor: 'red',
//         marginHorizontal: 1,
//       }}>
//         <View
//           style={{
//             backgroundColor:
//               progressIndex > itemIndex ? Colors.CLR_03C47E : Colors.WHITE,
//             height: 20,
//             width: 20,
//             borderRadius: 10
//           }}
//         />
//         <View
//           style={{
//             backgroundColor:
//               progressIndex > itemIndex + 1 ? Colors.WHITE : 'orange',
//             flex: 1,
//             height: progressIndex > itemIndex + 1 ? 1 : 0.5,
//           }}
//         />
//       </View>
//       <Text
//         style={{
//           color: progressIndex > itemIndex ? Colors.RED : Colors.BLACK,
//           fontSize: 13,
//           width:(width - 60 )/4,
//           fontWeight: 'bold',
//           textAlign:'left',
//           backgroundColor:'green'
//         }}>
//         {item.tabName}
//       </Text>
//     </View>
//   );
// };

export default OrderStatus;
