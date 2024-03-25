import React, { useEffect } from 'react';
import Navigation from './src/navigation/Navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import { StyleSheet } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestPermission } from './src/Helper/handleNotification';
const queryClient = new QueryClient();
// import Geolocation from '@react-native-community/geolocation';
const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={styles.sucessnotice}
      contentContainerStyle={styles.contentsucess}
      text1Style={styles.sucessText}
      text2Style={styles.sucessText2}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={styles.failText}
      text2Style={styles.failText2}
      style={styles.failNotice}
    />
  ),
  };

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
          Geolocation.getCurrentPosition(
            async (info: any) => {
              const getlatitude = info.coords.latitude;
              const getlongitude = info.coords.longitude;
              const response = await fetch(
                `https://revgeocode.search.hereapi.com/v1/revgeocode?apikey=TYWNfgg1aUErbBEMMhjeeiX4uDup2tkboazOS0PY4BQ&at=${getlatitude},${getlongitude}&lang=vi`,
              );
              const data = await response.json();
              AsyncStorage.setItem(
                'userLocation',
                data.items[0].address.county,
              );
            },
            () => {
              Alert.alert(
                'Thông báo',
                'Vui lòng bật định vị để sử dụng ứng dụng.',
                [
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
                ],
              );
            },
            undefined,
          );
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
  }, []);
  useEffect(() => {
    requestPermission();
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}
const styles = StyleSheet.create({
  sucessnotice:{
    borderLeftColor: '#2AB6AD',
  },
  contentsucess:{
    paddingHorizontal: 15,
  },
  sucessText:{
    fontSize: 20,
    fontWeight: '600',
  },
  sucessText2:{
    fontSize:13,
  },
  failText:{
    fontSize: 20,
  },
  failText2:{
    fontSize:13,
  },
  failNotice:{
    borderLeftColor: 'red',
  },
});
