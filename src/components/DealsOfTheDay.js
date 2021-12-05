import React, {useEffect, useState, useRef} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import DealsOfTheDaycard from './DealsOfTheDaycard';
import * as Colors from '../constants/ColorDefs';

const clock = require('../../assets/clock.png');
const DealsOfTheDay = props => {
  const {details} = props;
  const deals = details.product;
  const {endtime} = details;
  return (
    <View
      style={{
        marginTop: props.marginTop ? props.marginTop : 10,
        alignItems: 'center',
        paddingVertical: 13,
        shadowColor: Colors.GRAY,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
        backgroundColor: Colors.CLR_14273E,
      }}>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'column',
            width: '55%',
          }}>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'left',
              textAlignVertical: 'center',
              color: Colors.WHITE,
              fontWeight: 'bold',
            }}>
            Deals of the day
          </Text>
          <Text
            style={{
              fontSize: 12,
              textAlign: 'left',
              textAlignVertical: 'center',
              color: Colors.WHITE,
              marginTop: 6,
            }}>
            Hurry Up ! Steal your deals now
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            width: '45%',
          }}>
          {/* <TouchableOpacity
            onPress={() => {
              props.onViewAllClicked()
            }}
            style={{
              fontSize: 12,
              textAlign: 'left',
              textAlignVertical: 'center',
              fontWeight: 'bold',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: Colors.WHITE,
              }}>
              View All
            </Text>
          </TouchableOpacity> */}
          <CountDownTimer
            endDate={endtime}
            onDealsEnded={() => {
              props.onDealsEnded();
            }}
          />
        </View>
      </View>
      <FlatList
        horizontal={false}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        style={{width: '100%', marginTop: 10, paddingHorizontal: 20}}
        keyExtractor={(item, index) => 'key_' + index}
        data={deals}
        renderItem={({item, index}) => (
          <DealsOfTheDaycard
            quantity = {0}
            item={item}
            index={index}
            onLoaderStateChanged = {(isLoading) =>{
              props.onLoaderStateChanged(isLoading)
            }}
            onPress={() => {
              props.onProductSelected(item)
            }}
          />
        )}
      />
    </View>
  );
};

const CountDownTimer = props => {
  const {endDate} = props
  var timeinterval = useRef(undefined);
  const [countDown, setCountDown] = useState();
  const getTimeRemaining = () => {
    const endDateFormatedString = endDate && typeof(endDate) == 'string' && `${endDate.replace(' ' , 'T')}`
    var endDateFinal = new Date(endDateFormatedString);
    const total = Date.parse(endDateFinal) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  const initializeClock = () => {
    timeinterval =  updateClock();
    setInterval(() => {
      updateClock()
    }, 1000);
  };
  const updateClock = () => {
    const t = getTimeRemaining();
    let time = `${t.days} : ${('0' + t.hours).slice(-2)} : ${(
      '0' + t.minutes
    ).slice(-2)} : ${('0' + t.seconds).slice(-2)}`;
    setCountDown(time);
    if (t.total <= 0) {
      cleanTimerStuff()
      props.onDealsEnded();  
    }
  };

  const cleanTimerStuff = () => {
    timeinterval && clearInterval(timeinterval);
    timeinterval = undefined;
  };

  useEffect(() => {
    initializeClock();
    return(cleanTimerStuff())
  }, []);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width:130,
      }}>
      <Image
        resizeMode="contain"
        style={{width: 22, height: 21}}
        source={clock}
      />
      <Text
        style={{
          fontSize: 16,
          textAlign: 'left',
          textAlignVertical: 'center',
          color: Colors.WHITE,
          fontWeight:'700',
          marginLeft:5
        }}>
        {countDown}
      </Text>
    </View>
  );
};

export default DealsOfTheDay;
