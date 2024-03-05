/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-shadow */
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  FlatList,
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
  // console.log(loading);
  // console.log(result);
  const renderActivity = ({item: activity}: any) => (
    <View>
      <Text>{`- ${activity.challenge_summary}`}</Text>
      <Text>{`  Địa chỉ: ${activity.google_maps_address}`}</Text>
      <Text>{`  Độ khó: ${activity.level_of_difficult}`}</Text>
    </View>
  );

  const renderDay = ({item: day}: any) => (
    <View>
      <Text>{`${day.title}`}</Text>
      <FlatList
        data={day.activities}
        keyExtractor={activity => activity.challenge_summary}
        renderItem={renderActivity}
      />
      <Text>{`Chi phí di chuyển: ${day.transportCost}`}</Text>
      <Text>{`Chi phí ăn uống: ${day.foodCost}`}</Text>
    </View>
  );

  const renderPlan = ({ item: plan }: any, index: number) => (
    <View>
      <Text>{`Kế hoạch: ${index}`}</Text>
      <FlatList
        style={{backgroundColor: '#2AB6AD'}}
        data={Object.values(plan)}
        keyExtractor={(item, index) => item + index.toString()}
        renderItem={renderDay}
      />
    </View>
  );

  return (
    <View style={{flex: 1}}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {result && (
        <View style={{flex: 1}}>
          <FlatList
            data={Object.values(result)}
            keyExtractor={(item, index) => item + index.toString()}
            renderItem={item => renderPlan(item, item.index + 1)}
          />
        </View>
      )}
      {!loading && !result && (
        <View>
          <TouchableOpacity onPress={retryRequest}>
            <Text>Thử lại</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

// const styles = StyleSheet.create({
//   lottie: {
//     width: 100,
//     height: 100,
//   },
// });
