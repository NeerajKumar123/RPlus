import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {getAddressByLatLong} from '../apihelper/Api.js';
import AppHeader from '../components/AppHeader';
import RPButton from '../components/RPButton';
import RPLoader from '../components/RPLoader';
import { Config } from '../constants/StaticValues'
import AppConfigData from '../constants/AppConfigData'


const SetAddressOnMap = props => {
  const AppData = AppConfigData()
  const latitudeDelta = 0.025;
  const longitudeDelta = 0.025;
  const navigation = useNavigation();
  const searchText = useRef();
  const mapRef = useRef();
  const [region, setRegion] = useState({
    latitude: 28.5793,
    longitude: 77.2585,
    latitudeDelta: 0.025,
    longitudeDelta: 0.025,
  });

  const [listViewDisplayed, setListViewDisplayed] = useState(null);
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const goToInitialLocation = region => {
    let initialRegion = {...region};
    initialRegion['latitudeDelta'] = 0.005;
    initialRegion['longitudeDelta'] = 0.005;
    mapRef.current.animateToRegion(initialRegion, 2000);
  };

  useEffect(() => {
    if(region){
      getCurrentAddress();
    }
  }, [region]);
 
  useEffect(() => {
    region && getCurrentAddress();
  }, []);

  const getCurrentAddress = () => {
    setIsLoading(true)
    getAddressByLatLong(region.latitude, region.longitude, address => {
      setTimeout(() => {
        setIsLoading(false)
      }, 500);
      const fetchedAddress = address && address.results && address.results[0];
      const formatedAddress = fetchedAddress.formatted_address;
      const pindoeObj =
        fetchedAddress.address_components &&
        fetchedAddress.address_components.slice(-1)[0];
      if (pindoeObj && pindoeObj.long_name && formatedAddress) {
        setAddress(formatedAddress);
        global.currentLocationAddresss = formatedAddress;
      } else {
        Alert.alert(AppData.title_alert, 'Error while accessing pincode and Address');
        return;
      }
    });
  };

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <AppHeader
        title="Set Location Manually"
        isLeftIconEnabeld={true}
        onLeftPress={() => {
          navigation.goBack();
        }}
      />
      {isLoading && <RPLoader />}
      <View
        style={{height: 60, zIndex: 1000, marginHorizontal: 20, marginTop: 20}}>
        <GooglePlacesAutocomplete
          currentLocation={true}
          currentLocationLabel={'Current Location'}
          enableHighAccuracyLocation={true}
          ref={searchText}
          placeholder="Search for a location"
          minLength={3} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'}
          listViewDisplayed={listViewDisplayed}
          fetchDetails={true}
          renderDescription={row => row.description}
          enablePoweredByContainer={true}
          listUnderlayColor="lightgrey"
          onPress={(data, details) => {
            console.log('details', details);
            console.log('data', data);
            setListViewDisplayed(null);
            setAddress(data.description);
            console.log('details.description',data.description)
            const newRegion = {
              latitudeDelta,
              longitudeDelta,
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            };
            goToInitialLocation(newRegion)
          }}
          textInputProps={{
            onChangeText: text => {
              setListViewDisplayed('auto');
            },
          }}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          query={{
            key: 'AIzaSyDpdF27ZiuKLmsJXNfLyRbD-7nmlMa4tJw',
            language: 'en', // language of the results
            components: 'country:ind',
          }}
          styles={{
            description: {
              color: 'black',
              fontSize: 12,
            },
            predefinedPlacesDescription: {
              color: 'black',
            },
            listView: {
              position: 'absolute',
              marginTop: 44,
              backgroundColor: 'white',
              borderBottomEndRadius: 15,
              elevation: 2,
            },
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          GooglePlacesSearchQuery={{
            rankby: 'distance',
            types: 'building',
          }}
          filterReverseGeocodingByTypes={[
            'locality',
            'administrative_area_level_3',
          ]}
          debounce={200}
        />
      </View>
      <View
        style={{
          backgroundColor: 'gray',
          marginTop: 0,
          marginHorizontal: 20,
          padding: 10,
          borderRadius:2,
          marginBottom:20
        }}>
        <Text style={{width: '100%', fontWeight: '700', textAlign: 'center'}}>
          {address}
        </Text>
      </View>
      <MapView
      zoomControlEnabled = {true}
      showsUserLocation = {true}
      showsMyLocationButton = {true}
      userLocationAnnotationTitle = {'You are here!'}
        ref={mapRef}
        onMapReady={() => goToInitialLocation(region)}
        style={styles.map}
        initialRegion={region}
        region = {region}
        onRegionChangeComplete={region => {
          setRegion(region);
        }}>
        <Marker coordinate={region} title={address} description={'You are here!'} />
      </MapView>
      <View style={{width: '100%', backgroundColor:'red'}}>
        <RPButton
          width="100%"
          backgroundColor="#1e2235"
          title={'CONFIRM LOCATION'}
          onPress={() => {
            let coords = {"speed":-1,"longitude":region.longitude,"latitude":region.latitude,"accuracy":5,"heading":-1,"altitude":0,"altitudeAccuracy":-1}
            console.log('coords',coords)
            navigation.navigate('Stores',{location:coords});
          }}
        />
      </View>
    </View>
  );
};

export default SetAddressOnMap;

const styles = StyleSheet.create({
  map: {
    flex: 1,
    marginBottom: 30,
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%',
  },
  addressText: {
    color: 'black',
    margin: 3,
  },
  footer: {
    backgroundColor: 'white',
    bottom: 0,
    position: 'absolute',
    width: '100%',
    height: '30%',
  },
  panelFill: {
    position: 'absolute',
    top: 0,
    alignSelf: 'stretch',
    right: 0,
    left: 0,
  },
  panel: {
    position: 'absolute',
    top: 50,
    alignSelf: 'stretch',
    right: 0,
    left: 0,
    flex: 1,
  },
  panelHeader: {
    //add custom header
  },
});
