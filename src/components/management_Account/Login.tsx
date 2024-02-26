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
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Login({ navigation }: any) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require('../../Images/Icon.png')}
          style={styles.logoImage}
        />
        <Text style={styles.textAloca}>ALOCA</Text>
        <View style={styles.containerContent}>
          <Text style={styles.label}>TÊN ĐĂNG NHẬP</Text>
          <TextInput style={styles.textInput} placeholderTextColor={'#000'} />
          <View>
            <Text style={styles.label}>MẬT KHẨU</Text>
            <TextInput
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={styles.textInput}
            />
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
          onPress={() => {
            navigation.navigate('Homestack');
          }}
        >
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
});
