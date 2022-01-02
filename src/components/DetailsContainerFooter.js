import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
const {width} = Dimensions.get('window');
import * as Colors from '../constants/ColorDefs';
import withCartSubscription from '../components/withCartSubscription'

const DetailsContainerFooter = props => {
  const isOutOfStock = props.item.stock > 0 ? false : true;

    return (
      <View
        style={{
          height: 75,
          width: '100%',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => {
            props.gotoCartPressed();
          }}
          style={{
            backgroundColor: Colors.CLR_2C3646,
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Colors.WHITE,
              fontWeight: 'bold',
            }}>
            Go to Cart
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled = {isOutOfStock}
          onPress={() => {
            props.onPlusPressed && props.onPlusPressed();
          }}
          style={{
            backgroundColor: Colors.CLR_E1650B,
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Colors.WHITE,
              fontWeight: 'bold',
              opacity : isOutOfStock ? .7 : 1.0
            }}>
              {isOutOfStock ? 'Out Of Stock' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  export default withCartSubscription(DetailsContainerFooter)