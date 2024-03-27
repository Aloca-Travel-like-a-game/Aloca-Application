import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function ProfileScreens({navigation}: any) {
  const [data, setData] = useState<any>();
  useEffect(() => {
    AsyncStorage.getItem('user').then((datauser: any) =>
      setData(JSON.parse(datauser).data),
    );
  });
  const handleEditprofile = () => {
    navigation.navigate('Editprofile');
  };
  const handleLogout = async () => {
    await AsyncStorage.clear();
       navigation.navigate('Login');
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.containerContent}>
      <View style={styles.editProfile}>
        <View style={styles.contentheader}>
          {data?.image !== null && data?.image !== undefined ? (
            <Image style={styles.image} source={{uri: data?.image}} />
          ) : null}
          <Text style={styles.textfullname}>{data?.fullname}</Text>
        </View>
        <TouchableOpacity onPress={handleEditprofile}>
          <AntDesign name="form" size={28} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.navBtn}>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.textEditprofile}>Thông báo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Trợ lý', {screen: 'AddNewTrip'})}>
          <Ionicons
            name="airplane-outline"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.textEditprofile}>Kế hoạch</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentAloca}>
        <Image source={require('../Images/Vector.png')} />
        <TouchableOpacity onPress={() => navigation.navigate('WhatAloca')}>
          <Text style={styles.textAloca}>Aloca là gì ?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.alocaforGenZ}>
        <View>
          <Text style={styles.textAloca}>Aloca for GenZ</Text>
          <Text style={styles.textAloca}>
            bạn cần đặt tua du lịch đúng không ?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Benefit')}>
            <Text style={styles.textbenefit}>Lợi ích</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Image style={styles.image1} source={require('../Images/Genz.png')} />
        </View>
      </View>
      <View style={styles.contentManage}>
        <TouchableOpacity style={styles.contenttext}>
          <AntDesign name="customerservice" size={24} color="black" />
          <Text style={styles.text}>hotline 24/6:19001009</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contenttext}>
          <AntDesign name="unlock" size={24} color="black" />
          <Text style={styles.text}>Chính sách bảo mật </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contenttext}>
          <AntDesign name="export2" size={24} color="black" />
          <Text style={styles.text}>Gửi phản hồi </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentEvaluate}>
        <View>
          <Text style={styles.textevaluateAloca}>Đánh giá Aloca</Text>
          <Text style={styles.text}>
            Giúp chúng tôi nâng cao {'\n'} chất lượng dịch vụ
          </Text>
          <Text style={styles.evaluate}>Đánh giá</Text>
        </View>
        <Image source={require('../Images/user.png')} />
      </View>
      <TouchableOpacity style={styles.contentAloca} onPress={handleLogout}>
        <Text style={styles.textLogout}>Đăng xuất</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  containerContent: {
    flex: 1,
    paddingHorizontal: 20,
    // marginTop: 10,
    // marginVertical:20,
  },
  editProfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  navBtn: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
  },
  textEditprofile: {
    color: '#000',
    fontSize: 18,
  },
  textfullname: {
    color: '#000',
    fontSize: 25,
    fontWeight: '800',
  },
  contentAloca: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    gap: 20,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    marginTop: 10,
    elevation: 2,
    marginBottom: 10,
    // height:60,
  },
  textAloca: {
    color: '#000',
    fontSize: 15,
  },
  alocaforGenZ: {
    flexDirection: 'row',
    color: '#000',
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    marginTop: 10,
    elevation: 2,
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
  },
  textbenefit: {
    color: '#FFFFFF',
    backgroundColor: '#2AB6AD',
    padding: 8,
    width: 80,
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 10,
  },
  contentManage: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    marginTop: 10,
    elevation: 2,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  text: {
    color: '#000',
  },
  contenttext: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
  },
  textlanguage: {
    marginLeft: 80,
  },
  textvn: {
    color: '#778899',
  },
  evaluate: {
    color: '#ffff',
    backgroundColor: '#2AB6AD',
    padding: 8,
    width: 80,
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 10,
  },
  contentEvaluate: {
    flexDirection: 'row',
    backgroundColor: '#E0F7FA',
    marginTop: 12,
    elevation: 2,
    // borderWidth: 1,
    borderRadius: 10,
    // borderColor: '#87CEFA',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  textevaluateAloca: {
    color: '#000',
    fontWeight: '700',
    fontSize: 18,
  },
  textLogout: {
    color: '#000',
    fontWeight: 'bold',
    borderBottomWidth: 1,
    padding: 5,
  },
  icon: {
    textAlign: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  image1: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  imagePlaceholder: {
    backgroundColor: '#ccc',
  },
  contentheader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});
