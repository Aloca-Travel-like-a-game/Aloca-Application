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
import React, { useState } from 'react';
import {TouchableOpacity, ToastAndroid} from 'react-native';
import {Formik} from 'formik';
import axios from 'axios';
import {Signup_validate} from './SignUp_validate';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useMutation } from '@tanstack/react-query';
export default function Registration({navigation}: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  interface Data {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }
  const mutation = useMutation({
    mutationFn: async (data: Data) => {
      axios.post('http://52.63.147.17:8080/auth/register',data)
      .then(res => {
        if (res.status === 200) {
          ToastAndroid.show('Registration successful', ToastAndroid.LONG);
          navigation.navigate('VerifyAccount');
        } else {
          Alert.alert('invalid information');
        }
      })
      .catch(e => {
        console.log('error', e);
        Alert.alert('faild');
      });
    },
  });
  const  handleSignUp = (data: Data)=>{
   if (data && data.confirmPassword === data.password){
    console.log(data);
    mutation.mutate(data);
   }else {
    Alert.alert('Vui lòng kiểm tra lại mật khẩu')
   }
  };
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
      }}
      validationSchema={Signup_validate}
      onSubmit={values => {
        let data = {

          email: values.email,
          username: values.username,
          password: values.password,
          confirmPassword: values.confirmPassword,
        };
        // const newData = JSON.stringify(data)
        handleSignUp(data);
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
            <Text style={styles.lable}>EMAIL</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && touched.email ? (
              <Text style={styles.errorText}>* {errors.email}</Text>
            ) : null}
            <Text style={styles.lable}>TÊN ĐĂNG NHẬP</Text>
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
            <Ionicons
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={24}
                  color="#aaa"
                  onPress={toggleShowPassword}
                  style={styles.toggleShowPassword}
                />
            <Text style={styles.lable}>MẬT KHẨU</Text>
            <TextInput
              style={styles.textInput}
              placeholderTextColor={'red'}
              secureTextEntry={!showPassword}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && touched.password ? (
              <Text style={styles.errorText}>* {errors.password}</Text>
            ) : null}
             <Ionicons
                  name={showConfirmPassword ? 'eye' : 'eye-off'}
                  size={24}
                  color="#aaa"
                  onPress={toggleShowConfirmPassword}
                  style={styles.toggleShowConfirmPassword}
                />
            <Text style={styles.lable}>XÁC NHẬN MẬT KHẨU</Text>
            <TextInput
              style={styles.textInput}
              placeholderTextColor={'#000'}
              secureTextEntry={!showConfirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <Text style={styles.errorText}>* {errors.confirmPassword}</Text>
            ) : null}
          </View>
          <TouchableOpacity
            style={styles.contentRegister}
            onPress={handleSubmit}>
            <Text style={styles.textRegister}>Đăng ký</Text>
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
            <Text style={styles.text}>Đã có tài khoản,</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.textLogin}>đăng nhập</Text>
            </TouchableOpacity>
          </View>
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
    width: 320,
    alignSelf: 'center',
  },
  logoImage: {
    width: '40%',
    height: '20%',
    borderRadius: 12,
    alignSelf: 'center',
  },
  textRegister: {
    color: '#ffff',
    fontWeight: '700',
    fontSize: 23,
  },
  contentRegister: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#2AB6AD',
    borderColor: '#2AB6AD',
    marginTop: 20,
    bottom: 10,
    height: 60,
    width: 300,
    alignSelf: 'center',
  },
  textAloca: {
    color: '#000',
    fontSize: 35,
    fontWeight: '500',
    textAlign: 'center',
  },
  lable: {
    color: '#3E4958',
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
  contentLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginBottom: 20,
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
  toggleShowPassword: {
    position: 'absolute',
    top:'63%',
    right:'5%',
    zIndex: 1,

  },
  toggleShowConfirmPassword:{
    position: 'absolute',
    top:'87%',
    right:'5%',
    zIndex: 1,
  }
});
