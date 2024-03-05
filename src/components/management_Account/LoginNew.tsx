import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Formik} from 'formik';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useMutation } from '@tanstack/react-query';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
interface NewAccount {
  password: string;
  // newPassword: string;
  confirmPassword: string;
}
export default function LoginNew({navigation}: any) {
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

        const res = await axios.post(`http://52.63.147.17:8080/auth/reset-password/`,
            {password: dataPass.password,
            confirmPassword: dataPass.confirmPassword,
            email},
        );
        if (res.status === 200) {
          const dataNew = res.data.data;
          console.log('dataNew--', dataNew);
          ToastAndroid.showWithGravity(
            'Cập nhật mật khẩu thành công',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
          navigation.navigate('Login');
        }
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          ToastAndroid.showWithGravity(
            'Vui lòng nhập thông tin chính xác',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        } else {
          ToastAndroid.showWithGravity(
            'xác thực không thành công',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        }
        // console.error('Verification failed:', error);
      }
    },
  });
  const handleNewLogin = (data: NewAccount) => {
    try {
      if (data && data.confirmPassword === data.password) {
        mutationNewLogin.mutate(data);
        console.log('data=>', data);
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
      onSubmit={values => {
        setTimeout(() => {
          let account = {
            password: values.password,
            confirmPassword: values.confirmPassword,
          };
          handleNewLogin(account);
        }, 100);
      }}>
      {({errors, touched, handleChange, handleBlur, handleSubmit, values}) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 500 : 0}
          style={styles.container}>
          <Image
            source={require('../../Images/Icon.png')}
            style={styles.logoImage}
          />
          <Text style={styles.textAloca}>ALOCA</Text>
          <View style={styles.containerContent}>
            <Text style={styles.lable}>Nhập mật khẩu mới</Text>
            <TextInput
              style={styles.textInput}
              secureTextEntry={!showPassword}
              placeholder={
                errors.password && touched.password
                  ? 'Cần điền tên đăng nhập'
                  : ''
              }
              placeholderTextColor={'red'}
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
            <Text style={styles.lable}>Xác nhận mật khẩu mới</Text>
            <TextInput
              style={styles.textInput}
              secureTextEntry={!confirmShow}
              placeholder={
                errors.confirmPassword && touched.confirmPassword
                  ? 'Cần điền tên đăng nhập'
                  : ''
              }
              placeholderTextColor={'red'}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
            />
            <Ionicons
              name={confirmShow ? 'eye' : 'eye-off'}
              size={24}
              color="#aaa"
              onPress={confirmShowPassword}
              style={styles.ConfirmShowPassword}
            />
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
  },
  logoImage: {
    width: '60%',
    height: '26%',
    borderRadius: 12,
    marginLeft: 80,
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
    borderRadius: 10,
    backgroundColor: '#0097A7',
    borderColor: '#0097A7',
    marginTop: 10,
  },
  textAloca: {
    color: '#000',
    fontSize: 35,
    fontWeight: '500',
    textAlign: 'center',
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
  ConfirmShowPassword: {
    position: 'absolute',
    top: '75%',
    left: '90%',
  },
});
