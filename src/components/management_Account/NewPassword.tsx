import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Formik} from 'formik';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NewPassword_validate } from './NewPassword_validate';
import Toast from 'react-native-toast-message';
interface NewAccount {
  password: string;
  confirmPassword: string;
}
export default function NewPassword({navigation}: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const confirmShowPassword = () => {
    setConfirmShow(!confirmShow);
  };
  const mutationNewLogin = useMutation({
    mutationFn: async (data: NewAccount) => {
      try {
        let email = await AsyncStorage.getItem('emailResetPassword');
        console.log('email', email);
        const dataPass = data;

        const res = await axios.post(
          'http://52.63.147.17:8080/auth/reset-password/',
          {
            password: dataPass.password,
            confirmPassword: dataPass.confirmPassword,
            email,
          },
        );
        if (res.status === 200) {
          const dataNew = res.data.data;
          console.log('dataNew--', dataNew);
         Toast.show({
          type:'success',
          text1:'Thành công',
          text2:'Cập nhật mật khẩu thành công',
         });
          navigation.navigate('Login');
        }
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          Toast.show({
            type:'error',
            text1:'Thất bại',
            text2:'Cần nhập chính xác thông tin',
           });
        } else {
          Toast.show({
            type:'error',
            text1:'Thất bại',
            text2:'Cập nhật mật khẩu không thành công',
           });
        }
      }
    },
  });
  const handleNewPassword = (data: NewAccount) => {
    try {
      if (data && data.confirmPassword === data.password) {
        mutationNewLogin.mutate(data);
        console.log('data=>', data);
      } else {
        Toast.show({
          type:'error',
          text1:'Thất bại',
          text2:'Mật khẩu xác thực không hợp lệ',
         });
      }
    } catch (error) {
      ToastAndroid.showWithGravity(
        'không thành công',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
  };
  return (
    <Formik
      initialValues={{
        password: '',
        confirmPassword: '',
      }}
      validationSchema={NewPassword_validate}
      onSubmit={values => {
        setTimeout(() => {
          let account = {
            password: values.password,
            confirmPassword: values.confirmPassword,
          };
          handleNewPassword(account);
        }, 100);
      }}>
      {({errors, touched, handleChange, handleBlur, handleSubmit, values}) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
          style={styles.container}>
            <ScrollView style={styles.content}>
          <Image
            source={require('../../Images/Icon.png')}
            style={styles.logoImage}
          />
          <Text style={styles.textAloca}>ALOCA</Text>
          <View style={styles.containerContent}>
            <Text style={styles.lable}>NHẬP MẬT KHẨU MỚI</Text>
            <View>
              <TextInput
                style={styles.textInput}
                secureTextEntry={!showPassword}
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
             {errors.password && touched.password ? (
              <Text style={styles.errorText}>* {errors.password}</Text>
            ) : null}
            </View>
            <Text style={styles.lable}>XÁC NHẬN MẬT KHẨU MỚI</Text>
            <View>
              <TextInput
                style={styles.textInput}
                secureTextEntry={!confirmShow}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
              />
              <Ionicons
                name={confirmShow ? 'eye' : 'eye-off'}
                size={24}
                color="#aaa"
                onPress={confirmShowPassword}
                style={styles.toggleShowPassword}
              />
            </View>
            {errors.confirmPassword && touched.confirmPassword ? (
              <Text style={styles.errorText}>* {errors.confirmPassword}</Text>
            ) : null}
          </View>
          <TouchableOpacity
            style={styles.contentRegister}
            onPress={handleSubmit}>
            <Text style={styles.textRegister}>Đổi mật khẩu</Text>
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
            <Text style={styles.textLogin}>Đăng nhập</Text>
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
  content:{
    paddingTop:50,
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
    marginTop:30,
  },
  logoImage: {
    width: 250,
    height: 250,
    borderRadius: 12,
    alignSelf:'center',
  },
  textRegister: {
    color: '#ffff',
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
    marginTop:10,
    borderRadius: 10,
    backgroundColor: '#2AB6AD',
    borderColor: '#2AB6AD',
  },
  textAloca: {
    color: '#000',
    fontSize: 35,
    fontWeight: '600',
    textAlign: 'center',
    marginTop:15,
  },
  lable: {
    color: '#000',
    fontWeight: '500',
    paddingTop: 16,
  },
  text: {
    color: '#000',
  },
  textLogin: {
    color: '#2AB6AD',
    fontWeight: '500',
    textAlign: 'center',
  },
  contentLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop:15,
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
  toggleShowPassword: {
    position: 'absolute',
    right: '5%',
    top: '27%',
  },
  errorText:{
    fontWeight: 'bold',
    color: 'red',
    margin: 0,
    padding: 0,
  },
});
