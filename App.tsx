import React, {useEffect} from 'react';
import Navigation from './src/navigation/Navigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {PermissionsAndroid} from 'react-native';
// import Geolocation from '@react-native-community/geolocation';

const queryClient = new QueryClient();
export default function App() {
  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestLocationPermission();
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
      title: 'Cho phép truy cập máy ảnh',
      message:
        'Cool Photo App needs access to your camera ' +
        'so you can take awesome pictures.',
      buttonNeutral: 'Để sau',
      buttonNegative: 'Hủy',
      buttonPositive: 'Cho phép',
    });
  },[]);
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
}
