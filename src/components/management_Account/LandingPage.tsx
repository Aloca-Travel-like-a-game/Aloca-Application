import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
export default function LandingPage() {
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
  useEffect(() => {
    const checkWelcomeScreen = async () => {
      try {
        const hasShownWelcomeScreen = await AsyncStorage.getItem(
          'hasShownWelcomeScreen',
        );
        if (!hasShownWelcomeScreen) {
          // Đánh dấu rằng đã hiển thị màn hình chào mừng
          await AsyncStorage.setItem('hasShownWelcomeScreen', 'true');
        } else {
          // Chuyển đến màn hình chính
          try {
            const jsonValue = await AsyncStorage.getItem('user');
            const value = jsonValue != null ? JSON.parse(jsonValue) : null;
            if (value !== null) {
              navigation.navigate('Homestack');
            } else {
              navigation.navigate('Login');
            }
          } catch (error) {
            // console.log('lỗi', error);
          }
        }
      } catch (error) {
        console.error('Lỗi khi kiểm tra màn hình chào mừng:', error);
      }
    };

    checkWelcomeScreen();
  }, [navigation]);

  const handleGetStart = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      const value = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (value !== null) {
        navigation.navigate('Homestack');
      } else {
        navigation.navigate('Login');
      }
    } catch (error) {
      // console.log('lỗi', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../Images/BackgroundApp.png')}
      style={styles.container}>
      <View>
        <Text style={styles.textWellcome}>Chào mừng bạn {'\n'} đến với </Text>
        <Text style={styles.textAloca}>ALOCA</Text>
        <TouchableOpacity style={styles.ButtomNext} onPress={handleGetStart}>
          <Text style={styles.textStart}>Bắt đầu thôi</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2AB6AD',
    alignItems: 'center',
  },
  textWellcome: {
    fontSize: 45,
    fontWeight: '500',
    textAlign: 'center',
    color: '#fff',
    marginTop: '30%',
  },
  textAloca: {
    fontSize: 45,
    fontWeight: '500',
    textAlign: 'center',
    color: '#fff',
    marginTop: '80%',
  },
  ButtomNext: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: 250,
    marginTop: '20%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 30,
  },
  textStart: {
    fontSize: 20,
    color: '#2AB6AD',
    padding: 10,
    fontWeight: '600',
  },
  iconNext: {
    width: 16,
    height: 16,
  },
});
