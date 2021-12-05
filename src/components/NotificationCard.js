import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as Colors from '../constants/ColorDefs';

const NotificationCard = props => {
    const { image,heading ,description} = props.item
    return (
      <TouchableOpacity
        onPress={() => {
          props.onItemPressed();
        }}
        key={name}
        style={{
          backgroundColor: Colors.WHITE,
          width: '100%',
          marginTop: 10,
          flexDirection: 'row',
          borderRadius: 4,
          paddingHorizontal: 17,
          paddingVertical: 15,
          shadowColor: Colors.GRAY,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowRadius: 2,
          shadowOpacity: 0.5,
        }}>
        <Image resizeMode = 'contain' style={{ width: 42, height: 42}} source={{ uri: image }} />
        <View
          style={{
            flex: 5,
            justifyContent: 'center',
            marginHorizontal: 10,
            marginLeft: 20,
          }}>
          <Text style = {{opacity: 1}}>{heading}</Text>
          <View style={{ flexDirection: 'row', marginTop: 6 }}>
            <Text style={{opacity:1 }}>5 Hrs</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  export default NotificationCard;
  