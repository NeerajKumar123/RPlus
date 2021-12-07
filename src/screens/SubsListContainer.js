import React, {useState} from 'react';
import {Text, View, FlatList, TouchableOpacity,Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppHeader from '../components/AppHeader';
import SubsListCard from '../components/SubsListCard';
import RPButton from '../components/RPButton'
import * as Colors from '../constants/ColorDefs';

const SubsListContainer = () => {
  const navigation = useNavigation();
  const [showPicker, setShowPicker] = useState(false);
  return (
    <View
      style={{
        flex: 1 
        }}>
      <AppHeader
        title="Subscription"
        subtitle ={`Shopping at ${global.pincode}`}
        onLeftPress={() => {
          navigation.goBack();
        }}
      />
      <View>
        <FlatList
          style={{marginTop: 12}}
          horizontal={false}
          keyExtractor={(item, index) => 'key_' + index}
          data={[{itemName: 'name1'}, {itemName: 'name2'}, {itemName: 'name3'}]}
          renderItem={item => <SubsListCard item={item} />}
        />
      </View>
      <SubsDaysBlock
        frequencyClicked={() => {
        }}
        dateClicked={() => {
          setShowPicker(true)
        }}
      />
      {showPicker &&  (
        <View
          style={{
            backgroundColor: Colors.WHITE,
            position: 'absolute',
            bottom: 0,
            height: Platform.OS == 'ios' ? 400 : 0,
            width: '100%',
          }}>
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode={'date'}
            display={Platform.OS == 'ios' ? 'inline' : 'default'}
            onChange={(e, date) => {
              setShowPicker(false)
            }}
          />
        </View>
      )}
      <SubsListContainerFooter />
    </View>
  );
};

const SubsDaysBlock = props => {
  return (
    <View
      style={{
        //   height: 200,
        flexDirection: 'column',
        backgroundColor: Colors.WHITE,
        margin: 10,
        borderRadius: 4,
        padding: 20,
      }}>
      <Text
        style={{
          fontSize: 16,
          color: Colors.BLACK,
          fontWeight: 'bold',
        }}>
        Subscription Days
      </Text>

      <FlatList
        style={{paddingVertical: 10}}
        horizontal={true}
        scrollEnabled={false}
        keyExtractor={(item, index) => 'key_' + index}
        ItemSeparatorComponent={() => <View style={{height: 5, width: 20}} />}
        data={[
          {itemName: 'Daily'},
          {itemName: 'Alternate Days'},
          {itemName: 'Select Days'},
        ]}
        renderItem={({item}) => (
          <RoundedBoxFrequency
            item={item}
            optionClicked={() => {
              props.frequencyClicked();
            }}
          />
        )}
      />
      <Text
        style={{
          fontSize: 14,
          color: Colors.CLR_1D2A39,
        }}>
        Select Date
      </Text>
      <View
        style={{
          marginTop: 14,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <SelectDate
          value="Start Date"
          dateClicked={() => {
            props.dateClicked(1);
          }}
        />
        <SelectDate
          value="To Date"
          dateClicked={() => {
            props.dateClicked(1);
          }}
        />
      </View>
    </View>
  );
};

const SubsListContainerFooter = props => {
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
        <Text
          style={{
            fontSize: 16,
            color: Colors.WHITE,
            fontWeight: 'bold',
          }}>
          Rs.55.00 per kg
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: Colors.WHITE,
          }}>
          Rs.1500.00 per month
        </Text>
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

const RoundedBoxFrequency = props => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.optionClicked(props.item.itemName);
      }}
      style={{
        backgroundColor: Colors.CLR_02A3FC,
        paddingHorizontal: 10,
        paddingVertical: 7,
        minWidth: 71,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 14,
          color: Colors.WHITE,
        }}>
        {props.item && props.item.itemName}
      </Text>
    </TouchableOpacity>
  );
};

const SelectDate = props => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: Colors.CLR_02A3FC,
        minWidth: 71,
        borderRadius: 4,
        width: 144,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.CLR_F1F3FB,
      }}>
      <Text
        style={{
          fontSize: 14,
          color: '#898FA8',
        }}>
        {props.value}
      </Text>
    </TouchableOpacity>
  );
};

export default SubsListContainer;
