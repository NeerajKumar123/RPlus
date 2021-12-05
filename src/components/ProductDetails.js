import React from 'react';
import {Text, View, FlatList, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ExpandableCard,{ExpandableCardOtherInfo} from './ExpandableCard';
import * as Colors from '../constants/ColorDefs';

const ProductDetails = props => {
  const navigation = useNavigation();

  const {about, benefits, otherInfo} = props;

  return (
    <View
      style={{
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: Colors.WHITE,
      }}>
      <Text
        style={{
          fontSize: 18,
          textAlign: 'left',
          color: Colors.CLR_16253B,
          fontWeight: 'bold',
          width: '100%',
        }}>
        Product Details
      </Text>
      {about && <ExpandableCard cardTitle="About Product" cardDesc={about} />}
      {benefits && <ExpandableCard cardTitle="Benefits" cardDesc={benefits} />}
      {otherInfo && (
        <ExpandableCardOtherInfo cardTitle="Other Info" cardDesc={otherInfo} />
      )}
    </View>
  );
};

export default ProductDetails;
