import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {ipAddress} from '../Helper/ip';
interface Top{
  a: any;
  b: any;
  experience:number;
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
      setTopThree(res);
    }
  }, [data]);
  return (
    <View style={styles.containerContent}>
      <View style={styles.headerRanking}>
        <Image
          source={require('../Images/imageRanking.png')}
          style={styles.backgroundRanking}
        />
        <Text style={styles.text}>
          Chào mừng bạn đến với cuộc {'\n'} đua của Aloca
        </Text>
      </View>
      <View style={styles.contentop}>
        <FlatList
          data={topThree}
          renderItem={({item}) => (
            <View style={styles.dataTop}>
              <Image
                source={{uri: item.image}}
                style={styles.imageTop}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
        />
      </View>
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
          renderItem={({item}) => {
            return (
              <View style={styles.ShowdataRanking}>
                <Image source={{uri: item.image}} style={styles.imageStyle} />
                <View style={styles.textContainer}>
                  <Text style={styles.textname}>{item?.fullname}</Text>
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
    height: 200,
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
    width: 100,
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
    justifyContent: 'space-around',
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
    marginTop: 10,
  },
  imgeRank: {
    position: 'absolute',
    width: 80,
    height: 75,
    marginTop: 130,
    alignSelf: 'center',
    backgroundColor: 'red',
    borderRadius: 50,
  },
  imgeRankTop: {
    position: 'absolute',
    width: 70,
    height: 40,
    marginTop: 170,
    alignSelf: 'center',
  },
  imgeRank2: {
    position: 'absolute',
    width: 60,
    height: 55,
    marginTop: 150,
    left: 70,
  },
  imgeRankTop2: {
    position: 'absolute',
    width: 60,
    height: 30,
    marginTop: 179,
    left: 77
  },
  imgeRank3: {
    position: 'absolute',
    width: 60,
    height: 55,
    marginTop: 150,
    left: 250,
  },
  imgeRankTop3: {
    position: 'absolute',
    width: 60,
    height: 35,
    marginTop: 175,
    left: 250,
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
  dataTop:{
  margin:10,
  },
  imageTop:{
    width:65,
    height:65,
    borderRadius:50,
  },
  contentop:{
    position:'absolute',
    top:'18%',
   alignSelf:'center',
  }
});
