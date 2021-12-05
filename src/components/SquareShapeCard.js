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
const cwidth = (width - 84) / 2;
const cheight = cwidth;

const SquareShapeCard = props => {
  const {marginRight, item, onPress = () => {}} = props;
  const {image, name} = item;
  return (
    <TouchableOpacity
      activeOpacity={1}
      key={name}
      style={{
        flexDirection: 'row',
        shadowColor: Colors.GRAY,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
        height: cheight,
        width: cwidth,
        borderRadius: 4,
        overflow: 'hidden',
        marginRight,
        justifyContent: 'center',
      }}
      onPress={() => {
        console.log('onPress');
        onPress();
      }}>
      <Image
        resizeMode="stretch"
        style={{width: '100%', height: '100%', alignSelf: 'center'}}
        source={{
          uri: image,
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: Colors.WHITE,
          borderRadius: 4,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 10,
          height: 40,
          width: '90%',
        }}
        onPress={() => {
          onPress();
        }}>
        <Text
          style={{
            fontWeight: '800',
            textAlign: 'center',
            color: Colors.CLR_17264D,
          }}>
          {name}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export const SquareShapeCardBaverage = props => {
  const {marginRight, item, onPress = () => {}} = props;
  const {image, name, max_percentage} = item;
  return (
    <View
      style={{
        shadowColor: Colors.GRAY,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
        borderRadius: 4,
        alignItems: 'center',
        height: cheight + 30,
        overflow: 'hidden',
        width: cwidth,
        marginRight:marginRight,
        elevation:3
      }}>
      <TouchableOpacity
        key={name}
        style={{
          backgroundColor: Colors.WHITE,
          flexDirection: 'row',
          height: cheight,
          width: cwidth,
          overflow: 'hidden',
          justifyContent: 'center',
        }}
        onPress={() => {
          onPress();
        }}>
        <Image
          resizeMode="stretch"
          style={{width: '100%', height: '100%', alignSelf: 'center'}}
          source={{
            uri: image,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.WHITE,
          borderRadius: 4,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 5,
          height: 65,
          width: '90%',
        }}
        onPress={() => {
          onPress();
        }}>
        <Text style={{color: Colors.CLR_17264D, fontSize:16, position:'absolute', top:5}}>
          Upto
          <Text style={{color: Colors.CLR_11A83B, fontWeight: '800',fontSize:16}}>
            {` ${max_percentage} OFF`}
          </Text>
        </Text>
        <Text numberOfLines ={2} style={{fontWeight: '700', textAlign:'center', marginTop:25, fontSize:16, paddingHorizontal:5}}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const SquareShapeCardDryFruit = props => {
  const {marginRight} = props;
  return (
    <TouchableOpacity
      key={props.item.itemName}
      style={{
        backgroundColor: Colors.WHITE,
        flexDirection: 'row',
        shadowColor: Colors.GRAY,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
        height: cheight + 50,
        width: cwidth,
        borderRadius: 4,
        overflow: 'hidden',
        justifyContent: 'center',
        marginRight,
      }}
      onPress={() => {
        props?.onPress();
      }}>
      <Image
        resizeMode="stretch"
        style={{width: '100%', height: '100%', alignSelf: 'center'}}
        source={{
          uri: props.item.image,
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: 'gray',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 14,
          height: 38,
          width: '100%',
        }}>
        <Text style={{fontWeight: '800'}}>DRY FRUITS</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default SquareShapeCard;
