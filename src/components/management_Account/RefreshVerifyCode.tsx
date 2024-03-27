import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { ipAddress } from '../../Helper/ip';
import { useNavigation } from '@react-navigation/native';
interface InputRef {
  focus: () => void;
}
export default function RefreshVerifyCode() {
  const navigation = useNavigation<any>();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      },
    );
    return () => backHandler.remove();
  }, [navigation]);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const firstInput = useRef<InputRef>(null);
  const secondInput = useRef<InputRef>(null);
  const thirdInput = useRef<InputRef>(null);
  const fourthInput = useRef<InputRef>(null);
  const fifthInput = useRef<InputRef>(null);
  const sixthInput = useRef<InputRef>(null);
  const handleVerification = async () => {
    try {
      const enteredOTP = otp.join('');
      if (enteredOTP.length !== 6) {
        Toast.show({
          type: 'error',
          text1: 'Thất bại',
          text2: 'Vui lòng nhập đầy đủ mã OTP !!',
        });
        return;
      }
      let code = enteredOTP.toString();
      let email = await AsyncStorage.getItem('emailResetPassword');
      console.log('showemail==', email);
      axios
        .post(`http://${ipAddress}:8080/auth/reset-password/${code}`, {
          email,
        })
        .then(response => {
          console.log('Verification successful:', response.data);
          Toast.show({
            type: 'success',
            text1: 'Thành công',
            text2: 'Xác thực thành công',
          });
          navigation.navigate('NewPassword');
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            Toast.show({
              type:'error',
              text1:'Thất bại',
              text2:'Mã OTP không chính xác',
          });
          } else {
            Toast.show({
              type:'error',
              text1:'Thất bại',
              text2:'Xác thực không thành công',
          });
          }
        });
    } catch (err) {}
  };

  const handleInputChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      switch (index) {
        case 0:
          secondInput.current?.focus();
          break;
        case 1:
          thirdInput.current?.focus();
          break;
        case 2:
          fourthInput.current?.focus();
          break;
        case 3:
          fifthInput.current?.focus();
          break;
        case 4:
          sixthInput.current?.focus();
          break;
        default:
          break;
      }
    }
  };

  return (
    <ImageBackground
      source={require('../../Images/VerifyCodeScreen.png')}
      style={styles.contentContainer}>
      <View style={styles.contentText}>
        <Text style={styles.textAloca}>ALOCA</Text>
        <Text style={styles.textVerify}>
          MÃ XÁC NHẬN ĐÃ ĐƯỢC GỬI TỚI{'\n'} EMAIL CỦA BẠN
        </Text>
        <View style={styles.contentInput}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.input}
              maxLength={1}
              keyboardType="number-pad"
              ref={
                index === 0
                  ? firstInput
                  : index === 1
                  ? secondInput
                  : index === 2
                  ? thirdInput
                  : index === 3
                  ? fourthInput
                  : index === 4
                  ? fifthInput
                  : sixthInput
              }
              onChangeText={text => handleInputChange(index, text)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  // Xoá giá trị và di chuyển con trỏ tới ô input trước đó (nếu có)
                  if (index > 0) {
                    handleInputChange(index - 1, ''); // Xoá giá trị ở ô input trước đó
                    switch (index - 1) {
                      case 0:
                        firstInput.current?.focus();
                        break;
                      case 1:
                        secondInput.current?.focus();
                        break;
                      case 2:
                        thirdInput.current?.focus();
                        break;
                      case 3:
                        fourthInput.current?.focus();
                        break;
                      case 4:
                        fifthInput.current?.focus();
                        break;
                      case 5:
                        sixthInput.current?.focus();
                        break;
                      default:
                        break;
                    }
                  }
                }
              }}
            />
          ))}
        </View>
        <Text style={styles.textVerify}>VUI LÒNG NHẬP MÃ OTP</Text>
        <TouchableOpacity
          style={styles.buttonVerify}
          onPress={handleVerification}>
          <Text style={styles.verify}>Xác Thực</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    alignItems: 'center',
    marginTop: 180,
  },
  textAloca: {
    fontSize: 35,
    fontWeight: '600',
    color: '#000',
  },
  textVerify: {
    textAlign: 'center',
    marginTop: 20,
    color: '#FFFF',
    fontSize: 15,
  },
  contentInput: {
    flexDirection: 'row',
    marginTop: 20,
  },
  input: {
    width: 40,
    height: 55,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 15,
    marginHorizontal: 5,
    textAlign: 'center',
    backgroundColor: '#DCDCDC',
    color: '#000',
  },
  buttonVerify: {
    backgroundColor: '#FFF',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: 250,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
  },
  verify: {
    color: '#40B59F',
    fontWeight: 'bold',
    fontSize: 18,
  },
  textRefresh: {
    flexDirection: 'row',
    marginTop: 20,
  },
  codeOTP: {
    marginRight: 5,
    color: '#000',
  },
  sendCode: {
    textDecorationLine: 'underline',
    color: '#FFFF',
  },
});
