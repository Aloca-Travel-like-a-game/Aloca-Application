import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  Alert,
  BackHandler,
} from 'react-native';
import { Formik } from 'formik';
import { Login_validate } from './Login_validate';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {ipAddress} from '../../Helper/ip';
interface Account {
  username: string;
  password: string;
}
export default function Login({ navigation }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Chờ đã', 'Bạn chắc chắn muốn thoát chứ?', [
        {
          text: 'Không',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'Có', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const mutationLogin = useMutation({
    mutationFn: async (data: Account) => {
      try {
        let fcmToken: string | null = await AsyncStorage.getItem("fcm_token");
        console.log("token",fcmToken);
        
        const res = await axios.post(
          `http://${ipAddress}:8080/auth/login`,
          data,
          fcmToken
        );
        if (res.status === 200) {
          const token = res.data;
          const user = JSON.stringify(token);
          await AsyncStorage.multiRemove(['fcm_token', 'AccessToken', 'user']);
          await AsyncStorage.setItem('AccessToken', token.accessToken);
          await AsyncStorage.setItem('user', user);
          Toast.show({
            type: 'success',
            text1: 'Thành công',
            text2: 'Đăng nhập thành công',
          });
          navigation.navigate('Homestack', {screen: 'Trang chủ'});
        }
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          Toast.show({
            type: 'error',
            text1: 'Thất bại',
            text2: 'Sai tên đăng nhập hoặc mật khẩu!!',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Thất bại',
            text2: 'Không thành công!!',
          });
        }
      }
    },
  });
  const handleLogin = (data: Account) => {
    mutationLogin.mutate(data);
  };
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={Login_validate}
      onSubmit={values => {
        setTimeout(() => {
          let account = {
            username: values.username,
            password: values.password,
          };
          handleLogin(account);
        }, 100);
      }}>
      {({ errors, touched, handleChange, handleBlur, handleSubmit, values }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
          style={styles.container}>
          <ScrollView>
            <Image
              source={require('../../Images/Icon.png')}
              style={styles.logoImage}
            />
            <Text style={styles.textAloca}>ALOCA</Text>
            <View style={styles.containerContent}>
              <Text style={styles.label}>TÊN ĐĂNG NHẬP</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
              {errors.username && touched.username ? (
                <Text style={styles.errorText}>* {errors.username}</Text>
              ) : null}
              <Text style={styles.label}>MẬT KHẨU</Text>
              <View style={styles.content}>
                <TextInput
                  secureTextEntry={!showPassword}
                  style={styles.textInput}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                <Ionicons
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={24}
                  color="#aaa"
                  onPress={toggleShowPassword}
                  style={styles.toggleShowPassword}
                />
              </View>
              {errors.password && touched.password ? (
                <Text style={styles.errorText}>* {errors.password}</Text>
              ) : null}
            </View>
            <TouchableOpacity
              style={styles.contentRegister}
              onPress={handleSubmit}>
              <Text style={styles.textLoginBtn}>Đăng nhập</Text>
            </TouchableOpacity>
            <View style={styles.contentLogin}>
              <Text style={styles.text}>Chưa có tài khoản,</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Registration')}>
                <Text style={styles.textLogin}>Đăng ký</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.textforgotPass}>Quên mật khẩu?</Text>
            </TouchableOpacity>
            {/* <View style={styles.optionalLogin}>
              <TouchableOpacity style={styles.loginWithOtherBtn}>
                <Ionicons name="logo-google" size={25} color={'#EB4335'} />
                <Text style={styles.textGoogle}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.loginWithOtherBtn}>
                <Ionicons name="logo-facebook" size={25} color={'#1877F2'} />
                <Text style={styles.textFacebook}>Facebook</Text>
              </TouchableOpacity>
            </View> */}
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textInput: {
    height: 45,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ffffff',
    marginVertical: 7,
    borderRadius: 15,
    color: '#000',
    backgroundColor: '#ffffff',
    elevation: 1,
    alignSelf: 'center',
    marginBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  containerContent: {
    marginHorizontal: 12,
    width: 320,
    alignSelf: 'center',
  },
  logoImage: {
    width: 250,
    height: 250,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 55,
  },
  textLoginBtn: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 23,
  },
  contentRegister: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 300,
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#2AB6AD',
    borderColor: '#2AB6AD',
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  textAloca: {
    color: '#000',
    fontSize: 35,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  label: {
    color: '#3E4958',
    fontWeight: '500',
  },
  text: {
    color: '#000',
  },
  textLogin: {
    color: '#2AB6AD',
    fontWeight: '500',
  },
  textforgotPass: {
    color: '#2AB6AD',
    fontWeight: '500',
    textAlign: 'center',
  },
  contentLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  optionalLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 60,
    gap: 40,
    marginBottom: 90,
  },
  loginWithOtherBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 20,
    marginVertical: 10,
    gap: 10,
    width: 125,
    elevation: 2,
    backgroundColor: '#fff',
  },
  textGoogle: {
    color: '#EB4335',
  },
  textFacebook: {
    color: '#1877F2',
  },
  toggleShowPassword: {
    position: 'absolute',
    right: '5%',
    top: '28%',
  },
  errorText: {
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 12,
  },
  content: {
    position: 'relative',
  },
});
