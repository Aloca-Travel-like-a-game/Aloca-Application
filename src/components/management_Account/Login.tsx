import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import {Login_validate} from './Login_validate';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export default function Login({navigation}: any) {
  interface Account {
    username: string;
    password: string;
  }
  const mutationLogin = useMutation({
    mutationFn: async (data: Account) => {
      axios
        .post(
          `  https://6ac3-113-176-99-140.ngrok-free.app/auth/login`,data)
        .then( res => {
          if (res.status === 200) {
            console.log(res.data);
            const token = res.data.token;
            // const userid = res.data.user.id;
            const user = JSON.stringify({token});
            // Alert.alert('Success', 'Login successfully')
              // {text: 'OK', onPress: () => navigation.navigate('Root')},
           Alert.alert('Login successfully')
          } else {
            Alert.alert('Email or password is invalid');
          }
        })
        .catch(e => {
          console.log(e);
        });
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
      }}
      >
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
            <Text style={styles.lable}>Tên đăng nhập</Text>
            <TextInput
              style={styles.textInput}
              placeholderTextColor={'#000'}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {errors.username && touched.username ? (
              <Text style={styles.errorText}>* {errors.username}</Text>
            ) : null}
            <Text style={styles.lable}>Mật khẩu</Text>
            <TextInput
              style={styles.textInput}
              placeholderTextColor={'#000'}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && touched.password ? (
              <Text style={styles.errorText}>* {errors.password}</Text>
            ) : null}
          </View>
          <TouchableOpacity
            style={styles.contentRegister}
            onPress={handleSubmit}>
            <Text style={styles.textRegister}>Đăng Nhập</Text>
          </TouchableOpacity>
          <Text style={styles.textOption}>Hoặc</Text>
          <View style={styles.optionalLogin}>
            <TouchableOpacity style={styles.LoginFacebook}>
              <Image
                source={require('../../Images/logoface.png')}
                style={styles.logoFacebook}
              />
              <Text style={styles.textFacebook}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registrationGoogle}>
              <Image
                source={require('../../Images/logogoogle.png')}
                style={styles.logoGoogle}
              />
              <Text style={styles.textGoogle}>Google </Text>
            </TouchableOpacity>
          </View>
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
    color: '#000',
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
  },
  textforgotPass: {
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
  errorText: {
    fontWeight: 'bold',
    color: 'red',
    margin: 0,
    padding: 0,
  },
});
