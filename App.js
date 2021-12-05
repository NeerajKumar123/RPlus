/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import {LogBox} from 'react-native';
import MyStack from './src/navstack/MyStack';

LogBox.ignoreLogs([
  'Animated: `useNativeDriver`',
  'VirtualizedLists should never be nested inside',
  'componentWillUpdate has been renamed',
  'componentWillReceiveProps has been renamed',
  'DatePickerIOS has been merged with DatePickerAndroid',
  'Require cycle',
  'Each child in a list should have a unique "key" prop',
  'source.uri should not be an empty string'
])
const App = () => {
  return (
    <>
      <MyStack/>
    </>
  );
};


export default App;
