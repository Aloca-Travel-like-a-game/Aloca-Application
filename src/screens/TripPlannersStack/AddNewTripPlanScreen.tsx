/* eslint-disable react-native/no-inline-styles */
import React, {FC, useEffect, useRef, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  ScrollView,
  Dimensions,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {convertDatetoString2} from '../../Helper/convertDate';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ipAddress } from '../../Helper/ip';

export const TripPlanScreen: FC = (): JSX.Element => {
  const [token, setToken] = useState<string>();
  const [result, setResult] = useState<any>(null);
  const [itemDelete, setItemDelete] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem('AccessToken').then((tokenSave: any) =>
      setToken(tokenSave),
    );
  }, []);

  const sendRequest = async (tokenAccess: string) => {
    setLoading(true);
    try {
      const APIurl = `http://${ipAddress}:8080/trip-plan/get-trip`;
      const res = await axios.get(APIurl, {
        headers: {
          Authorization: 'Bearer ' + tokenAccess,
        },
      });
      setResult(res.data.dataTrip);
      // console.log(res.data.dataTrip);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const deleteRequest = async (tokenAccess: string, id: string) => {
    try {
      console.log(tokenAccess);
      const APIurl = `http://${ipAddress}:8080/trip-plan/` + id;
      const res = await axios.delete(APIurl, {
        headers: {
          Authorization: 'Bearer ' + tokenAccess,
        },
      });
      console.log(res.data.message);
      sendRequest(tokenAccess);
    } catch (e) {
      console.log(e);
    }
  };

  const navigation = useNavigation<any>();

  useFocusEffect(
    React.useCallback(() => {
      // Call your API or any function to refresh data here
      if (token && token !== undefined) {
        sendRequest(token);
      }
    }, [token]),
  );

  const flatList = useRef<FlatList | null>(null);
  return (
    <View style={styles.container}>
      <View style={styles.addNewTrip}>
        <TouchableOpacity
          style={styles.plusCircle}
          onPress={() => navigation.navigate('TripPlanChoose')}>
          <AntDesign name="pluscircle" size={47} color={'#2AB6AD'} />
        </TouchableOpacity>
        <Text style={{color: '#000', marginTop: 5, fontWeight: '600'}}>
          Thêm mới một kế hoạch
        </Text>
      </View>
      {result && (
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: '#000',
              marginTop: 10,
              marginLeft: '5%',
              fontWeight: '600',
              fontSize: 20,
            }}>
            Kế hoạch đã tạo:
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (token !== undefined) {
                sendRequest(token);
              }
            }}>
            <Text
              style={{
                color: '#2AB6AD',
                marginTop: 10,
                marginLeft: '5%',
                fontWeight: '600',
                fontSize: 20,
              }}>
              Làm mới
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {loading && (
        <View style={{flex: 1, alignItems: 'center'}}>
          <ActivityIndicator size={30} color="#2AB6AD" />
        </View>
      )}
      {!loading && (
        <FlatList
          ListHeaderComponent={
            <Modal
              style={{zIndex: 2, backgroundColor: 'black', width: '100%'}}
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
              <View style={styles.confirmDelete}>
                <Text
                  style={{
                    width: '100%',
                    color: '#2AB6AD',
                    fontWeight: '600',
                    fontSize: 19.9,
                    marginBottom: 10,
                    alignSelf: 'center',
                    textAlign: 'center',
                  }}>
                  {`Bạn có chắc muốn xóa kế hoạch ${itemDelete?.nameTrip}`}
                </Text>
                <View
                  style={{
                    alignSelf: 'flex-end',
                    width: '50%',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    gap: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text
                      style={{
                        ...styles.btn,
                        fontWeight: '600',
                        color: '#2AB6AD',
                        borderColor: '#2AB6AD',
                        backgroundColor: '#fff',
                        borderWidth: 1,
                      }}>
                      Hủy
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (token !== undefined) {
                        deleteRequest(token, itemDelete._id);
                        sendRequest(token);
                      }
                      setModalVisible(!modalVisible);
                    }}>
                    <Text
                      style={{
                        ...styles.btn,
                        fontWeight: '600',
                        color: '#fff',
                      }}>
                      Xác nhận
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          }
          ref={flatList}
          style={{flex: 1, marginBottom: 15}}
          data={result}
          renderItem={({item}: any) => (
            <View style={{display: item.status === 'active' ? 'flex' : 'none'}}>
              <TouchableOpacity
                style={styles.trip}
                onPress={() => {
                  navigation.navigate('DetailTripScreen', {
                    idTrip: item._id,
                  });
                }}>
                <Text style={{...styles.text, fontWeight: '600'}}>
                  {item.nameTrip}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '60%',
                    gap: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 15,
                      flex: 1,
                    }}>
                    {[
                      'Bà Rịa Vũng Tàu',
                      'TP. Hồ Chí Minh',
                      'Thừa Thiên Huế',
                    ].includes(item.location) ? (
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        <Animatable.Text
                          animation={{
                            from: {translateX: 0},
                            to: {translateX: -20},
                          }}
                          duration={1000}
                          iterationCount="infinite"
                          easing="linear"
                          direction="alternate"
                          style={styles.text}>
                          {item.location}
                        </Animatable.Text>
                      </ScrollView>
                    ) : (
                      <Text style={{color: '#000'}}>{item.location}</Text>
                    )}
                    <Text style={styles.text}>
                      {`${convertDatetoString2(item.startDate).slice(
                        0,
                        -5,
                      )} - ${convertDatetoString2(item.endDate).slice(0, -5)}`}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true);
                      console.log(modalVisible);
                      setItemDelete(item);
                    }}>
                    <Ionicons name="trash" size={20} color="#2AB6AD" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          )}
          inverted
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}
          keyExtractor={(item: any, index: any) =>
            item.nameTrip + index.toString()
          }
          onContentSizeChange={() => {
            if (flatList.current !== null) {
              flatList.current.scrollToEnd();
            }
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addNewTrip: {
    marginTop: 15,
    height: 100,
    width: '90%',
    borderRadius: 20,
    borderColor: '#2AB6AD',
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusCircle: {
    width: 47,
    height: 47,
  },
  trip: {
    padding: 15,
    width: '90%',
    borderRadius: 15,
    borderColor: '#2AB6AD',
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
  text: {
    color: '#000',
  },
  confirmDelete: {
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
    right: Dimensions.get('window').width / 2 - 145,
    top: Dimensions.get('window').height / 2 - 80,
  },
  btn: {
    backgroundColor: '#2AB6AD',
    padding: 10,
    borderRadius: 10,
  },
});
