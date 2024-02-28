import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  Button,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation} from '@tanstack/react-query';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
interface getProfile {
  fullname: string;
  email: string;
  phone:string,
  address:string
}

export default function EditProfile({navigation}: any) {
  const [_userData, setUserData] = useState<any>();
  const [newName, setNewName] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [newPhone, setNewPhone] = useState<string|null>(null);
  const [newAddress, setNewAddress] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('user');
        const userData = data ? JSON.parse(data) : null;
        setUserData(userData);
        console.log(userData);
        
        const savedImageUri = await AsyncStorage.getItem(
          `selectedImage_${userData.data.username}`,
        );
        setSelectedImage(savedImageUri || null);
        if (userData) {
          setNewName(userData.data.fullname);
          setNewEmail(userData.data.email);
          setNewPhone(userData.data.phone.toString());
          
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
        console.log(token);

        const response = await axios.post(
          'http://52.63.147.17:8080/user/profile',
          data,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.status === 200) {
          Alert.alert('Success', 'Update successfully');
          setUserData(data);
        } else {
          Alert.alert('Invalid information!');
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
    } else if (key === 'email') {
      setNewEmail(value);
    } else if (key === 'phone') {
      setNewPhone(value);
    } else if (key === 'address') {
      setNewAddress(value);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const response = await mutationEdit.mutateAsync({
        fullname: newName,
        email: newEmail,
        phone: newPhone,
        address: newAddress,
      });
      // Cập nhật dữ liệu mới từ backend vào state _userData
      setUserData(response.data);
      Alert.alert('Success', 'Update successfully');
    } catch (error) {
      console.error('Error updating profile: ', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };
  // const handleSaveProfile = () => {
  //   mutationEdit.mutate({
  //     fullname: newName,
  //     email: newEmail,
  //     phone: newPhone,
  //     address: newAddress,
  //   });
  //   console.log('Data của user====>hihihii:',(_userData.data.phone));
  // };
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
          await AsyncStorage.setItem(`selectedImage_${_userData.data.username}`, imageUri);
          // const base64Image = response.base64;
          // // Gửi dữ liệu hình ảnh lên máy chủ
          // const imageData = { image: base64Image };
          // await axios.post('http://52.63.147.17:8080/user/profile', imageData);
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
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.textInformation}> Thông tin </Text>
      </View>
      <View style={styles.contentTextInput}>
        <View
          style={styles.contentImage}
          onPress={openImagePicker}
          onTouchEnd={openImagePicker}>
          {selectedImage ? (
            <Image
              source={{uri: selectedImage}}
              resizeMode="contain"
              style={styles.image}
            />
          ) : (
            <TouchableOpacity
              onPress={openImagePicker}
              style={styles.cameraIcon}>
              <View style={styles.imagePlaceholder}>
                <AntDesign name="camera" size={28} color="#000" />
              </View>
            </TouchableOpacity>
          )}
        </View>
        {/* <View style={{marginTop: 20, marginBottom: 50}}>
          <Button title="Chụp" onPress={handleCameraLaunch} />
        </View> */}
        <Text style={styles.text}>Họ và tên</Text>
        <TextInput
          style={styles.textInput}
          value={newName}
          onChangeText={text => handleOnChange('fullname', text)}
        />
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.textInput}
          value={newEmail}
          onChangeText={text => handleOnChange('email', text)}
        />
        <Text style={styles.text}>Số điện thoại</Text>
        <TextInput
          style={styles.textInput}
          value={newPhone}
          onChangeText={text => handleOnChange('phone', text)}
        />
        <Text style={styles.text}>Địa chỉ </Text>
        <TextInput
          style={styles.textInput}
          value={newAddress}
          onChangeText={text => handleOnChange('address', text)}
        />
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
    gap: 120,
  },
  textInformation: {
    color: '#FFF',
    fontSize: 20,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: '#808080',
    color: '#000',
  },
  contentTextInput: {
    marginHorizontal: 16,
    marginTop: 10,
  },
  text: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
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
    width: 140,
    height: 140,
  },
  contentImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: '#808080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});
