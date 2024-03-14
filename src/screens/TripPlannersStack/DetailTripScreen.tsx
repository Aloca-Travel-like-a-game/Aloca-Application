/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {FC, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  // Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import {datatest} from './datatest';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {Camera, useCameraDevice} from 'react-native-vision-camera';

export const DetailTripScreen: FC = (): JSX.Element => {
  const [selectDay, setselectDay] = useState<string[]>([]);

  const device = useCameraDevice('front', {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera',
    ],
  });

  const handleSelectChange = (item: string) => {
    const isselectDay = selectDay.includes(item);
    if (isselectDay) {
      setselectDay((prevselectDay: any[]) =>
        prevselectDay.filter((selectDayItem: string) => selectDayItem !== item),
      );
    } else {
      setselectDay((prevselectDay: any) => [...prevselectDay, item]);
    }
  };

  const renderActivity = ({item: activity}: any) => (
    <View style={{flexDirection: 'row', marginVertical: 5}}>
      <View style={{flex: 2}}>
        <Text style={styles.text}>{`${activity.challenge_summary}`}</Text>

        <ScrollView
          style={{marginLeft: 10}}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <Animatable.Text
            animation={{
              from: {translateX: 200},
              to: {translateX: -500},
            }}
            duration={8000}
            iterationCount="infinite"
            easing="linear"
            style={{
              ...styles.text,
              fontWeight: '200',
            }}>
            {`${activity.google_maps_address}`}
          </Animatable.Text>
        </ScrollView>
        <Text
          style={{
            ...styles.text,
            fontWeight: '200',
            alignSelf: 'flex-end',
          }}>{`${activity.level_of_difficult}`}</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity>
          <Text style={{...styles.text, ...styles.btn}}>Thêm ảnh</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const renderDay = ({item: day}: any, index: number) => (
    <View style={styles.dayView}>
      <TouchableOpacity
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onPress={() => {
          handleSelectChange(index.toString());
        }}>
        <Text
          style={{
            ...styles.text,
            ...styles.sdHeading,
            maxWidth: '90%',
          }}>{`${day.title}`}</Text>
        <Ionicons
          name={
            selectDay.includes(index.toString()) ? 'caret-up' : 'caret-down'
          }
          size={20}
          color={'#aaa'}
        />
      </TouchableOpacity>

      {selectDay.includes(index.toString()) && (
        <FlatList
          data={day.activities}
          keyExtractor={(activity: {challenge_summary: any}) =>
            activity.challenge_summary
          }
          renderItem={renderActivity}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <ImageBackground
            style={{
              width: '100%',
              height: 200,
              marginVertical: 15,
              justifyContent: 'flex-end',
            }}
            resizeMode="cover"
            source={require('../../Images/location.png')}>
            <TouchableOpacity style={{...styles.btn, flexDirection: 'row'}}>
              <Text>Xem bản đồ</Text>
              <Ionicons name="map" size={20} color="#fff" />
            </TouchableOpacity>
            <LinearGradient
              colors={['#00000000', '#000000']}
              style={{
                height: '50%',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                paddingHorizontal: 20,
                paddingBottom: 20,
              }}>
              <Text style={styles.heading}>Đà Nẵng</Text>
              <Text style={{...styles.heading, fontWeight: '200'}}>
                15/1/2024 - 18/1/2024
              </Text>
            </LinearGradient>
          </ImageBackground>
        }
        style={{margin: 0, paddingHorizontal: 15, gap: 5}}
        data={Object.values(datatest)}
        keyExtractor={(item: any, index: {toString: () => any}) =>
          item + index.toString()
        }
        renderItem={(item: {index: number}) => renderDay(item, item.index + 1)}
      />
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        photo={true}
        isActive={true}>
        <TouchableOpacity>
          <Text>Thêm ảnh</Text>
        </TouchableOpacity>
      </Camera>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  heading: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 20,
  },
  sdHeading: {fontWeight: '600'},
  dayView: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 5,
    shadowOpacity: 3,
    shadowColor: 'gray',
  },
  text: {
    color: '#000',
  },
  sendBtn: {
    backgroundColor: '#2AB6AD',
    padding: 10,
    borderRadius: 10,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
  nameForTripForm: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderColor: '#2AB6AD',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    opacity: 1,
    left: Dimensions.get('window').width / 2 - 145,
    top: Dimensions.get('window').height / 2 - 100,
  },
  input: {
    height: 40,
    width: 250,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    marginBottom: 5,
    paddingLeft: 15,
    alignSelf: 'center',
    color: '#000',
  },
  btn: {
    backgroundColor: '#2AB6AD',
    padding: 10,
    borderRadius: 10,
  },
  retryBtn: {
    color: '#2AB6AD',
    fontSize: 30,
    fontWeight: '900',
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2AB6AD',
    marginTop: 10,
  },
});
