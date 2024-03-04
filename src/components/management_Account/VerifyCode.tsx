import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Image,
} from 'react-native';

export default function VerifyCode({navigation}: any) {
  return (
    <ImageBackground
      source={require('../../Images/VerifyCodeScreen.png')}
      style={styles.Contentcontainer}>
      <View style={styles.contentText}>
        <Text style={styles.textAloca}>ALOCA</Text>
        <Text style={styles.textVerify}>
          MÃ XÁC NHẬN ĐÃ ĐƯỢC GỬI TỚI{'\n'} EMAIL CỦA BẠN
        </Text>
        <View style={styles.contentInput}>
          <TextInput style={styles.input} />
          <TextInput style={styles.input} />
          <TextInput style={styles.input} />
          <TextInput style={styles.input} />
          <TextInput style={styles.input} />
          <TextInput style={styles.input} />
        </View>
        <Text style={styles.textVerify}>VUI LÒNG NHẬP MÃ OTP</Text>
        <TouchableOpacity
          style={styles.ButtomVerify}
          onPress={() => navigation.navigate('LoginNew')}>
          <Text style={styles.verify}>Xác Thực</Text>
        </TouchableOpacity>
        <View style={styles.textRefresh}>
          <Text style={styles.codeOTP}>Chưa nhận được mã OTP,</Text>
          <Text style={styles.sendCode}>gửi lại</Text>
        </View>
        <TouchableOpacity onPress={navigation.navigate('Login')}>
          <Image
            source={require('../../Images/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  textAloca: {
    fontSize: 35,
    fontWeight: '500',
    textAlign: 'center',
    color: '#000',
    paddingTop: 230,
  },
  contentText: {
    // position: 'absolute',
    // bottom: 0,
    bottom: 40,
  },
  textVerify: {
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 10,
    color: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 22,
    width: 35,
    height: 55,
    margin: 5,
    textAlign: 'center',
    
  },
  contentInput: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtomVerify: {
    backgroundColor: '#fff',
    marginTop: 50,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 80,
    borderRadius: 12,
  },
  verify: {
    fontSize: 18,
    color: '#00BCD4',
    padding: 10,
    fontWeight: '700',
  },
  Contentcontainer: {
    flex: 1,
    justifyContent: 'center',
  },
  textRefresh: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 6,
  },
  sendCode: {
    color: '#fff',
  },
  codeOTP: {
    color: '#000',
  },
  backIcon: {
    marginLeft: 170,
    marginTop: 15,
  },
});
