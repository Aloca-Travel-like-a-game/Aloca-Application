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

export default function Login({navigation}: any) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'android' : 0}
      style={styles.container}>
      <Image
        source={require('../../Images/Icon.png')}
        style={styles.logoImage}
      />
      <Text style={styles.textAloca}>ALOCA</Text>
      <View style={styles.containerContent}>
        <Text style={styles.lable}>Tên đăng nhập</Text>
        <TextInput
          placeholder="Tên đăng nhập"
          style={styles.textInput}
          placeholderTextColor={'#000'}
        />
        <Text style={styles.lable}>Mật khẩu</Text>
        <TextInput
          placeholder=" Mật khẩu"
          style={styles.textInput}
          placeholderTextColor={'#000'}
        />
      </View>
      <TouchableOpacity
        style={styles.contentRegister}
        onPress={() => {
          navigation.navigate('Homestack');
        }}>
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
        <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
          <Text style={styles.textLogin}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.textforgotPass}>Quên mật khẩu?</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
});
