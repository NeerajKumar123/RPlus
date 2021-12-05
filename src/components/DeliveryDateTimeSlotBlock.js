import React from 'react';
import {Text, View, TouchableOpacity, Image, FlatList} from 'react-native';
import * as Colors from '../constants/ColorDefs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {areEqualDates, getDateFromstring} from '../helpers/BaseUtility';

const DeliveryDateTimeBlock = props => {
  const {
    deliveryDateSlot,
    deliveryTimeSlot,
    deliverySlots,
    timeSlots,
    title,
  } = props;
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'column',
        backgroundColor: Colors.WHITE,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginTop: props?.marginTop ?? 10,
      }}>
      {title && (
        <Text
          style={{
            color: Colors.CLR_14273E,
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          Choose Delivery Time
        </Text>
      )}
      {deliverySlots && (
        <FlatList
          style={{width: '100%', marginTop: 12}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => 'key_' + index}
          ItemSeparatorComponent={() => (
            <View style={{width: 8, height: '100%'}} />
          )}
          data={deliverySlots}
          renderItem={({item}) => (
            <DateCard
              deliveryDateSlot={deliveryDateSlot}
              item={item}
              onDateSelected={dateSlotItem => {
                props.onDateSelected && props.onDateSelected(dateSlotItem);
              }}
            />
          )}
        />
      )}

      {timeSlots && (
        <FlatList
          style={{width: '100%', marginTop: 12}}
          horizontal={false}
          keyExtractor={(item, index) => 'key_' + index}
          ItemSeparatorComponent={() => (
            <View style={{height: 10, width: '100%'}} />
          )}
          data={timeSlots}
          renderItem={({item}) => (
            <TimeSlotCard
              isSelected={
                deliveryTimeSlot && deliveryTimeSlot.slot_id == item.slot_id
              }
              item={item}
              onTimeSlotSelected={() => {
                props.onTimeSlotSelected && props.onTimeSlotSelected(item);
              }}
            />
          )}
        />
      )}
    </View>
  );
};

const DateCard = props => {
  const {displaydate, date} = props.item;
  const {deliveryDateSlot} = props;
  const dateComps = displaydate.split(' ');
  let dayName = dateComps[0];
  dayName = dayName ? dayName.substring(0, 3) : '';
  const monthname = dateComps[1];
  const dayNumber = dateComps[2];
  const monthAndDayNumber = `${monthname} ${dayNumber}`;
  const isDateCardSelected =
    deliveryDateSlot &&
    areEqualDates(
      getDateFromstring(deliveryDateSlot.date),
      getDateFromstring(props.item.date),
    );

  return (
    <TouchableOpacity
      onPress={() => {
        props.onDateSelected && props.onDateSelected(props.item);
      }}
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
        width: 48,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: !isDateCardSelected ? Colors.GRAY : Colors.TRANS,
        backgroundColor: isDateCardSelected ? Colors.CLR_0376FC : Colors.WHITE,
      }}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: 'bold',
          color: isDateCardSelected ? Colors.WHITE : Colors.CLR_5E678E,
        }}>
        {monthAndDayNumber}
      </Text>
      <Text
        style={{
          fontSize: 12,
          color: isDateCardSelected ? Colors.WHITE : Colors.CLR_5E678E,
        }}>
        {dayName}
      </Text>
    </TouchableOpacity>
  );
};
const TimeSlotCard = props => {
  const {isSelected, item} = props;
  const {slotStatus} = item;
  return (
    <TouchableOpacity
      disabled={!slotStatus}
      onPress={() => {
        props.onTimeSlotSelected && props.onTimeSlotSelected();
      }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
      }}>
      {slotStatus && (
        <Icon
          name={isSelected ? 'radiobox-marked' : 'radiobox-blank'}
          size={20}
          color={Colors.CLR_02A3FC}
        />
      )}
      <Text
        style={{
          marginLeft: 5,
          fontSize: 14,
          color: Colors.CLR_49537D,
          fontStyle: !slotStatus ? 'italic' : 'normal',
        }}>
        {item.displayTime}
      </Text>
      {!slotStatus && (
        <Text
          style={{
            fontSize: 15,
            fontStyle: 'italic',
            color: Colors.CLR_49537D,
            position: 'absolute',
            right: 10,
          }}>
          Slot is full
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default DeliveryDateTimeBlock;
