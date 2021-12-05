import React from 'react';
import {Text, TouchableOpacity,Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Colors from '../constants/ColorDefs';

const RPButton = props => {
  const {
    iconName = undefined,
    imageSource = undefined,
    backgroundColor = Colors.CLR_0065FF,
    width = 290,
    height = 59,
    iconsize = 20,
    iconcolor = Colors.WHITE,
    fontSize = 15,
    titleColor = Colors.WHITE,
    fontWeight = '700',
    title= 'Button title',
    disable = false,
    borderColor,
    marginTop = 0
  } = props;
  return (
    <TouchableOpacity
      disabled = {disable}
      activeOpacity = {disable ? .7 : 1}
      style={{
        backgroundColor: backgroundColor,
        width: props.width?  props.width : width,
        height: props.height ? props.height : height,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 4,
        marginVertical:props.marginVertical,
        marginTop:marginTop,
        borderColor,
        borderWidth:borderColor ?  1 : 0,
      }}
      onPress={() => {
        props.onPress && props.onPress();
      }}>
      { imageSource &&
        <Image
          resizeMode="contain"
          style={{width: 20, height:20,marginRight: 20}}
          source={imageSource}
        />
      }
      {iconName && <Icon name={iconName} size={iconsize} color={iconcolor} style  = {{marginRight: 20}} />}
      {title && (
        <Text
          style={{
            fontSize: fontSize,
            fontWeight: fontWeight,
            color: titleColor,
            opacity: disable ? .5 : 1.0
          }}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default RPButton;
