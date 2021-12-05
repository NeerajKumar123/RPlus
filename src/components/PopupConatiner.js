import React from 'react';
import {Modal, View,Platform} from 'react-native';
import * as Colors from '../constants/ColorDefs';
const PopupConatiner = (props) => {
  return (
    <Modal
      visible={true}
      animationType="slide"
      presentationStyle="overFullScreen"
      transparent={true}
      onCancel={() => {
      }}>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: Colors.CLR_BLACK_OPACITY_30,
          justifyContent: 'flex-end',
        }}>
        {props.children}
      </View>
    </Modal>
  );
};

export default PopupConatiner;
