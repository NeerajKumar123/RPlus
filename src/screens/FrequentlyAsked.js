import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import StoreCard from '../components/StoreCard';
import NoData from '../components/NoData';
import {faqList} from '../apihelper/Api.js';
import RPLoader from '../components/RPLoader';
import AppHeader from '../components/AppHeader';
import * as Colors from '../constants/ColorDefs';
import * as Storage from '../helpers/RPStorage';
import {isEmpty} from '../helpers/BaseUtility';
const home_bg = require('../../assets/home_bg.png');
const detector = require('../../assets/detector.png');
const empty_orders_image = require('../../assets/empty_orders_image.png');
import { Config } from '../constants/StaticValues'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RenderHtml from 'react-native-render-html';

const FrequentlyAsked = props => {
  const navigation = useNavigation();
  const {isFromWallet} = props?.route?.params;

  const [questions, setQuestions] = useState();
  const [expandedQuestion, setExpandedQuestion] = useState()
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    const {id} = global.storeInfo
    const {customer_id} = global.userInfo
    const params = {store_id:id, customer_id:customer_id}
    faqList(params, (faqRes) =>{
      console.log('faqRes',faqRes)
      setIsLoading(false)
        if(faqRes?.payload_faqList){
          setQuestions(isFromWallet ?  faqRes?.payload_faqList?.wallet :faqRes?.payload_faqList?.refer )
        }
    })
  }, []);
  
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        width: '100%',
        backgroundColor: Colors.CLR_E7ECF2,
      }}>
      <AppHeader
        isLeftIconEnabeld={true}
        title="Frequently Asked Questions"
        onLeftPress={() => {
          navigation.goBack();
        }}
      />
      {isLoading && <RPLoader />}
      {questions && (
        <FlatList
          style={{
            width: '100%',
            paddingHorizontal: 17,
            marginBottom: 30,
          }}
          horizontal={false}
          keyExtractor={(item, index) => 'key_' + index}
          data={questions}
          renderItem={({item}) => 
          <QueCard 
          item={item} 
          expandedQuestion = {expandedQuestion}
          onExpandCollapseClicked = {() =>{
            setExpandedQuestion(item)
          }}
          />}
        />
      )}
    </View>
  );
};

const QueCard = props => {
  const {question, answer, position} = props.item
  const {expandedQuestion} = props
  const {onExpandCollapseClicked} = props
  const isExpanded = expandedQuestion?.position == position
   return (
    <View
      style={{
        width: '100%',
        backgroundColor: Colors.WHITE,
        marginTop: 10,
        flexDirection: 'column',
        justifyContent:'center',
        paddingHorizontal:15,
        paddingVertical:15,
        borderRadius:4,
      }}>
      <TouchableOpacity
        style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}
        onPress={() => {
          onExpandCollapseClicked()
        }}>
        <RenderHtml
        contentWidth={300}
        source={{html:question}}
      />
        <Icon
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          type="MaterialCommunityIcons"
          style={{
            color: Colors.CLR_355ADB,
            fontSize: 30,
          }}
        />
      </TouchableOpacity>
      {isExpanded && (
        <RenderHtml
        contentWidth={300}
        source={{html:answer}}
      />
      )}
    </View>
  );
};

export default FrequentlyAsked;
