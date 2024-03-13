import {View, TextInput, StyleSheet, Image, Text, FlatList, TouchableOpacity, Linking, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SliderBox} from 'react-native-image-slider-box';
import Video from 'react-native-video';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function HomeScreens( {navigation}: any) {
      const {data: dataUser } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const tokenst : any = await AsyncStorage.getItem('user');
      const datauser = JSON.parse(tokenst);
      return datauser;
    },
  });
  const data = [
    {
      id: 1,
      name: require('../videos/shortvideo.mp4'),
      youtubeLink:'https://youtube.com/shorts/UklwTkNkr8c?si=LLpw6xPVOiIffMhR',
    },
    {
      id: 2,
      name: require('../videos/shortvideotravel1.mp4'),
      youtubeLink:'https://youtube.com/shorts/UklwTkNkr8c?si=1tS0sOXrWGhiey30',
    },
    {
      id: 3,
      name: require('../videos/shortvideotravel2.mp4'),
      youtubeLink:'https://youtube.com/shorts/Zfaavxyy4Gs?si=KJyCywt4SuZQvZMF',
    },
    {
      id: 4,
      name: require('../videos/shortvideotravel3.mp4'),
      youtubeLink:'https://youtube.com/shorts/BlWVo5CB6RU?si=XHaP3gdkX1IAcEC4',
    },
  ];

  const imageshomescreen = [
    require('../Images/imagehomepage.png'),
    require('../Images/imagehomepage.png'),
    require('../Images/imagehomepage.png'),
  ];
  const images = [
    require('../Images/silder.png'),
    require('../Images/silder.png'),
    require('../Images/silder.png'),
    require('../Images/silder.png'),
    require('../Images/silder.png'),
  ];
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
        <TouchableOpacity style={styles.iconnotifications} onPress={()=>navigation.navigate('Notification')} >
          <Ionicons name="notifications-outline" size={42} color="black" />
        </TouchableOpacity>
        <View>
          {/* <Image source={require('../Images/Genz.png')} style={styles.image} /> */}
          {/* <Image style={styles.image} source={{uri: dataUser?.data.image}} /> */}
          {dataUser?.data.image !== '' ? <Image style={styles.imageRanking} source={{uri: dataUser?.data.image}} /> : null}
        </View>
      </View>
      <View style={styles.sliderContainer}>
        <SliderBox
          style={styles.sliderImage}
          images={images}
          autoplay
          circleLoop
          autoplayInterval={10000}
          dotColor="#FFEE58"
          inactiveDotColor="#90A4AE"
        />
      </View>
      <View style={styles.titileVideo}>
        <Text style={styles.textVideo}>Video nổi bật</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('VideoTravel')}>
          <Text style={styles.textmore}>Xem thêm</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contetVideo}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity onPress={()=>Linking.openURL(item.youtubeLink)}>
            <Video source={item.name} muted style={styles.videoPlayer} resizeMode="contain"  repeat={true}/>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
          horizontal
        />
      </View>
      <View style={styles.titilimage}>
        <Text style={styles.textVideo}>Có thể bạn sẽ thích?</Text>
        <Text style={styles.textmore}>Xem thêm</Text>
      </View>
      <View style={styles.imagehomeScreen}>
        <FlatList
          data={imageshomescreen}
          renderItem={({item}) => (
            <View>
              <Image source={item} style={styles.imageScreen}/>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
        />
      </View>
      <View style={styles.titilebestTravel}>
        <Text style={styles.textTravel}>Bảng xếp hạng"Vua du lịch"</Text>
        <Text style={styles.textmore}>Xem thêm</Text>
      </View>
      <View>
        {dataUser?.data.image !== '' ? <Image style={styles.imageRanking} source={{uri: dataUser?.data.image}} /> : null}
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
    marginHorizontal: 16,
    marginTop: 20,
  },
  icon: {
    position: 'absolute',
    top: '26%',
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
  imageRanking:{
    width:60,
    height:60,
    borderRadius: 50,
    marginBottom:10,
  },
  sliderContainer: {
    marginTop: 10,
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
    height:168,
    borderRadius:10,
  },
  titilimage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  imagehomeScreen:{
    marginTop: 14,
  },
  imageScreen:{
    margin: 3,
    width:217,
    height:162,
  },
  titilebestTravel:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  textTravel:{
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageranking:{
    width:60,
    height:60,
    borderRadius:50,
    marginBottom:10,
  },
});


