import React from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppHeader from '../components/AppHeader';
const search_icon = require('../../assets/search_icon.png');
const cart_icon = require('../../assets/cart_icon.png');
import * as Colors from '../constants/ColorDefs';
import AppConfigData from '../constants/AppConfigData'


const CustServices = () => {
  const AppData = AppConfigData()
console.log(AppData)
  const navigation = useNavigation();

  const openLink = (link, linkType) => {
    console.log('link',link, linkType)
    let finalLink = link;
    if (linkType == 1) { // mail
      if (Platform.OS == 'ios') {
        finalLink = `mailto:${finalLink}`;
      } else {
        finalLink = `mailto:${finalLink}`;
      }
    } else if (linkType == 2) {
      if (Platform.OS == 'ios') {
        finalLink = `telprompt:${finalLink}`;
      } else {
        finalLink = `tel:${finalLink}`;
      }
    } else if (linkType == 3) {
      if (Platform.OS == 'ios') {
        finalLink = `whatsapp://send?text=hello&phone=:${finalLink}`;
      } else {
        finalLink = `whatsapp://send?text=hello&phone=:${finalLink}`;
      }
    }
    Linking.canOpenURL(finalLink)
      .then(supported => {
        if (!supported) {
          Alert.alert(AppData.title_alert, 'Currently not availble');
        } else {
          return Linking.openURL(finalLink);
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <AppHeader
        title="Customer Services"
        isLeftIconEnabeld={true}
        onLeftPress = {()=>{
          navigation.goBack()
        }}
      />
      <View style={styles.roundedBox}>
        <Text style={{fontSize: 17}}>
          If you’d like get in touch with us, please do write to us at
          <Text
            style={{color: Colors.BLUE}}
            onPress={() => {
              openLink(AppData.cust_email,1);
            }}>
            {` ${AppData.cust_email} `}
          </Text>
          or call us on
          <Text
            style={{color: Colors.BLUE}}
            onPress={() => {
              openLink(AppData.cust_mobile_call,2);
            }}>
            {` ${AppData.cust_mobile_call} `}
          </Text>
          between 6:00 am & 8:00 pm throughout the week and we will respond
          immediately.You can also reach out to us on Whatsapp :
          <Text
            style={{color: Colors.GREEN}}
            onPress={() => {
              openLink(AppData.cust_mobile_whatspp,3);
            }}>
            {` ${AppData.cust_mobile_whatspp} `}
          </Text>
        </Text>
      </View>
      </View>
  );
};

export default CustServices;

const styles = StyleSheet.create({
  roundedBox: {
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    paddingVertical: 30,
    paddingHorizontal: 10,
    marginHorizontal:10,
    borderRadius: 4,
    shadowColor: Colors.GRAY,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
    marginTop:50
  },
});
