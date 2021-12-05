import React from 'react';
import {Text, View, Image} from 'react-native';
import RPButton from './RPButton';
import * as Colors from '../constants/ColorDefs';
const no_internet = require('../../assets/no_internet.png');

const NoInternetDashBoard = props => {
  const {onButtonPress} = props;
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'column',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flex:1,
        backgroundColor:Colors.CLR_E7ECF2
      }}>
      <Image
        resizeMode="contain"
        style={{
          width: 143,
          height: 143,
        }}
        source={no_internet}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: Colors.CLR_68708E,
          marginTop: 18,
        }}>
        Ooopsss!!
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: Colors.CLR_68708E,
          marginTop: 8,
          marginBottom: 30,
          width: 230,
          textAlign: 'center',
        }}>
        Slow or no internet connection.
        Please check your internet settings
      </Text>
      <RPButton
          title='Try Again'
          backgroundColor={Colors.CLR_044BF7}
          onPress={() => {
            onButtonPress();
          }}
        />
    </View>
  );
};

export default NoInternetDashBoard;
