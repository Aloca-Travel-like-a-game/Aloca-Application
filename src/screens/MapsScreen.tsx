import Geolocation from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {BackHandler, StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';

export const MapScreen = () => {
  const navigation = useNavigation<any>();

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  useEffect(() => {
    Geolocation.getCurrentPosition(
      async (info: any) => {
        const getlatitude = info.coords.latitude;
        const getlongitude = info.coords.longitude;
        setLatitude(getlatitude);
        setLongitude(getlongitude);
        const response = await fetch(
          `https://revgeocode.search.hereapi.com/v1/revgeocode?apikey=TYWNfgg1aUErbBEMMhjeeiX4uDup2tkboazOS0PY4BQ&at=${getlatitude},${getlongitude}&lang=vi`,
        );
        const data = await response.json();
        console.log(data);
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
  }, [navigation]);

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
        followsUserLocation
      />
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
