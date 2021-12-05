import React from 'react';
import {Text, View} from 'react-native';
import * as Colors from '../constants/ColorDefs';

const Search = () => {
    return (
        <View
          style={{flex:1, backgroundColor:Colors.GREEN, justifyContent:'center', alignItems:'center'}}>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 12,
              textAlign: 'left',
              textAlignVertical: 'center',
              color: Colors.BLACK,
              fontWeight: '500',
            }}>
            This is Search container
          </Text>
        </View>
      );
}


export default  Search