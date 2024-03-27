/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {ipAddress} from '../Helper/ip';
interface Top {
  a: any;
  b: any;
  experience: number;
}
export default function RankingScreen() {
  const [data, setData] = useState<any>([]);
  const [topThree, setTopThree] = useState<any[]>([]);
  const [selectedButton, setSelectedButton] = useState<string>('Theo Điểm');
  const handleButtonPress = async (buttonName: string) => {
    setSelectedButton(buttonName);
    switch (buttonName) {
      case 'Theo Tuần':
        await getWeeklyData();
        break;
      case 'Theo Tháng':
        await getMonthlyData();
        break;
      case 'Theo Điểm':
        await getHighestData();
        break;
      default:
        break;
    }
  };
  const getWeeklyData = async () => {
    const response = await axios.get(
      `http://${ipAddress}:8080/rankings/weekly`,
    );
    setData(response.data);
  };
  const getMonthlyData = async () => {
    const response = await axios.get(
      `http://${ipAddress}:8080/rankings/monthly`,
    );
    setData(response.data);
  };
  const getHighestData = async () => {
    const response = await axios.get(
      `http://${ipAddress}:8080/rankings/rankingUserHighest`,
    );
    setData(response.data);
  };
  useEffect(() => {
    getHighestData();
  }, []);
  useEffect(() => {
    let dataTop: Top[] = [];
    if (data && data.dataRanks) {
      dataTop = data.dataRanks;
      dataTop.sort((a, b) => b.experience - a.experience);
      const res = dataTop.slice(0, 3);
      // Sửa vị trí của phần tử lớn nhất để đứng ở vị trí thứ hai
      if (res.length >= 2) {
        const temp = res[0];
        res[0] = res[1];
        res[1] = temp;
        setTopThree(res);
      }
    }
  }, [data]);
  return (
    <View style={styles.containerContent}>
      <View style={styles.headerRanking}>
        <ImageBackground
          source={require('../Images/imageRanking.png')}
          style={styles.backgroundRanking}>
          <Image
            source={require('../Images/topRanking.png')}
            style={styles.imgeRankTop}
          />
          <Image
            source={require('../Images/top3ranking.png')}
            style={styles.imgeRankTop2}
          />
          <Image
            source={require('../Images/top2ranking.png')}
            style={styles.imgeRankTop3}
          />
        </ImageBackground>
        <Text style={styles.text}>
          Chào mừng bạn đến với cuộc {'\n'} đua của Aloca
        </Text>
      </View>
      <View style={styles.contentop}>
        <FlatList
          data={topThree}
          renderItem={({item, index}) => (
            <View style={styles.dataTop}>
              <Image
                source={{uri: item.image}}
                style={
                  index === 1
                    ? {...styles.imageTop, width: 80, height: 80}
                    : styles.imageTop
                }
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
        />
      </View>

      <View style={styles.option}>
        <TouchableOpacity
          style={[
            styles.contentbuttonTitle,
            selectedButton === 'Theo Tuần' && styles.selectedButton,
          ]}
          onPress={() => {
            handleButtonPress('Theo Tuần');
            getWeeklyData();
          }}>
          <Text style={styles.buttonTitle}>Theo Tuần </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.contentbuttonTitle,
            selectedButton === 'Theo Tháng' && styles.selectedButton,
          ]}
          onPress={() => {
            handleButtonPress('Theo Tháng');
            getMonthlyData();
          }}>
          <Text style={styles.buttonTitle}>Theo Tháng </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.contentbuttonTitle,
            selectedButton === 'Theo Điểm' && styles.selectedButton,
          ]}
          onPress={() => {
            handleButtonPress('Theo Điểm');
            getHighestData();
          }}>
          <Text style={styles.buttonTitle}> Điểm cao nhất</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentRanking}>
        <FlatList
          data={data.dataRanks}
          renderItem={({item, index}) => {
            return (
              <View style={styles.ShowdataRanking}>
                <Text style={{fontSize: 20, fontWeight: '500', marginLeft: 15}}>
                  {index + 1}
                </Text>
                <Image source={{uri: item.image}} style={styles.imageStyle} />
                <View style={styles.textContainer}>
                  <View style={{flexDirection: 'column'}}>
                    <Text
                      style={{
                        ...styles.textname,
                        fontWeight: 'normal',
                        fontSize: 14,
                      }}>
                      {item?.fullname}
                    </Text>
                    <Text style={styles.textname}>
                      {item.experience < 200 &&
                        item.experience >= 0 &&
                        'Tập sự'}
                      {item.experience < 500 &&
                        item.experience >= 200 &&
                        'Lữ khách phiêu lưu'}
                      {item.experience < 1000 &&
                        item.experience >= 500 &&
                        'Hiệp sĩ Khám phá'}
                      {item.experience < 2000 &&
                        item.experience >= 1000 &&
                        'Nhà thám hiểm siêu phàm'}
                    </Text>
                  </View>
                  <Text style={styles.textexperience}>
                    {item.experience} điểm
                  </Text>
                </View>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
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
    height: 210,
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
    alignSelf: 'center',
  },
  textname: {
    color: '#FFFFFF',
    fontSize: 12,
    maxWidth: '100%',
    fontWeight: '300',
  },
  imageStyle: {
    width: 50,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    margin: 10,
  },
  ShowdataRanking: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 5,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  imgeRankTop: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 75,
    zIndex: 2,
  },
  imgeRankTop2: {
    position: 'absolute',
    alignSelf: 'center',
    left: '18.5%',
    bottom: 60,
    zIndex: 2,
  },
  imgeRankTop3: {
    position: 'absolute',
    alignSelf: 'center',
    right: '18.5%',
    bottom: 60,
    zIndex: 2,
  },
  buttonTitle: {
    color: '#FFFFFF',
  },
  contentbuttonTitle: {
    borderWidth: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#455A64',
    borderColor: '#455A64',
  },
  selectedButton: {
    backgroundColor: '#2AB6AD',
    borderColor: '#2AB6AD',
  },
  headerRanking: {
    // marginTop:10,
  },
  dataTop: {
    margin: 6,
    alignSelf: 'flex-end',
  },
  imageTop: {
    width: 65,
    height: 65,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
  },
  contentop: {
    position: 'absolute',
    top: '18%',
    alignSelf: 'center',
  },
});
