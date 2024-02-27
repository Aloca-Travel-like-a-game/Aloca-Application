import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function VerifyAccount({navigation}: any) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const fifthInput = useRef();
  const sixthInput = useRef();

  const handleVerification = () => {
    const enteredOTP = otp.join('');
    AsyncStorage.getItem('registeredEmail').then(email => {
      axios
        .post(`http://52.63.147.17:8080/auth/confirm-account`, {
          email,
          code: enteredOTP.toString(),
        })
        .then(response => {
          console.log('Verification successful:', response.data);
          Alert.alert('Xác thực thành công!');
          navigation.navigate('Login');
        })
        .catch(error => {
          Alert.alert('Xác thực không thành công');
          console.error('Verification failed:', error);
        });
    });
  };

  const handleInputChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      switch (index) {
        case 0:
          secondInput.current.focus();
          break;
        case 1:
          thirdInput.current.focus();
          break;
        case 2:
          fourthInput.current.focus();
          break;
        case 3:
          fifthInput.current.focus();
          break;
        case 4:
          sixthInput.current.focus();
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
            />
          ))}
        </View>
        <Text style={styles.textVerify}>VUI LÒNG NHẬP MÃ OTP</Text>
        <TouchableOpacity
          style={styles.buttonVerify}
          onPress={handleVerification}>
          <Text style={styles.verify}>Xác Thực</Text>
        </TouchableOpacity>
        <View style={styles.textRefresh}>
          <Text style={styles.codeOTP}>Chưa nhận được mã OTP,</Text>
          <Text style={styles.sendCode}>gửi lại</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = {
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    alignItems: 'center',
  },
  textAloca: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  textVerify: {
    textAlign: 'center',
    marginTop: 20,
  },
  contentInput: {
    flexDirection: 'row',
    marginTop: 20,
  },
  input: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginHorizontal: 5,
    textAlign: 'center',
  },
  buttonVerify: {
    backgroundColor: 'blue',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  verify: {
    color: 'white',
    fontWeight: 'bold',
  },
  textRefresh: {
    flexDirection: 'row',
    marginTop: 20,
  },
  codeOTP: {
    marginRight: 5,
  },
  sendCode: {
    textDecorationLine: 'underline',
  },
};

// import axios from 'axios';
// import React, {useState, useRef} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ImageBackground,
//   TextInput,
//   Alert,
// } from 'react-native';
// export default function VerifyAccount({navigation}: any) {
//   const [otp, setOtp] = useState({1:'',2: '', 3:'', 4:'', 5:'', 6:''});
//   const firstInput = useRef ()
//   const secondInput = useRef ()
//   const thirdInput = useRef()
//   const fourthInput = useRef ()
//   const fiveInput = useRef ()
//   const sixInput = useRef()

//   const handleVerification = () => {
//     const enteredOTP = otp.join('');
//     AsyncStorage.getItem('registeredEmail').then((email: string | null) => {
//       axios
//         .post(
//           `https://9657-113-176-99-140.ngrok-free.app/auth/confirm-account`,
//           {
//             email,
//             otp: enteredOTP,
//           },
//         )
//         .then(response => {
//           console.log('Verification successful:', response.data);
//           Alert.alert('Xác thực thành công!');
//           navigation.navigate('LoginScreen');
//         })
//         .catch(error => {
//           Alert.alert('Xác thực không thành công');
//           console.error('Verification failed:', error);
//         });
//     });
//   };

//   return (
//     <ImageBackground
//       source={require('../../Images/VerifyCodeScreen.png')}
//       style={styles.Contentcontainer}>
//       <View style={styles.contentText}>
//         <Text style={styles.textAloca}>ALOCA</Text>
//         <Text style={styles.textVerify}>
//           MÃ XÁC NHẬN ĐÃ ĐƯỢC GỬI TỚI{'\n'} EMAIL CỦA BẠN
//         </Text>
//         <View style={styles.contentInput}>
//           <TextInput
//             style={styles.input}
//             maxLength={1}
//             keyboardType='number-pad'
//             ref={firstInput}
//             onChangeText={text => {
//               text && secondInput.current.focus();
//             }}

//           />
//           <TextInput
//             style={styles.input}
//             maxLength={1}
//             keyboardType='number-pad'
//             ref={secondInput}
//             onChangeText={text => {
//               text && thirdInput.current.focus();
//             }}
//           />
//           <TextInput
//             style={styles.input}
//             maxLength={1}
//             keyboardType='number-pad'
//             ref={thirdInput}
//             onChangeText={text => {
//               text && fourthInput.current.focus();
//             }}
//           />
//           <TextInput
//             style={styles.input}
//             maxLength={1}
//             keyboardType='number-pad'
//             ref={fourthInput}
//             onChangeText={text => {
//               text && fiveInput.current.focus();
//             }}
//           />
//           <TextInput
//             style={styles.input}
//             maxLength={1}
//             keyboardType='number-pad'
//             ref={fiveInput}
//             onChangeText={text => {
//               text && sixInput.current.focus();
//             }}
//           />
//           <TextInput
//             style={styles.input}
//             maxLength={1}
//             keyboardType='number-pad'
//             ref={sixInput}
//             onChangeText={text => {
//               text && sixInput.current.focus();
//             }}
//           />
//         </View>
//         <Text style={styles.textVerify}>VUI LÒNG NHẬP MÃ OTP</Text>
//         <TouchableOpacity
//           style={styles.ButtomVerify}
//           onPress={() => navigation.navigate('Login')}>
//           <Text style={styles.verify}>Xác Thực</Text>
//         </TouchableOpacity>
//         <View style={styles.textRefresh}>
//           <Text style={styles.codeOTP}>Chưa nhận được mã OTP,</Text>
//           <Text style={styles.sendCode}>gửi lại</Text>
//         </View>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   textAloca: {
//     fontSize: 35,
//     fontWeight: '500',
//     textAlign: 'center',
//     color: '#000',
//     paddingTop: 230,
//   },
//   contentText: {
//     // position: 'absolute',
//     // bottom: 0,
//     bottom: 40,
//   },
//   textVerify: {
//     textAlign: 'center',
//     fontSize: 20,
//     paddingTop: 10,
//     color: '#fff',
//   },
//   input: {
//     backgroundColor: '#fff',
//     borderRadius: 22,
//     width: 35,
//     height: 55,
//     margin: 5,
//     textAlign: 'center',
//     color: '#000',
//   },
//   contentInput: {
//     marginHorizontal: 10,
//     marginVertical: 10,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   ButtomVerify: {
//     backgroundColor: '#fff',
//     marginTop: 50,
//     width: '60%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 80,
//     borderRadius: 12,
//   },
//   verify: {
//     fontSize: 18,
//     color: '#00BCD4',
//     padding: 10,
//     fontWeight: '700',
//   },
//   Contentcontainer: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   textRefresh: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 10,
//     gap: 6,
//   },
//   sendCode: {
//     color: '#fff',
//   },
//   codeOTP: {
//     color: '#000',
//   },
// });
// import axios from 'axios';
// import React, {useState} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ImageBackground,
//   TextInput,
//   Alert,
// } from 'react-native';

// export default function VerifyAccount({navigation}: any) {
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);

//   const handleVerification = () => {
//     const enteredOTP = otp.join('');
//     console.log(enteredOTP);
//     AsyncStorage.getItem('registeredEmail').then((email: string | null) => {
//       axios
//         .post(
//           `https://9657-113-176-99-140.ngrok-free.app/auth/confirm-account`,
//           {
//             email,
//             otp: enteredOTP.toString(),
//           },
//         )

//         .then(response => {
//           console.log('Verification successful:', response.data);
//           Alert.alert('Xác thực thành công!');
//         })
//         .catch(error => {
//           Alert.alert('Xác thực không thành công');
//           console.error('Verification failed:', error);
//         });
//     });
//   };

//   return (
//     <ImageBackground
//       source={require('../../Images/VerifyCodeScreen.png')}
//       style={styles.Contentcontainer}>
//       <View style={styles.contentText}>
//         <Text style={styles.textAloca}>ALOCA</Text>
//         <Text style={styles.textVerify}>
//           MÃ XÁC NHẬN ĐÃ ĐƯỢC GỬI TỚI{'\n'} EMAIL CỦA BẠN
//         </Text>
//         <View style={styles.contentInput}>
//           {otp.map((value, index) => (
//             <TextInput
//               key={index}
//               style={styles.input}
//               maxLength={1}
//               onChangeText={text => {
//                 const newOtp = [...otp];
//                 newOtp[index] = text;
//                 setOtp(newOtp);
//               }}
//               value={value}
//             />
//           ))}
//         </View>
//         <Text style={styles.textVerify}>VUI LÒNG NHẬP MÃ OTP</Text>
//         <TouchableOpacity
//           style={styles.ButtomVerify}
//           onPress={handleVerification}>
//           <Text style={styles.verify}>Xác Thực</Text>
//         </TouchableOpacity>
//         <View style={styles.textRefresh}>
//           <Text style={styles.codeOTP}>Chưa nhận được mã OTP,</Text>
//           <Text style={styles.sendCode}>gửi lại</Text>
//         </View>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   textAloca: {
//     fontSize: 35,
//     fontWeight: '500',
//     textAlign: 'center',
//     color: '#000',
//     paddingTop: 230,
//   },
//   contentText: {
//     bottom: 40,
//   },
//   textVerify: {
//     textAlign: 'center',
//     fontSize: 20,
//     paddingTop: 10,
//     color: '#fff',
//   },
//   input: {
//     backgroundColor: '#fff',
//     borderRadius: 22,
//     width: 35,
//     height: 55,
//     margin: 5,
//     textAlign: 'center',
//     color: '#000',
//   },
//   contentInput: {
//     marginHorizontal: 10,
//     marginVertical: 10,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   ButtomVerify: {
//     backgroundColor: '#fff',
//     marginTop: 50,
//     width: '60%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 80,
//     borderRadius: 12,
//   },
//   verify: {
//     fontSize: 18,
//     color: '#00BCD4',
//     padding: 10,
//     fontWeight: '700',
//   },
//   Contentcontainer: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   textRefresh: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 10,
//     gap: 6,
//   },
//   sendCode: {
//     color: '#fff',
//   },
//   codeOTP: {
//     color: '#000',
//   },
// });
