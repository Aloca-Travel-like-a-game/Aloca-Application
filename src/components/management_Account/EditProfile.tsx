import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {launchImageLibrary} from 'react-native-image-picker';
import {string} from 'yup';
import Toast from 'react-native-toast-message';
import { ipAddress } from '../../Helper/ip';
interface getProfile {
  fullname: string;
  email: string;
  phone: string;
  address: string;
  selectedImage: string;
  image: string;
}
export default function EditProfile({navigation}: any): getProfile[] {
  const [_userData, setUserData] = useState<any>();
  const [newName, setNewName] = useState<string>('');
  const [newPhone, setNewPhone] = useState<string>();
  const [newAddress, setNewAddress] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState(null);
  const queryClient = useQueryClient();
  const formData = new FormData();
  formData.append('files', {
    uri: selectedImage,
    type: 'image/jpeg',
    name: 'product_image.jpg',
  });
  Object.keys(string).forEach(key => {
    formData.append(key, key);
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('user');
        const userData = data ? JSON.parse(data) : null;
        setUserData(userData);
        if (userData) {
          setNewName(userData.data.fullname);
          setNewAddress(userData.data.address);
          if (userData.data.phone !== undefined) {
            setNewPhone(userData.data.phone.toString());
          } else {
            setNewPhone('');
          }
          if (userData.data.image !== undefined) {
            setSelectedImage(userData.data.image);
          } else {
            setSelectedImage(null);
          }
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);
  const mutationEdit = useMutation({
    mutationFn: async (data: any) => {
      try {
        const jsonValue: any = await AsyncStorage.getItem('user');
        const dataProfile = JSON.parse(jsonValue);
        const token = dataProfile.accessToken;
        const response = await axios.post(
          `http://${ipAddress}:8080/user/profile`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.status === 200) {
          Toast.show({
            type: 'success',
            text1: 'Thành công',
            text2: 'Cập nhật thông tin thành công 👋',
          });
          setUserData(response.data);
          let newUser = JSON.parse(await AsyncStorage.getItem('user'));
          for (const [key, value] of Object.entries(data)) {
            newUser.data[key] = value;
          }
          await AsyncStorage.setItem('user', JSON.stringify(newUser));
          queryClient.invalidateQueries({queryKey: ['profile']});
          navigation.navigate('Tài khoản');
        } else {
          Toast.show({
            type: 'error',
            text1: 'Thất bại',
            text2: 'Cập nhật thông tin không thành công 👋',
          });
        }
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  });
  const handleOnChange = (key: keyof getProfile, value: string) => {
    if (key === 'fullname') {
      setNewName(value);
    } else if (key === 'phone') {
      // setNewPhone(value);
        setNewPhone(value);
 
    } else if (key === 'address') {
      setNewAddress(value);
    }
  };
  const handleSaveProfile = async () => {
    try {
      if (!newName || !newPhone || !newAddress || !selectedImage) {
        Toast.show({
            type: 'error',
            text1: 'Thất bại',
            text2: 'Vui lòng nhập đầy đủ thông tin',
          });
      } else if (newPhone.length !== 10) {
        Toast.show({
          type: 'error',
          text1: 'Thất bại',
          text2: 'Số điện thoại không hợp lệ ',
        });
      }
      else {
        const response = await mutationEdit.mutate({
          fullname: newName,
          phone: newPhone,
          address: newAddress,
          image: selectedImage,
        });
        
        setUserData(response.data);
      }
    } catch (error) {}
  };
  const handleGoBack = () => {
    navigation.goBack();
  };
  const openImagePicker = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        try {
          let imageUri = response.uri || response.assets?.[0]?.uri;
          setSelectedImage(imageUri);
        } catch (error) {
          console.error('Error saving image: ', error);
        }
      }
    });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerBack}>
        <TouchableOpacity onPress={handleGoBack}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="white"
            style={styles.icongoBack}
          />
        </TouchableOpacity>
        <Text style={styles.textInformation}> Thông tin </Text>
      </View>
      <View style={styles.contentTextInput}>
        <View
          style={styles.contentImage}
          onPress={openImagePicker}
          onTouchEnd={openImagePicker}>
          {selectedImage ? (
            <Image source={{uri: selectedImage}} style={styles.image} />
          ) : (
            <TouchableOpacity
              onPress={openImagePicker}
              style={styles.cameraIcon}>
              <View style={styles.imagePlaceholder}>
                <AntDesign name="camera" size={28} color="#000" />
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={openImagePicker} style={styles.cameraIcon}>
            <View style={styles.imagePlaceholder}>
              <AntDesign name="camera" size={28} color="#000" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.InputData}>
          <Text style={styles.text}>Họ và tên</Text>
          <TextInput
            style={styles.textInput}
            value={newName}
            onChangeText={text => handleOnChange('fullname', text)}
          />
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.textInputemail}
            value={_userData?.data?.email}
            onChangeText={text => handleOnChange('email', text)}
            editable={false}
          />
          <Text style={styles.text}>Số điện thoại</Text>
          <TextInput
            style={styles.textInput}
            value={newPhone}
            onChangeText={text => handleOnChange('phone', text)}
            keyboardType="numeric"
          />
          <Text style={styles.text}>Địa chỉ </Text>
          <TextInput
            style={styles.textInput}
            value={newAddress}
            onChangeText={text => handleOnChange('address', text)}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.save} onPress={handleSaveProfile}>
        <Text style={styles.textSave}>Lưu lại</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {},
  headerBack: {
    height: 60,
    backgroundColor: '#2AB6AD',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 100,
  },
  textInformation: {
    color: '#FFF',
    fontSize: 20,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: '#808080',
    color: '#000',
    fontSize: 18,
    fontWeight: '400',
  },
  textInputemail: {
    borderBottomWidth: 1,
    borderColor: '#808080',
    color: '#757575',
    fontSize: 18,
    fontWeight: '400',
  },
  contentTextInput: {
    marginHorizontal: 16,
    marginTop: 25,
  },
  text: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
  },
  save: {
    height: 50,
    backgroundColor: '#2AB6AD',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  textSave: {
    color: '#FFF',
    fontSize: 18,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  contentImage: {
    alignSelf:'center',
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    position: 'absolute',
    marginTop: -25,
    backgroundColor: '#FFF',
    elevation: 2,
    left:55,
    
  },
  cameraIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  InputData: {
    marginHorizontal: 16,
    marginTop: 40,
  },
  icongoBack: {
    marginLeft: 20,
  },
});