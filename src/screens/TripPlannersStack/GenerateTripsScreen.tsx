/* eslint-disable react-native/no-inline-styles */
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
  Modal,
  ImageBackground,
  TextInput,
  Pressable,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useNavigation, useRoute} from '@react-navigation/native';
import {KeyboardAvoidingView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GenerateTripsScreen = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [planName, onChangePlanName] = useState('');
  const [planConfirm, setPlanConfirm] = useState<any>();
  const [token, setToken] = useState<any>();
  const route = useRoute();
  const navigation = useNavigation<any>();

  const {location, quantity, budget, areaTypes, days, startDate, endDate}: any =
    route.params;
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
  useEffect(() => {
    AsyncStorage.getItem('AccessToken').then((result: any) => setToken(result));
  });
  const retryRequest = () => {
    sendRequest(location, quantity, budget, areaTypes, days);
  };

  const PickUpPlan = async (item: any) => {
    console.log(item);
    try {
      setLoading(true);
      const res = await axios.post(
        'http://52.63.147.17:8080/trip-plan/save-trip',
        {
          jsonTrip: item.planConfirm,
          location: location,
          startDate: startDate,
          endDate: endDate,
          nameTrip: item.planName,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      navigation.navigate('DetailTripScreen', {
        idTrip: res.data.tripId,
      });
    } catch (error) {
      console.error('Lỗi:', error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const renderActivity = ({item: activity}: any) => (
    <View>
      <Text
        style={{
          ...styles.text,
          marginLeft: 5,
        }}>{`- ${activity.challenge_summary}`}</Text>
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
        keyExtractor={(activity:any) => activity.challenge_summary}
        renderItem={renderActivity}
      />
    </View>
  );

  const renderPlan = ({item: plan}: any, index: number) => (
    <View style={styles.planView}>
      <Text style={styles.heading}>{`Kế hoạch ${index} - ${location}`}</Text>
      <FlatList
        style={{gap: 5}}
        data={Object.values(plan)}
        keyExtractor={(item:any, index:any) => item + index.toString()}
        renderItem={(item:any) => renderDay(item, item.index + 1)}
      />
      <TouchableOpacity
        style={styles.sendBtn}
        onPress={() => {
          setModalVisible(true);
          if (plan !== undefined) {
            setPlanConfirm(Object.values(plan));
          }
        }}>
        <View>
          <Text
            style={{
              color: '#fff',
              fontWeight: '500',
            }}>
            Chọn kế hoạch này
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    // <TouchableWithoutFeedback>
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        {loading && (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={100} color="#2AB6AD" />
            <Text style={{color: '#2AB6AD', fontSize: 30, fontWeight: '900'}}>
              Vui lòng chờ
            </Text>
          </View>
        )}
        {!loading && result && (
          <FlatList
            ListHeaderComponent={
              <Modal
                style={{backgroundColor: 'black', width: '100%'}}
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Pressable
                  onPress={() => setModalVisible(!modalVisible)}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'black',
                    opacity: 0.4,
                  }}
                />
                <View style={styles.nameForTripForm}>
                  <Text style={styles.heading}>Đặt tên cho kế hoạch</Text>
                  <TextInput
                    onChangeText={onChangePlanName}
                    style={styles.input}
                  />
                  <View
                    style={{
                      alignSelf: 'flex-end',
                      width: '50%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Text
                        style={{
                          ...styles.btn,
                          ...styles.sdHeading,
                          color: '#fff',
                        }}>
                        Hủy
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={async () => {
                        if (
                          planName === '' ||
                          planName === null ||
                          planName.trim() === ''
                        ) {
                          Alert.alert('Vui lòng nhập tên kế hoạch');
                        } else {
                          PickUpPlan({planName, planConfirm});
                          onChangePlanName('');
                          setPlanConfirm(null);
                          setModalVisible(!modalVisible);
                        }
                      }}>
                      <Text
                        style={{
                          ...styles.btn,
                          ...styles.sdHeading,
                          color: '#fff',
                        }}>
                        Xác nhận
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            }
            style={{zIndex: 2, gap: 10, width: '100%'}}
            data={Object.values(result)}
            keyExtractor={(item:any, index:any) => item + index.toString()}
            renderItem={(item:any) => renderPlan(item, item.index + 1)}
          />
        )}
        {!loading && !result && (
          <ImageBackground
            style={{
              width: '100%',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            source={require('../../Images/ErrBackGround.png')}>
            <Text style={{color: '#2AB6AD', fontSize: 35, fontWeight: '900'}}>
              Gặp sự cố rồi bạn ơi!
            </Text>
            <Image
              style={{
                width: 200,
                height: 220,
                alignSelf: 'center',
              }}
              source={require('../../Images/Sorry.png')}
            />
            <TouchableOpacity onPress={retryRequest}>
              <Text style={styles.retryBtn}>Thử lại</Text>
            </TouchableOpacity>
          </ImageBackground>
        )}
      </KeyboardAvoidingView>
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
