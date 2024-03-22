import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {BackHandler, StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export const MapScreen = () => {
  const navigation = useNavigation<any>();
  useEffect(() => {
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
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021,
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
    bottom: 50,
  },
});
