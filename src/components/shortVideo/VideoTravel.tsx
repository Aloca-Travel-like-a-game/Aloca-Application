import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Linking,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
export default function VideoTravel({navigation}: any) {
  const data = [
    {
      id: 1,
      name: require('../../videos/shortvideotravel3.mp4'),
      youtubeLink: 'https://youtube.com/shorts/UklwTkNkr8c?si=LLpw6xPVOiIffMhR',
    },
    {
      id: 2,
      name: require('../../videos/shortvideo.mp4'),
      youtubeLink: 'https://youtube.com/shorts/UklwTkNkr8c?si=LLpw6xPVOiIffMhR',
    },
    {
      id: 3,
      name: require('../../videos/shortvideotravel1.mp4'),
      youtubeLink: 'https://youtube.com/shorts/UklwTkNkr8c?si=LLpw6xPVOiIffMhR',
    },
    {
      id: 4,
      name: require('../../videos/shortvideotravel2.mp4'),
      youtubeLink: 'https://youtube.com/shorts/UklwTkNkr8c?si=LLpw6xPVOiIffMhR',
    },
    {
      id: 5,
      name: require('../../videos/shortvideotravel1.mp4'),
      youtubeLink: 'https://youtube.com/shorts/UklwTkNkr8c?si=LLpw6xPVOiIffMhR',
    },
    {
      id: 6,
      name: require('../../videos/shortvideotravel1.mp4'),
      youtubeLink: 'https://youtube.com/shorts/UklwTkNkr8c?si=LLpw6xPVOiIffMhR',
    },
    // {
    //   id: 7,
    //   name: require('../../videos/shortvideotravel1.mp4'),
    //   youtubeLink:'https://youtube.com/shorts/UklwTkNkr8c?si=LLpw6xPVOiIffMhR',
    // },
    // {
    //   id: 8,
    //   name: require('../../videos/shortvideotravel1.mp4'),
    //   youtubeLink:'https://youtube.com/shorts/UklwTkNkr8c?si=LLpw6xPVOiIffMhR',
    // },
    //   {
    //     id: 9,
    //     name: require('../../videos/shortvideotravel1.mp4'),
    //   },
    //   {
    //     id: 10,
    //     name: require('../../videos/shortvideotravel1.mp4'),
    //   },
  ];
  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.containerHeader}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons
            style={styles.iconback}
            name="arrow-back-outline"
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>
        <Text style={styles.textNotification}> Video </Text>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          numColumns={2}
          data={data}
          style={{
            flex: 1,
            backgroundColor: 'red',
            alignSelf: 'center',
            width: '100%',
            paddingHorizontal: 10,
          }}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => Linking.openURL(item.youtubeLink)}
              style={styles.contentVideo}>
              <Video
                source={item.name}
                muted
                resizeMode="contain"
                repeat={true}
                style={styles.videoPlayer}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#2AB6AD',
    alignItems: 'center',
    paddingLeft: 12,
  },
  iconback: {
    marginRight: '32%',
  },
  textNotification: {
    fontSize: 25,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  videoPlayer: {
    width: 150,
    height: 268,
    borderRadius: 12,
    //  marginBottom:60,
  },
  contentVideo: {
    // marginLeft:30,
    // marginTop:20,
  },
});
