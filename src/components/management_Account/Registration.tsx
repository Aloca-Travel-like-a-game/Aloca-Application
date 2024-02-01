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
import {Signup_validate} from './SignUp_validate';
import axios from 'axios';
import {useMutation} from '@tanstack/react-query';
interface typeRegiter {
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
}
export default function Registration({navigation}: any) {
  const mutation = useMutation({
    mutationFn: async (data: typeRegiter) => {
      axios
        .post(`${url}/api/register`, data)
        .then(res => {
          if (res.status === 200) {
            const jsonValue = JSON.stringify(res.data.user);
            Alert.alert('Success', 'Register successfully', [
              {text: 'OK', onPress: () => navigation.navigate('Login')},
            ]);
          } else {
            Alert.alert('Invalid information!');
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
  });
  const handleSinup = () => {
    if (data && data.confirmPassword === data.password) {
      console.log('dataaaaa---=====-------', data);
      mutation.mutate(data);
    } else {
      Alert.alert('Error', 'Fillout complete information !');
    }
    Alert.alert('đăng ký tài khoản thành công'), navigation.navigate('Login');
  };
  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        confirmpassword: '',
      }}
      validationSchema={Signup_validate}
      onSubmit={values => {
        setTimeout(() => {
          let data = {
            username: values.username,
            email: values.email,
            password: values.password,
            confirmpassword: values.confirmpassword,
          };
          handleSinup(data);
        }, 200);
      }}>
      {({errors, touched, handleChange, handleSubmit, handleBlur, values}) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 500 : 0}
          style={styles.container}>
          <Image
            source={require('../../Images/Icon.png')}
            style={styles.logoImage}
          />
          <Text style={styles.textAloca}>ALOCA</Text>
          <View style={styles.containerContent}>
            <Text style={styles.lable}>Email</Text>
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              placeholderTextColor={'#000'}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && touched.email ? (
              <Text style={styles.errorText}>* {errors.email}</Text>
            ) : null}
            <Text style={styles.lable}>Tên đăng nhập</Text>
            <TextInput
              placeholder="Tên đăng nhập"
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
              placeholder=" Mật khẩu"
              style={styles.textInput}
              placeholderTextColor={'#000'}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && touched.password ? (
              <Text style={styles.errorText}>* {errors.password}</Text>
            ) : null}
            <Text style={styles.lable}>Xác nhận mật khẩu</Text>
            <TextInput
              placeholder="Xác nhận mật khẩu"
              style={styles.textInput}
              placeholderTextColor={'#000'}
              onChangeText={handleChange('confirmpassword')}
              onBlur={handleBlur('confirmpassword')}
              value={values.confirmpassword}
            />
            {errors.confirmpassword && touched.confirmpassword ? (
              <Text style={styles.errorText}>* {errors.confirmpassword}</Text>
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
    marginTop: 15,
    bottom: 10,
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