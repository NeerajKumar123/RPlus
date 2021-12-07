import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as Colors from '../constants/ColorDefs';

const NotificationCard = props => {
    const { image,heading ,description, onItemPressed = () =>{}} = props.item
    return (
      <TouchableOpacity
        onPress={() => {
          onItemPressed();
        }}
        key={name}
        style={{
          backgroundColor: Colors.WHITE,
          width: '100%',
          marginTop: 10,
          flexDirection: 'row',
          alignItems:'center',
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
        <Image resizeMode = 'cover' style={{ width: 42, height: 42, backgroundColor:'red'}} source={{ uri: image }} />
        <View
          style={{
            flex: 5,
            justifyContent: 'center',
            marginHorizontal: 10,
            marginLeft: 20,
          }}>
          <Text style = {{opacity: 1, fontSize:15, fontWeight:'600'}}>{heading}</Text>
          <View style={{ flexDirection: 'row', marginTop: 6 }}>
            <Text style={{opacity:1, color:Colors.CLR_49537D }}>{description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  export default NotificationCard;
  