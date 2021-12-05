import React, { useState } from 'react';
import {
  Platform,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const { width } = Dimensions.get('window');
import * as Colors from '../constants/ColorDefs';
const plus = require('../../assets/plus.png');
import HTML from 'react-native-render-html';

const ExpandableCard = props => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <View
      key={'abour'}
      style={{
        backgroundColor: Colors.WHITE,
        width: '100%',
        flexDirection: 'column',
        marginVertical: 5,
      }}>
      <TouchableOpacity
        onPress={() => {
          setIsExpanded(!isExpanded);
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Colors.CLR_E7ECF2,
          height: 42,
          borderRadius: 4,
          paddingHorizontal: 5,
          justifyContent: 'space-between'
        }}>
        <Text
          style={{ color: Colors.CLR_16253B, fontWeight: 'bold', fontSize: 14 }}>
          {props.cardTitle}
        </Text>
        <Icon name={isExpanded ? 'minus-circle-outline' : 'plus-circle-outline'} size={15} color={Colors.GRAY} />
      </TouchableOpacity>
      {isExpanded && <HTML source={{ html: props.cardDesc }} />}
    </View>
  );
};
export const ExpandableCardOtherInfo = props => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { type, model_name, shelf_life, shelf_life_month_years, container_type, organic, polished, package_dimension_length, package_dimension_width, package_dimension_height, manufactured_by, packed_by, exp_date } = props.cardDesc
  return (
    <View
      key={'about'}
      style={{
        backgroundColor: Colors.WHITE,
        width: '100%',
        flexDirection: 'column',
        marginVertical: 5,
      }}>
      <TouchableOpacity
        onPress={() => {
          setIsExpanded(!isExpanded);
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Colors.CLR_E7ECF2,
          height: 42,
          borderRadius: 4,
          paddingHorizontal: 5,
          justifyContent: 'space-between'
        }}>
        <Text
          style={{ color: Colors.CLR_16253B, fontWeight: 'bold', fontSize: 14 }}>
          {props.cardTitle}
        </Text>
        <Icon name={isExpanded ? 'minus-circle-outline' : 'plus-circle-outline'} size={15} color={Colors.GRAY} />
      </TouchableOpacity>
      {isExpanded && 
      <>
      <OtherBlock data={'Type'} value={type} />
      <OtherBlock data={'Model Name'} value={model_name} />
      <OtherBlock data={'Self Life'} value={shelf_life} />
      <OtherBlock data={'Self Life Month Years'} value={shelf_life_month_years} />
      <OtherBlock data={'Container Type'} value={container_type} />
      <OtherBlock data={'Organic'} value={organic} />
      <OtherBlock data={'Polished'} value={polished} />
      <OtherBlock data={'Package Dimension Length'} value={package_dimension_length} />
      <OtherBlock data={'Package Dimension Width'} value={package_dimension_width} />
      <OtherBlock data={'Package Dimension Height'} value={package_dimension_height} />
      <OtherBlock data={'Manufactured By'} value={manufactured_by} />
      <OtherBlock data={'Packed By'} value={packed_by} />
      <OtherBlock data={'Exp Date'} value={exp_date} />

      </>
      }
    </View>
  );
};

export const OtherBlock = props => {
  return (
    <View
      key={'about'}
      style={{
        backgroundColor: Colors.WHITE,
        width: '100%',
        flexDirection: 'row',
        marginVertical: 5,
        justifyContent: 'space-between'
      }}>
      <Text
        style={{ color: Colors.CLR_16253B, fontSize: 12, fontWeight: '700', textAlign: 'left', flex:1 }}>
        {props.data}:
      </Text>
      <Text
        style={{ color: Colors.CLR_16253B, fontSize: 12, textAlign: 'left', flex:1 }}>
        {props.value ? `${props.value}` : 'Not Available'}
      </Text>

    </View>
  );
};

export default ExpandableCard;
