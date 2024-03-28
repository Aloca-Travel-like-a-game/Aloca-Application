/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
import Geolocation from '@react-native-community/geolocation';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, Linking, Platform, Text, TouchableOpacity} from 'react-native';
import {BackHandler, StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MapScreen = () => {
  const navigation = useNavigation<any>();

  const [latitude, setLatitude] = useState<any>();
  const [longitude, setLongitude] = useState<any>();
  const route = useRoute();
  const [token, setToken] = useState<string>();
  const {locationChalanges}: any = route.params;
  useEffect(() => {
    AsyncStorage.getItem('AccessToken').then((tokenSave: any) =>
      setToken(tokenSave),
    );
  }, [token]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      async (info: any) => {
        const getlatitude = info.coords.latitude;
        const getlongitude = info.coords.longitude;
        setLatitude(getlatitude);
        setLongitude(getlongitude);
        // setLocationChalanges(route.params);
      },
      () => {
        Alert.alert('Thông báo', 'Vui lòng bật định vị để sử dụng ứng dụng.', [
          {
            text: 'OK',
            onPress: () => {
              if (Platform.OS === 'android') {
                Linking.openSettings();
              } else {
                Linking.openURL('app-settings:');
              }
            },
          },
        ]);
      },
      undefined,
    );
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      },
    );
    return () => backHandler.remove();
  }, [route, locationChalanges, navigation, token]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          ...styles.btn,
          flexDirection: 'row',
          justifyContent: 'center',
          top: 12,
          gap: 5,
          width: '50%',
          alignSelf: 'center',
          zIndex: 3,
        }}
        onPress={() => navigation.goBack()}>
        <Text style={{fontWeight: '500', fontSize: 16, color: '#fff'}}>
          Quay lại kế hoạch
        </Text>
      </TouchableOpacity>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude !== undefined ? latitude : 16.0583,
          longitude: longitude !== undefined ? longitude : 105.7772,
          latitudeDelta: 8,
          longitudeDelta: 8,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation>
        {locationChalanges !== null &&
          locationChalanges.map((_markers: any, index: any) => (
            <React.Fragment key={index}>
              {locationChalanges !== null &&
                locationChalanges.map((marker: any, index: any) => (
                  <React.Fragment key={index}>
                    {marker.map((marker: any, markerIndex: any) => (
                      <Marker
                        key={markerIndex}
                        coordinate={{
                          latitude: marker.latitude,
                          longitude: marker.longitude,
                        }}
                        title={marker.challengeSummary}
                      />
                    ))}
                  </React.Fragment>
                ))}
            </React.Fragment>
          ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  btn: {
    backgroundColor: '#2AB6AD',
    padding: 10,
    borderRadius: 10,
  },
});
