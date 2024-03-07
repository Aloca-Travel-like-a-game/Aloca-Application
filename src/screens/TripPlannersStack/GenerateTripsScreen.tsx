/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-shadow */
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';

export const GenerateTripsScreen = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const route = useRoute();
  const {location, quantity, budget, areaTypes, days}: any = route.params;
  const APIurl = 'http://52.63.147.17:8080/trip-plan/';

  const sendRequest = async (
    loca: any,
    numPeople: number,
    bud: any,
    interests: any,
    numDay: number | undefined,
  ) => {
    try {
      setLoading(true);
      const res = await axios.post(APIurl, {
        location: loca,
        numberOfPeople: numPeople,
        budget: bud,
        interest: interests,
        userLocation: 'Đà Nẵng',
        numberOfDay: numDay,
      });
      setResult(res.data.data);
    } catch (error) {
      console.error('Lỗi:', error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    sendRequest(location, quantity, budget, areaTypes, days);
  }, [location, quantity, budget, areaTypes, days]);

  const retryRequest = () => {
    sendRequest(location, quantity, budget, areaTypes, days);
  };

  const renderActivity = ({item: activity}: any) => (
    <View>
      <Text style={styles.text}>{`${activity.challenge_summary}`}</Text>
    </View>
  );

  const renderDay = ({item: day}: any, index: number) => (
    <View style={styles.dayView}>
      <Text
        style={{
          ...styles.text,
          ...styles.sdHeading,
        }}>{`Ngày ${index} - ${day.title}`}</Text>
      <FlatList
        data={day.activities}
        keyExtractor={activity => activity.challenge_summary}
        renderItem={renderActivity}
      />
    </View>
  );

  const renderPlan = ({item: plan}: any, index: number) => (
    <View style={styles.planView}>
      <Text style={styles.heading}>{`Kế hoạch ${index}`}</Text>
      <FlatList
        style={{gap: 5}}
        data={Object.values(plan)}
        keyExtractor={(item, index) => item + index.toString()}
        renderItem={item => renderDay(item, item.index + 1)}
      />
      <TouchableOpacity style={styles.sendBtn}>
        <Text
          style={{
            color: '#fff',
            fontWeight: '500',
          }}>
          Chọn kế hoạch này
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {loading && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={100} color="#2AB6AD" />
          <Text style={{color: '#2AB6AD', fontSize: 30, fontWeight: '900'}}>
            Vui lòng chờ
          </Text>
        </View>
      )}
      {result && (
        <FlatList
          style={{gap: 10}}
          data={Object.values(result)}
          keyExtractor={(item, index) => item + index.toString()}
          renderItem={item => renderPlan(item, item.index + 1)}
        />
      )}
      {!loading && !result && (
        <View>
          <Text style={{color: '#2AB6AD', fontSize: 30, fontWeight: '900'}}>
            Gặp sự cố rồi bạn ơi
          </Text>
          <Image source={require('../../Images/sorry.png')} />
          <TouchableOpacity onPress={retryRequest}>
            <Text
              style={{
                color: '#2AB6AD',
                fontSize: 30,
                fontWeight: '900',
                alignSelf: 'center',
                textDecorationLine: 'underline',
              }}>
              Thử lại
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  planView: {
    margin: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#2AB6AD',
    borderRadius: 10,
    padding: 15,
  },
  heading: {
    color: '#2AB6AD',
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 10,
  },
  sdHeading: {fontWeight: '600'},
  dayView: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
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
});
