import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import React, {useEffect, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import { ipAddress } from '../Helper/ip';
// import  RemoteImage from 'react-native-banner-carousel';
// import BannerCarousel from 'react-native-banner-carousel';
export default function HomeScreens({navigation}: any) {
  const [rankingData, setRankingData] = useState<any>([]);
  const {data: dataUser} = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const tokenst: any = await AsyncStorage.getItem('user');
      const datauser = JSON.parse(tokenst);
      return datauser;
    },
  });

  const getHighestData = async () => {
    const response = await axios.get(
      `http://${ipAddress}:8080/rankings/rankingUserHighest`,
    );
    setRankingData(response.data);
  };
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Chờ đã', 'Bạn chắc chắn muốn thoát chứ?', [
        {
          text: 'Không',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'Có', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    getHighestData();
  }, []);
  const data = [
    {
      id: 1,
      name: require('../videos/shortvideo.mp4'),
      youtubeLink: 'https://youtube.com/shorts/UklwTkNkr8c?si=LLpw6xPVOiIffMhR',
    },
    {
      id: 2,
      name: require('../videos/shortvideotravel1.mp4'),
      youtubeLink: 'https://youtube.com/shorts/UklwTkNkr8c?si=1tS0sOXrWGhiey30',
    },
    {
      id: 3,
      name: require('../videos/shortvideotravel2.mp4'),
      youtubeLink: 'https://youtube.com/shorts/Zfaavxyy4Gs?si=KJyCywt4SuZQvZMF',
    },
    {
      id: 4,
      name: require('../videos/shortvideotravel3.mp4'),
      youtubeLink: 'https://youtube.com/shorts/BlWVo5CB6RU?si=XHaP3gdkX1IAcEC4',
    },
  ];
  const imageshomescreen = [
    require('../Images/imagehomepage.png'),
    require('../Images/hagiangImage.jpg'),
    require('../Images/hagiangImage1.jpg'),
    require('../Images/hagiangImage2.jpg'),
    require('../Images/imagehomepage.png'),
    require('../Images/imagehomepage.png'),
    require('../Images/imagehomepage.png'),
  ];
  // const images = [
  //   require('../Images/silder.png'),
  //   require('../Images/silder.png'),
  //   require('../Images/silder.png'),
  //   require('../Images/silder.png'),
  //   require('../Images/silder.png'),
  // ];

  const a = [
    {
      name:'quang',
    },
    {
      name:'quang',
    },
    {
      name:'quang',
    },
    {
      name:'quang',
    },
    {
      name:'quang',
    },
    {
      name:'quang',
    },
    {
      name:'quang',
    },
    {
      name:'quang',
    },
    {
      name:'quang',
    },
    {
      name:'quang',
    },
    {
      name:'quang',
    },
    {
      name:'quang',
    },
  ];
  let result;
  if (a.length >= 10) {
    result = 9 + '+';
  } else {
    result = a.length.toString();
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.containerContent}>
      <View style={styles.contentHeader}>
        <View style={styles.searchContent}>
          <TextInput
            style={styles.textinput}
            placeholder="Bạn muốn đi đâu?"
            placeholderTextColor={'#000'}
          />
          <Ionicons name="search" size={24} color="black" style={styles.icon} />
        </View>
        <TouchableOpacity
          style={styles.iconnotifications}
          onPress={() => navigation.navigate('Notification')}>
          <Ionicons name="notifications-outline" size={40} color="black" />
          <Text style={styles.numbernotification}>{result}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Tài khoản')}>
          {dataUser?.data.image ? (
            <Image style={styles.image} source={{uri: dataUser?.data.image}} />
          ) : null}
        </TouchableOpacity>
      </View>
      <View style={styles.sliderContainer}>
        <Swiper style={styles.wrapper} showsButtons={false} autoplay >
            <Image
              source={require('../Images/silder.png')}
              style={styles.imageSlider}
            />
            <Image
              source={require('../Images/sliderImge.jpg')}
              style={styles.imageSlider}
            />
            <Image
              source={require('../Images/sliderImage1.jpg')}
              style={styles.imageSlider}
            />
            <Image
              source={require('../Images/sliderImage4.jpg')}
              style={styles.imageSlider}
            />
        </Swiper>
      </View>
      <View style={styles.titileVideo}>
        <Text style={styles.textVideo}>Video nổi bật</Text>
        <TouchableOpacity onPress={() => navigation.navigate('VideoTravel')}>
          <Text style={styles.textmore}>Xem thêm</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contetVideo}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => Linking.openURL(item.youtubeLink)}>
              <Video
                source={item.name}
                muted
                style={styles.videoPlayer}
                resizeMode="contain"
                repeat={true}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
          horizontal
        />
      </View>
      <View style={styles.titilimage}>
        <Text style={styles.textVideo}>Có thể bạn sẽ thích?</Text>
      </View>
      <View style={styles.imagehomeScreen}>
        <FlatList
          data={imageshomescreen}
          renderItem={({item}) => (
            <View>
              <Image source={item} style={styles.imageScreen} />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
        />
      </View>
      <View style={styles.titilebestTravel}>
        <Text style={styles.textTravel}>Bảng xếp hạng ' Vua du lịch '</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Xếp hạng')}>
          <Text style={styles.textmore}>Xem thêm</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewRanking}>
        <FlatList
          data={rankingData.dataRanks}
          renderItem={({item}) => {
            return (
              <View style={styles.TopRanking}>
                <Image source={{uri: item.image}} style={styles.imageRanking} />
              </View>
            );
          }}
          horizontal
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  textinput: {
    borderWidth: 1,
    color: '#000',
    height: 45,
    width: 230,
    borderRadius: 15,
    elevation: 6,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    paddingLeft: 35,
  },
  containerContent: {
    flex: 1,
    marginHorizontal: 12,
    paddingTop: 16,
  },
  icon: {
    position: 'absolute',
    top: '22%',
    left: '3%',
  },
  searchContent: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconnotifications: {
    alignItems: 'center',
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  imageRanking: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginBottom: 10,
  },
  sliderImage: {
    width: 350,
    height: 170,
    borderRadius: 10,
  },
  textVideo: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textmore: {
    color: '#2AB6AD',
    fontSize: 18,
    fontWeight: '500',
    borderBottomWidth: 1,
    borderColor: '#2AB6AD',
  },
  titileVideo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  contetVideo: {
    marginTop: 15,
  },
  videoPlayer: {
    width: 100,
    height: 168,
    borderRadius: 10,
  },
  titilimage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  imagehomeScreen: {
    marginTop: 14,
  },
  imageScreen: {
    margin: 3,
    width: 217,
    height: 162,
    borderRadius:10,
  },
  titilebestTravel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  textTravel: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageranking: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginBottom: 10,
  },
  numbernotification: {
    color: '#FFFFFF',
    position: 'absolute',
    backgroundColor: '#FF5858',
    borderRadius: 50,
    textAlign:'center',
    width: 20,
    height: 20,
    // marginTop: 20,
    left:20,
  },
  viewRanking: {
    marginBottom: 20,
    marginTop: 8,
  },
  sliderContainer: {
    marginTop: 10,
  },
  wrapper: {
    height:210,
    alignItems:'center',
  },
  imageSlider: {
    height: 200,
    borderRadius: 10,
    padding:5,
    margin:5,
    width:'auto',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  TopRanking:{
    margin:5,
  },
});
