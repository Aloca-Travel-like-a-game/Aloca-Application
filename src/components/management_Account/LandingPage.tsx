import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import React from 'react';

export default function LandingPage({navigation}: any) {
  return (
    <ImageBackground
      source={require('../../Images/BackgroundApp.png')}
      style={styles.container}>
      <View>
        <Text style={styles.textWellcome}>Chào mừng bạn {'\n'} đến với </Text>
        <Text style={styles.textAloca}>Aloca</Text>
        <TouchableOpacity
          style={styles.ButtomNext}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.textStart}>Bắt đầu thôi</Text>
          <Image
            source={require('../../Images/angle-right.png')}
            style={styles.iconNext}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00BCD4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWellcome: {
    fontSize: 35,
    fontWeight: '500',
    textAlign: 'center',
    color: '#000',
  },
  textAloca: {
    fontSize: 35,
    fontWeight: '500',
    textAlign: 'center',
    color: '#000',
    paddingTop: 230,
  },
  ButtomNext: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: 250,
    marginTop: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  textStart: {
    fontSize: 20,
    color: '#00BCD4',
    padding: 10,
  },
  iconNext: {
    width: 16,
    height: 16,
  },
});
