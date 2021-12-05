import React from 'react';
import {
  Platform,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
const {width} = Dimensions.get('window');
import * as Colors from '../constants/ColorDefs';
const atta = require('../../assets/atta.png');
const plus = require('../../assets/plus.png');
const SubsCard = props => {

  const cardStyle ={
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 4,
    width: (width-90)/2 ,
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderColor:'#808080' ,
    marginRight: props.index % 2 == 0 ? 10 : 0,
    borderWidth:.5
  }
  return (
    <TouchableOpacity
      key={props.item.itemName}
      style={cardStyle}
      onPress={() => {
      }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <Text
          style={{
            borderRadius: 4,
            borderWidth: 1,
            fontWeight: 'bold',
            fontSize: 12,
            paddingHorizontal: 5,
            paddingVertical: 2 ,
            color: Colors.GREEN,
            borderColor: Colors.GREEN,
            textAlign: 'center',
          }}>
          Rs. 120 OFF
        </Text>
      </View>

      <Image
        style={{
          width: 70,
          height: 94,
          alignSelf: 'center',
          borderRadius: 4,
          marginTop: 14,
        }}
        source={atta}
      />
      <Text
        style={{
          paddingHorizontal: 5,
          fontSize: 12,
          marginTop: 12,
        }}>
        Saffola Active Pro Weight (5l)
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'column'}}>
          <Text
            style={{
              paddingHorizontal: 5,
              fontSize: 14,
              marginTop: 6,
              fontWeight: 'bold',
            }}>
            RS. 725
          </Text>
          <Text
            style={{
              paddingHorizontal: 5,
              fontSize: 14,
              marginTop: 6,
              textDecorationStyle:'solid',
              textDecorationLine:'line-through',
              color:Colors.GRAY
            }}>
            RS. 825
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              props.addClicked && props.addClicked()
            }}>
            <Image
              resizeMode="contain"
              style={{width: 22, height: 22}}
              source={plus}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
            style={{
              height: 25,
              marginTop:15,
              justifyContent: 'center',
              alignItems:'center',
              alignItems: 'center',
              borderColor:Colors.CLR_02A3FC,
              borderRadius:4,
              borderWidth:1
            }}
            onPress={() => {
              props.subsClicked && props.subsClicked()
            }}>
           <Text
            style={{
              paddingHorizontal: 5,
              fontSize: 14,
              fontWeight: 'bold',
              color:Colors.CLR_02A3FC
            }}>
            Subscribe
          </Text>
          </TouchableOpacity>

    </TouchableOpacity>
  );
};

export default SubsCard;
