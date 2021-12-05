import React, {useState} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AvailableOfferCard from './AvailableOfferCard';
import * as Colors from '../constants/ColorDefs';

const PDOffers = (props) => {
    const [banckOffers, setBankOffers] = useState(props.banckOffers)
  const [showMoreClicked, setShowMoreClicked] = useState(false);
  return (
    <View
      style={{
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal:20,
        paddingVertical:20,
        backgroundColor:Colors.WHITE,
      }}>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'left',
          color: Colors.CLR_16253B,
          fontWeight: 'bold',
          width: '100%',
        }}>
        Available Offers
      </Text>
      <FlatList
        style={{width: '100%', paddingBottom: 10}}
        horizontal={false}
        scrollEnabled={false}
        keyExtractor={(item, index) => 'key_' + index}
        ItemSeparatorComponent = { () =><View style = {{ height:.5, width:'100%', backgroundColor:Colors.GRAY}}/>}
        // ListFooterComponent={() => (
        //   <View
        //     style={{
        //       height: 50,
        //       justifyContent: 'center',
        //       alignItems: 'center',
        //     }}>
        //     <TouchableOpacity
        //       onPress={() => {
        //         setShowMoreClicked(!showMoreClicked);
        //         setBankOffers(
        //             showMoreClicked
        //             ? [
        //                 {itemName: 'name1'},
        //                 {itemName: 'name2'},
        //                 {itemName: 'name1'},
        //                 {itemName: 'name2'},
        //                 {itemName: 'name1'},
        //                 {itemName: 'name2'},
        //               ]
        //             : [{itemName: 'name1'}, {itemName: 'name2'}],
        //         );
        //       }}
        //       style={{
        //         fontSize: 12,
        //         textAlign: 'center',
        //         fontWeight: 'bold',
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //       }}>
        //       <Text
        //         style={{
        //           fontSize: 16,
        //           color: Colors.CLR_02A3FC,
        //         }}>
        //         {!showMoreClicked ? 'View Less offers' : 'View 5 more offers'}
        //       </Text>
        //     </TouchableOpacity>
        //   </View>
        // )}
        data={banckOffers}
        renderItem={({item}) => <AvailableOfferCard item={item} />}
      />
    </View>
  );
};

export default PDOffers;
