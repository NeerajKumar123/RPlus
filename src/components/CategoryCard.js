import React from 'react';
import {
  Platform,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
const {width} = Dimensions.get('window');
import * as Colors from '../constants/ColorDefs';

const CategoryCard = props => {
  const {item, isSelected = false} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress && props.onPress();
      }}
      key={item.image}
      style={{
        flexDirection: 'column',
        marginHorizontal: 12,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 5,
        width: 85,
        borderBottomColor: isSelected ? Colors.RED : Colors.WHITE,
        borderBottomWidth: isSelected ? 3 : 0,
        paddingVertical: 5,
      }}>
      <View
        style={{
          width: 90,
          height: 90,
          borderRadius: 45,
          borderColor: '#F4CA4A',
          borderWidth: 3,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}>
        <Image
          resizeMode="cover"
          style={{
            width: 85,
            borderRadius: 42.5,
            height: 85,
            overflow: 'hidden',
            alignSelf: 'center',
          }}
          source={{uri: item.image} ? {uri: item.image} : null}
        />
      </View>
      <Text
        style={{
          color: '#17264D',
          fontSize: 12,
          textAlign: 'center',
          marginTop: 5,
        }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};
export const CategoryCardGrid = props => {
  const {item, isSelected = false, index = 1, onPress = () => {}} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      key={item.image}
      style={{
        flexDirection: 'column',
        marginHorizontal: [1, 4, 7, 10, 13, 16, 19, 22].includes(index)
          ? 15
          : 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '30%',
        borderBottomColor: isSelected ? Colors.RED : Colors.WHITE,
        borderBottomWidth: isSelected ? 3 : 0,
        padding: 5,
      }}>
      <View
        style={{
          width: 90,
          height: 90,
          borderRadius: 45,
          borderColor: '#F4CA4A',
          borderWidth: 2.5,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}>
        <Image
          resizeMode="cover"
          style={{
            width: 85,
            borderRadius: 42.5,
            height: 85,
            overflow: 'hidden',
            alignSelf: 'center',
          }}
          source={{uri: item.image} ? {uri: item.image} : null}
        />
      </View>
      <Text
        style={{
          color: '#17264D',
          fontSize: 14,
          textAlign: 'center',
          marginTop: 8,
          width: '100%',
        }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export const Category3by3BlockCard = props => {
  const {item, onPress, index} = props;
  const {name, image} = item;
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      key={name}
      style={{
        flexDirection: 'column',
        marginTop: index > 2 ? 10 : 0,
        flex: [1, 4, 7, 10, 13, 16, 19, 22].includes(index) ? 0.34 : 0.33,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 3,
      }}>
      <View
        style={{
          width: 107,
          height: 107,
          borderRadius: 53.5,
          borderColor: '#F4CA4A',
          borderWidth: 2.5,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}>
        <Image
          resizeMode="cover"
          style={{
            width: 104,
            height: 104,
            borderRadius: 52,
            alignSelf: 'center',
            overflow: 'hidden',
          }}
          source={{uri: image} ? {uri: image} : null}
        />
      </View>
      <Text
        style={{
          color: '#334036',
          fontSize: 14,
          textAlign: 'center',
          marginTop: 8,
          width: '100%',
        }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export const CategoryCardNewArrival = props => {
  const {item, isSelected = false} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress && props.onPress();
      }}
      key={item.category_name}
      style={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 5,
        width: '100%',
        borderRightColor: isSelected ? Colors.CLR_044BF7 : Colors.WHITE,
        borderRightWidth: isSelected ? 3 : 0,
        paddingVertical: 5,
      }}>
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          borderColor: isSelected ? Colors.CLR_044BF7 : Colors.WHITE,
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}>
         <Image
            resizeMode="cover"
            style={{
              width: 55,
              borderRadius: 27.5,
              height: 55,
              overflow: 'hidden',
              alignSelf: 'center',
            }}
            source={
              {uri: item.category_image} ? {uri: item.category_image} : null
            }
          />
      </View>
      <Text
        style={{
          color: isSelected ? Colors.CLR_0065FF : Colors.CLR_17264D,
          fontSize: 12,
          fontWeight: isSelected ? 'bold' : 'normal',
          textAlign: 'center',
          marginTop: 5,
        }}>
        {item.category_name}
      </Text>
    </TouchableOpacity>
  );
};
export default CategoryCard;
