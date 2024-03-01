import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {launchImageLibrary} from 'react-native-image-picker';
import { string } from 'yup';
interface getProfile {
  fullname: string;
  email: string;
  phone: string;
  address: string;
  selectedImage:string;
  image: string;
}

export default function EditProfile({navigation}: any): getProfile[] {
  const [_userData, setUserData] = useState<any>();
  const [newName, setNewName] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [newPhone, setNewPhone] = useState<string>();
  const [newAddress, setNewAddress] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState(null);
  const queryClient = useQueryClient();
console.log('oo',selectedImage );
console.log('addd', newAddress);

console.log('oppp', _userData);



  const formData = new FormData();
    formData.append('files', {
      uri: selectedImage,
      type: 'image/jpeg',
      name: 'product_image.jpg',
    });

    Object.keys(string).forEach(key => {
      formData.append(key, string[key]);
    });
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('user');
        const userData = data ? JSON.parse(data) : null;
        setUserData(userData);
        if (userData) {
          setNewName(userData.data.fullname);
          setNewEmail(userData.data.email);
          setNewAddress(userData.data.address);
          if (userData.data.phone !== undefined) {
            setNewPhone(userData.data.phone.toString());

          } else {
            setNewPhone('');
          }
          setSelectedImage(userData.data.image);
         
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
          setUserData(response.data)
          let newUser = JSON.parse(await AsyncStorage.getItem('user'));
          console.log('data', data);
          console.log('user data', newUser)
          for (const [key,value] of Object.entries(data)) {
            console.log('k, v', key, value);
            newUser.data[key] = value;
          }
          await AsyncStorage.setItem('user', JSON.stringify(newUser));
          console.log('invalidate')
          queryClient.invalidateQueries({ queryKey: ['profile'] });
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
      // const formData = new FormData();
      // formData.append('image', selectedImage);
      const response =  await mutationEdit.mutate({
        fullname: newName,
        email: newEmail,
        phone: newPhone,
        address: newAddress,
        image: selectedImage,
      });
      setUserData(response.data);
      // setNewAddress(response.data.address);
    //  setUserData(response.data)
    } catch (error) {
      console.error('Error updating profile: ', error);
      // Alert.alert('Error', 'Failed to update profile');
    }
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
    launchImageLibrary(options , async response => {
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
          <TouchableOpacity
              onPress={openImagePicker}
              style={styles.cameraIcon}>
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
        <Text style={styles.text}>Địa chỉ  {newAddress} </Text>
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
    marginTop: 25,
  },
  text: {
    color: '#000',
    fontSize: 18,
    fontWeight: '400',
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
    width: 90,
    height: 90,
    borderRadius:50,
  },
  contentImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:50,
    position:'absolute',
    marginTop:-15,
    backgroundColor:'#FFF',
  },
  cameraIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    
  },
  InputData:{
    marginHorizontal: 16,
    marginTop: 40,
  }
});