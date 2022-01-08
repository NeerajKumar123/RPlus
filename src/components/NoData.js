import React from 'react';
import {Text, View, Image} from 'react-native';
import RPButton from '../components/RPButton';
import * as Colors from '../constants/ColorDefs';

const NoData = props => {
  const {image, title, subtitle, buttonTitle, onButtonPress, bgColor = Colors.CLR_EE6F12, marginTop} = props;
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'column',
        padding: 20,
        marginTop,
        alignItems: 'center',
        justifyContent: 'center',
       backgroundColor:"white"
      }}>
      <Image
        resizeMode="contain"
        style={{
          width: 143,
          height: 143,
        }}
        source={image}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: Colors.CLR_1D2237,
          marginTop: 18,
        }}>
        {title}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: Colors.CLR_656A80,
          marginTop: 8,
          marginBottom: 30,
          width: 230,
          textAlign: 'center',
        }}>
        {subtitle}
      </Text>
      {buttonTitle && (
        <RPButton
          title={buttonTitle}
          backgroundColor={bgColor}
          onPress={() => {
            onButtonPress && onButtonPress();
          }}
        />
      )}
    </View>
  );
};

export default NoData;
