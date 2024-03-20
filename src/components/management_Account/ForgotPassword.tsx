import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {validateSchema} from './ForgotPassword_Validate';
import Toast from 'react-native-toast-message';
import { ipAddress } from '../../Helper/ip';
interface Account {
  email: string;
}
export default function ForgotPassword({navigation}: any) {
  const mutationForgotpassword = useMutation({
    mutationFn: async (email: Account) => {
      try {
        const res = await axios.post(
          `http://${ipAddress}:8080/auth/forgot-password`,
          email,
        );
        if (res.status === 200) {
          const emailResetPassword = email.email;
          await AsyncStorage.setItem('emailResetPassword', emailResetPassword);
          Toast.show({
            type: 'success',
            text1: 'Thành công',
            text2: 'Mã xác thực đã được gửi đến Email của bạn 👋',
          });
          navigation.navigate('RefreshVerifyCode');
        }
      } catch (error) {
        Toast.show({
          type: 'success',
          text1:'Thất bại',
          text2:'Gửi mã thất bại',
        });
      }
    },
  });
  const handleForgotPassword = (email: Account) => {
    if (email) {
      mutationForgotpassword.mutate(email);
    }
  };
  return (
    <Formik
      validationSchema={validateSchema}
      initialValues={{email: ''}}
      onSubmit={values => {
        let data = {
          email: values.email,
        };
        handleForgotPassword(data);
      }}>
      {({errors, touched, handleChange, handleBlur, values, handleSubmit}) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
          style={styles.container}>
          <ScrollView style={styles.content}>
            <Image
              source={require('../../Images/Icon.png')}
              style={styles.logoImage}
            />
            <Text style={styles.textAloca}>Xác thực mật khẩu</Text>
            <View style={styles.containerContent}>
              <Text style={styles.lable}>NHẬP EMAIL BẠN ĐÃ ĐĂNG KÝ</Text>
              <TextInput
                value={values.email}
                style={styles.textInput}
                placeholderTextColor={'#000'}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              {errors.email && touched.email ? (
                <Text style={styles.errorText}>* {errors.email}</Text>
              ) : null}
            </View>
            <TouchableOpacity
              style={styles.contentRegister}
              onPress={handleSubmit}>
              <Text style={styles.textRegister}>Xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Image
                source={require('../../Images/backBlue.png')}
                style={styles.backIcon}
              />
            </TouchableOpacity>
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
  content: {
    paddingTop: 50,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ffffff',
    padding: 10,
    marginVertical: 7,
    borderRadius: 10,
    color: '#000',
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  containerContent: {
    marginHorizontal: 12,
    width: 320,
    alignSelf: 'center',
    marginTop: 50,
  },
  logoImage: {
    width: 250,
    height: 250,
    borderRadius: 12,
    alignSelf: 'center',
  },
  textRegister: {
    color: '#FFFF',
    fontWeight: '700',
    fontSize: 18,
  },
  contentRegister: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 12,
    width: 320,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#2AB6AD',
    borderColor: '#2AB6AD',
    marginTop: 10,
  },
  textAloca: {
    color: '#000',
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 18,
  },
  lable: {
    color: '#000',
    fontWeight: '500',
    paddingTop: 5,
  },
  text: {
    color: '#000',
  },
  textLogin: {
    color: '#0097A7',
    fontWeight: '400',
    fontSize: 20,
  },
  contentLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  optionalLogin: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 60,
  },
  LoginFacebook: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    padding: 5,
    borderColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    gap: 10,
    width: 150,
    elevation: 2,
    backgroundColor: '#fff',
  },
  logoFacebook: {
    width: 30,
    height: 30,
  },
  logoGoogle: {
    width: 30,
    height: 30,
  },
  registrationGoogle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    padding: 5,
    borderColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    gap: 10,
    width: 150,
    elevation: 2,
    backgroundColor: '#fff',
  },
  textFacebook: {
    color: '#000',
  },
  textGoogle: {
    color: '#000',
  },
  textOption: {
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
  },
  errorText: {
    fontWeight: 'bold',
    color: 'red',
    margin: 0,
    padding: 0,
  },
  backIcon: {
    alignSelf: 'center',
    marginTop: 15,
  },
});
