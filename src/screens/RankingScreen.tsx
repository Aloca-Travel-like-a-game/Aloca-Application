import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native-animatable';
import axios from 'axios';

export default function RankingScreen({navigation}: any) {
  const [data, setData] = useState<any>([]);
  const [selectedButton, setSelectedButton] = useState<string>('Theo Điểm');
  const handleButtonPress = (buttonName: string) => {
    setSelectedButton(buttonName);
  };
  const getWeeklyData = async () => {
    const response = await axios.get(
      'http://52.63.147.17:8080/rankings/weekly',
    );
    setData(response.data);
    // console.log('week', response.data);
  };
  const getMonthlyData = async () => {
    const response = await axios.get(
      'http://52.63.147.17:8080/rankings/monthly',
    );
    setData(response.data);
    // console.log('month',response.data);
  };
  const getHighestData = async () => {
    const response = await axios.get(
      'http://52.63.147.17:8080/rankings/rankingUserHighest',
    );
    setData(response.data);
    // console.log('high',response.data);
  };
  useEffect(() => {
    getHighestData();
  }, []);
  return (
    <View style={styles.containerContent}>
      <View style={styles.headerRanking}>
        <Image
          source={require('../Images/imageRanking.png')}
          style={styles.backgroundRanking}
        />
        <Text style={styles.text}>
          {' '}
          Chào mừng bạn đến với cuộc {'\n'} đua của Aloca
        </Text>
      </View>
      <View style={styles.option}>
        <TouchableOpacity
          style={[styles.contentbuttonTitle, selectedButton === 'Theo Tuần' && styles.selectedButton]}
          onPress={() => {
            handleButtonPress('Theo Tuần');
            getWeeklyData();
          }}>
          <Text style={styles.buttonTitle}>Theo Tuần </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.contentbuttonTitle, selectedButton === 'Theo Tháng' && styles.selectedButton]}
          onPress={() => {
            handleButtonPress('Theo Tháng');
            getMonthlyData();
          }}>
          <Text style={styles.buttonTitle}>Theo Tháng </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.contentbuttonTitle, selectedButton === 'Theo Điểm' && styles.selectedButton]}
          onPress={() => {
            handleButtonPress('Theo Điểm');
            getHighestData();
          }}>
          <Text style={styles.buttonTitle}> Điểm cao nhất</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentRanking}>
        {data && data.dataRankingUserHighest && (
          <FlatList
            data={data.dataRankingUserHighest}
            renderItem={({item}) => {
              return (
                <View style={styles.ShowdataRanking}>
                  <Image source={{uri: item.image}} style={styles.imageStyle} />
                  <View style={styles.textContainer}>
                    <Text style={styles.textname}>{item.fullname}</Text>
                    <Text style={styles.textexperience}>{item.experience} điểm</Text>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.textContent}
        onPress={() => navigation.navigate('Trang chủ')}>
        <Text style={styles.textcontinue}>TIẾP TỤC </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  containerContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  textTitle: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: 100,
    height: 40,
  },
  text: {
    color: '#2AB6AD',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  selectedBackground: {
    backgroundColor: '#2AB6AD',
  },
  backgroundRanking: {
    alignSelf: 'center',
    width: 352,
    height:200,
  },
  contentRanking: {
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: '#2AB6AD',
    flex: 0.95,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#455A64',
  },
  textContent: {
    borderWidth: 1,
    borderColor: '#2AB6AD',
    backgroundColor: '#2AB6AD',
    width: 350,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  textcontinue: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  textexperience: {
    color: '#FFFFFF',
    fontSize: 14,
    width: 60,
  },
  textname: {
    color: '#FFFFFF',
    fontSize: 14,
    width:100,
  },
  imageStyle: {
    width: 50,
    height: 50,
    backgroundColor: '#2AB6AD',
    borderRadius: 50,
    margin: 10,
  },
  ShowdataRanking: {
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center',
    marginVertical: 5,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop:10,
  },
  buttonTitle: {
    color: '#FFFFFF',
  },
  contentbuttonTitle: {
    borderWidth: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor:'#455A64',
    borderColor:'#455A64',
  },
  selectedButton: {
    backgroundColor: '#2AB6AD',
    borderColor:'#2AB6AD',
  },
  headerRanking:{
    // marginTop:10,
  }
});
