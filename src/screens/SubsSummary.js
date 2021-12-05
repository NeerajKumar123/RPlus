import React, {useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RPButton from '../components/RPButton'
import AppHeader from '../components/AppHeader';
import RPInput from '../components/RPInput';
import * as Colors from '../constants/ColorDefs';
const subs_calender = require('../../assets/subs_calender.png');

const SubsSummary = () => {
  const navigation = useNavigation();

  const [showPicker, setShowPicker] = useState(false);
  return (
    <View style={{flex: 1, backgroundColor: Colors.CLR_E7ECF2}}>
      <AppHeader
        title="Subscription"
        subtitle ={`Shopping at ${global.pincode}`}
        onLeftPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <SubsSummaryHeader />
        <SubsSummaryAmountBlock />
      </ScrollView>
      <SubsSummaryFooter />
    </View>
  );
};

const SubsSummaryHeader = props => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'column',
        backgroundColor: Colors.WHITE,
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}>
      <Text
        style={{
          color: Colors.CLR_14273E,
          fontWeight: 'bold',
          fontSize: 18,
        }}>
        Product Summary
      </Text>
      <Text style={{color: Colors.CLR_2B415B, fontSize: 14, marginTop: 12}}>
        Mother Dairy Cow Milk (1kg)
      </Text>
      <Text style={{color: Colors.CLR_2B415B, fontSize: 14, marginTop: 12}}>
        Frequency . :{' '}
        <Text style={{fontWeight: 'bold', color: Colors.CLR_2B415B}}>Daily</Text>
      </Text>
      <Text style={{color: Colors.CLR_2B415B, fontSize: 14, marginTop: 12}}>
        Starting From . :{' '}
        <Text style={{fontWeight: 'bold', color: Colors.CLR_2B415B}}>12/02/2021</Text>
      </Text>
      <Text style={{color: Colors.CLR_2B415B, fontSize: 14, marginTop: 12}}>
        Ending at . :{' '}
        <Text style={{fontWeight: 'bold', color: Colors.CLR_2B415B}}>12/02/2021</Text>
      </Text>
    </View>
  );
};

const SubsSummaryAmountBlock = props => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'column',
        backgroundColor: Colors.WHITE,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginTop: 10,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          style={{width: 65, height: 65}}
          source={subs_calender}
        />
        <Text
          style={{
            color: Colors.CLR_14273E,
            fontWeight: 'bold',
            fontSize: 15,
            marginLeft: 18,
          }}>
          {`Your Monthly Order Amount is\n`}
          <Text
            style={{
              color: Colors.CLR_14273E,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Rs.1500
          </Text>
        </Text>
      </View>

      <Text
        style={{
          color: Colors.CLR_2B415B,
          fontSize: 14,
          marginTop: 25,
          marginBottom: 10,
        }}>
        Enter Amount to add
      </Text>
      <RPInput
        value={'2000'}
        fontSize="bold"
        backgroundColor="#EAEAEA"
        onEndEditing={value => {
          console.log('onEndEditing', value);
        }}
      />
    </View>
  );
};

const SubsSummaryFooter = props => {
  return (
    <View
      style={{
        height: 62,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: Colors.CLR_2C3646,
      }}>
      <View
        style={{
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <RPButton
          fontSize={18}
          width="80%"
          height={43}
          backgroundColor={'#4B5462'}
          title={'Pay on Delivery'}
          onPress={() => {
            navigation.navigate('Stores');
          }}
        />
      </View>
      <View
        style={{
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <RPButton
          fontSize={18}
          width="80%"
          height={43}
          backgroundColor={Colors.CLR_EE6F12}
          title={'Subscribe'}
          onPress={() => {
            navigation.navigate('Stores');
          }}
        />
      </View>
    </View>
  );
};

export default SubsSummary;
