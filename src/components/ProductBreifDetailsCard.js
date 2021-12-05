import React, {useState} from 'react';
import {Text, View, Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const {width} = Dimensions.get('window');
import * as Colors from '../constants/ColorDefs';
const ProductBreifDetailsCard = props => {
  const {name, mrp, selling_price, deal_price, stock} = props.productDetails;
  const [isNotified, setIsNotified] = useState(false)
  const isDeal = deal_price > 0;
  const price = isDeal ? deal_price : selling_price;
  let off = ((mrp - price) / mrp) * 100;
  off = off.toFixed(0);
  off = `${off} % OFF`;
  const isOutOfStock = stock > 0 ? false : true;

  return (
    <View
      style={{
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginTop: 5,
        backgroundColor: Colors.WHITE,
      }}>
      <Text style = {{fontSize:16}}>{name}</Text>
      {isOutOfStock ? (
        <View style={{flexDirection: 'row', marginTop: 6, justifyContent:'space-between', alignItems:'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            Rs. {isDeal ? deal_price : selling_price}
          </Text>
          <Text style={{ fontSize: 15, color:'darkgray'}}>Out of Stock</Text>
          {/* <TouchableOpacity 
          onPress ={() =>{
            setIsNotified(true)
          }}
          style={{fontSize: 15, borderColor:Colors.ORANGE,borderWidth:1, borderRadius:4, paddingHorizontal:10, paddingVertical:3}}>
          <Text style={{ fontSize: 15, fontWeight:'500', color:Colors.ORANGE}}> {isNotified ? 'Notified' : 'Notify Me'}</Text>
          </TouchableOpacity> */}
        </View>
      ) : (
        <View style={{flexDirection: 'row', marginTop: 6}}>
          <Text style={{fontSize: 15}}>
            Rs. {isDeal ? deal_price : selling_price}
          </Text>
          <Text
            style={{
              textDecorationLine: 'line-through',
              textDecorationStyle: 'solid',
              marginHorizontal: 10,
              color:Colors.GRAY
            }}>
            Rs. {mrp}
          </Text>
          <Text
            style={{
              borderRadius: 4,
              borderWidth: 1,
              borderColor: Colors.GREEN,
              paddingHorizontal: 5,
              fontWeight: 'bold',
              fontSize: 12,
              color: Colors.GREEN,
            }}>
            {off}
          </Text>
        </View>
      )}

      <Text
        style={{
          fontSize: 12,
          color: Colors.CLR_8F8F8F,
          textAlign: 'left',
          marginTop: 5,
        }}>
        (Inclusive of all taxes)
      </Text>
    </View>
  );
};

export default ProductBreifDetailsCard;
