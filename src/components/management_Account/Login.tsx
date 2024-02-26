import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import {TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import {Login_validate} from './Login_validate';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
interface Login{
  password: string;
}
export default function Login({navigation}: any) {
  const [password, setPassword] = useState('');

  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  interface Account {
    username: string;
    password: string;
  }
  const mutationLogin = useMutation({
    mutationFn: async (data: Account) => {
      axios
        .post('http://52.63.147.17:8080/auth/login', data)
        .then(res => {
          if (res.status === 200) {
            console.log(res.data);
            const token = res.data.token;
            // const userid = res.data.user.id;
            const user = JSON.stringify({token});
            // Alert.alert('Success', 'Login successfully')
            // {text: 'OK', onPress: () => navigation.navigate('Root')},
            Alert.alert('Login successfully');
            navigation.navigate('Homestack');
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
      }}>
      {({errors, touched, handleChange, handleBlur, handleSubmit, values}) => (
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'android' : 0}
        style={styles.container}>
        <ScrollView>
          <Image
            source={require('../../Images/Icon.png')}
            style={styles.logoImage}
          />
          <Text style={styles.textAloca}>ALOCA</Text>
          <View style={styles.containerContent}>
            <Text style={styles.lable}>TÊN ĐĂNG NHẬP</Text>
            <TextInput style={styles.textInput} 
            placeholderTextColor={'#000'} 
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
            />
             {errors.username && touched.username ? (
              <Text style={styles.errorText}>* {errors.username}</Text>
            ) : null}
            <View>
              <Text style={styles.lable}>MẬT KHẨU</Text>
              <TextInput
                secureTextEntry={!showPassword}
                style={styles.textInput}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
                {errors.password && touched.password ? (
              <Text style={styles.errorText}>* {errors.password}</Text>
            ) : null}
              <Ionicons
                name={showPassword ? 'eye' : 'eye-off'}
                size={24}
                color="#aaa"
                onPress={toggleShowPassword}
                style={styles.toggleShowPassword}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.contentRegister}
            onPressIn={handleSubmit}>
            <Text style={styles.textLoginBtn}>Đăng nhập</Text>
          </TouchableOpacity>
          <View style={styles.contentLogin}>
            <Text style={styles.text}>Chưa có tài khoản,</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
              <Text style={styles.textLogin}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.textforgotPass}>Quên mật khẩu?</Text>
          </TouchableOpacity>
          <View style={styles.optionalLogin}>
            <TouchableOpacity style={styles.loginWithOtherBtn}>
              <Ionicons name="logo-google" size={25} color={'#EB4335'} />
              <Text style={styles.textGoogle}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginWithOtherBtn}>
              <Ionicons name="logo-facebook" size={25} color={'#1877F2'} />
              <Text style={styles.textFacebook}>Facebook</Text>
            </TouchableOpacity>
          </View>
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
    fontSize: 39,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  lable: {
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
    // justifyContent: 'space-around',
    justifyContent: 'center',
    height: 60,
    gap: 40,
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
    top: '43%',
  },
  errorText: {
    fontWeight: 'bold',
    color: 'red',
    margin: 0,
    padding: 0,
  },
});