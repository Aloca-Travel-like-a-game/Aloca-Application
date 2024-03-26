/* eslint-disable @typescript-eslint/no-shadow */
import Geolocation from '@react-native-community/geolocation';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {BackHandler, StyleSheet, View} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MapScreen = () => {
  const navigation = useNavigation<any>();

  const [latitude, setLatitude] = useState<any>();
  const [longitude, setLongitude] = useState<any>();
  const route = useRoute();
  const [directions, setDirections] = useState<any>(null);
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

  const getDirections = async () => {
    const waypoints = locationChalanges
      .map((locationGroup: any) =>
        locationGroup
          .map((location: any) => `${location.latitude},${location.longitude}`)
          .join('|'),
      )
      .join('|');

    // Tạo yêu cầu cho Google Directions API
    const directionsRequest = {
      origin: `${latitude},${longitude}`,
      waypoints,
      destination: `${locationChalanges[0][0].latitude},${locationChalanges[0][0].longitude}`,
      key: 'AIzaSyBbWcBrNYVn7rA5o7LEYDZxYGDDKfqhGcg',
    };

    // Gửi yêu cầu đến Google Directions API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?${new URLSearchParams(
        directionsRequest,
      )}`,
    );
    const data = await response.json();

    // Xử lý kết quả và lưu tuyến đường
    if (
      data.routes &&
      data.routes.length > 0 &&
      data.routes[0].legs &&
      data.routes[0].legs.length > 0
    ) {
      const route = data.routes[0].legs.reduce(
        (acc: any, leg: any) => [
          ...acc,
          ...leg.steps.reduce(
            (stepsAcc: any, step: any) => [...stepsAcc, ...step.path],
            [],
          ),
        ],
        [],
      );
      const polylineCoordinates = route.map((step: any) => ({
        latitude: step.lat,
        longitude: step.lng,
      }));
      setDirections(polylineCoordinates);
    }
  };

  useEffect(() => {
    if (latitude && longitude && locationChalanges) {
      getDirections();
    }
  }, [latitude, longitude, locationChalanges]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude !== undefined ? latitude : 16.0583,
          longitude: longitude !== undefined ? longitude : 105.7772,
          latitudeDelta: 7.5,
          longitudeDelta: 7.5,
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
        {directions && (
          <Polyline
            coordinates={directions}
            strokeWidth={4}
            strokeColor="blue"
          />
        )}
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
});
