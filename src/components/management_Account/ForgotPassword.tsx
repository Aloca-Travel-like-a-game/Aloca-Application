import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import {validateSchema} from './ForgotPassword_vadidate';
export default function ForgotPassword({navigation}: any) {
  const handleForgotPassword = () => {
    navigation.navigate('VerifyCode');
  };
  return (
    <Formik
      validationSchema={validateSchema}
      initialValues={{email: ''}}
      onSubmit={values => {
        setTimeout(() => {
          let account = {
            email: values.email,
          };
          handleForgotPassword(account);
        }, 100);
      }}>
      {({errors, touched, handleChange, handleBlur, values, handleSubmit}) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 100 : 0}
          style={styles.container}>
          <Image
            source={require('../../Images/Icon.png')}
            style={styles.logoImage}
          />
          <Text style={styles.textAloca}>Xác thực mật khẩu</Text>
          <View style={styles.containerContent}>
            <Text style={styles.lable}>Nhập email bạn đã đăng ký</Text>
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
    marginHorizontal: 30,
    marginTop:60,
  },
  logoImage: {
    width: '60%',
    height: '30%',
    borderRadius: 12,
    marginLeft: 80,
  },
  textRegister: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 18,
  },
  contentRegister: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 30,
    borderRadius: 10,
    backgroundColor: '#0097A7',
    borderColor: '#0097A7',
    marginTop: 10,
  },
  textAloca: {
    color: '#000',
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
    marginTop:20,
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
    marginLeft: 170,
    marginTop: 15,
  },
});
