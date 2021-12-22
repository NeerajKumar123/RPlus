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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const {width} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import * as Colors from '../constants/ColorDefs';
import CheckoutSteps from '../components/CheckoutSteps';
const green_placeholder = require('../../assets/green_placeholder.png');
import AppConfigData from '../constants/AppConfigData'

const AppHeader = props => {
  const AppData = AppConfigData()
  const {
    title,
    subtitle,
    rightIcons,
    isHome,
    isExtendedHeader,
    isLeftIconEnabeld,
    isCheckoutStep,
    progressIndex,
    imageUrl = '',
  } = props;
  const headerGradidentColors = AppData.AppHeaderGradidentColors
  // const headerGradidentColors = [AppData.app_theme, AppData.app_theme]
  let truncatedtitle = title;
  if (title && title.length > 30) {
    truncatedtitle = `${title.substring(0, 25)} ...`;
  }
  let headerHeight = 90;
  if (isExtendedHeader) {
    headerHeight = headerHeight + 50;
  }
  if (subtitle) {
    headerHeight = headerHeight + 20;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <LinearGradient
        colors={headerGradidentColors}
        style={{
          width: '100%',
          height: headerHeight,
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: Platform.OS == 'ios' ? 45 : 10,
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: 16,
          }}>
          {!isHome && isLeftIconEnabeld && (
            <TouchableOpacity
              onPress={() => {
                props.onLeftPress && props.onLeftPress();
              }}>
              <Icon
                name="chevron-left"
                type="MaterialCommunityIcons"
                style={{
                  color: Colors.WHITE,
                  fontSize: 35,
                }}
              />
            </TouchableOpacity>
          )}
          {isHome && imageUrl.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                props.storeIconClicked && props.storeIconClicked();
              }}>
              <Image
                resizeMode="contain"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  borderWidth: 1,
                  borderColor: Colors.WHITE,
                }}
                source={{uri: imageUrl}}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              props.storeIconClicked && props.storeIconClicked();
            }}
            style={{
              flexDirection: 'column',
              marginLeft: 18,
              alignItems: 'flex-start',
            }}>
            <View style={{flexDirection: 'row'}}>
              {truncatedtitle && (
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500',
                    color: Colors.WHITE,
                    textAlign: 'left',
                    fontWeight: 'bold',
                  }}>
                  {truncatedtitle}
                </Text>
              )}
              {props.storeIconClicked && (
                <Icon
                  name="chevron-down"
                  type="MaterialCommunityIcons"
                  style={{
                    color: Colors.WHITE,
                    fontSize: 25,
                  }}
                />
              )}
            </View>
            {subtitle?.length > 0 && (
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: Colors.WHITE,
                  textAlign: 'left',
                  marginTop: 5,
                }}>
                {subtitle}
              </Text>
            )}
          </TouchableOpacity>
          <View
            style={{
              height: '100%',
              position: 'absolute',
              right: 10,
              flexDirection: 'row-reverse',
            }}>
            {rightIcons &&
              rightIcons.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={`${index.toString()}`}
                    style={{
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: index == rightIcons.length - 1 ? 16 : 0,
                    }}
                    onPress={() => {
                      item.onPress();
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{width: 24, height: 24}}
                      source={item.iconSource}
                    />
                    {item.badgeCount > 0 && (
                      <View
                        style={{
                          position: 'absolute',
                          top: -3,
                          right: -3,
                          backgroundColor: Colors.CLR_E86339,
                          padding: 2,
                          height: 19,
                          width: 19,
                          borderRadius: 9.5,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: Colors.WHITE,
                            fontSize: 12,
                            textAlign: 'center',
                            fontWeight: '700',
                          }}>
                          {`${item.badgeCount}`}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
        {isCheckoutStep && <CheckoutSteps progressIndex={progressIndex} />}
      </LinearGradient>
    </>
  );
};

export default AppHeader;
