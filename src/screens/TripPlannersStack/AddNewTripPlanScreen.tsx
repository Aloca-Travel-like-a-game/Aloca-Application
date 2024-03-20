/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect, useRef, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { convertDatetoString2 } from '../../Helper/convertDate';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const TripPlanScreen: FC = (): JSX.Element => {
  const [token, setToken] = useState<string>();
  const [result, setResult] = useState<any>(null);
  useEffect(() => {
    AsyncStorage.getItem('AccessToken').then((tokenSave: any) =>
      setToken(tokenSave),
    );
  }, [token]);
  useEffect(() => {
    if (token && token !== undefined) {
      senRequest(token);
    }
  }, [result, token]);

  const senRequest = async (tokenAccess: string) => {
    try {
      const APIurl = 'http://www.aloca.dns-dynamic.net:8080/trip-plan/get-trip';
      const res = await axios.get(APIurl, {
        headers: {
          Authorization: 'Bearer ' + tokenAccess,
        },
      });
      setResult(res.data.dataTrip);
    } catch {
      (e: any) => console.log(e);
    }
  };

  const navigation = useNavigation<any>();
  const flatList = useRef<FlatList | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.addNewTrip}>
        <TouchableOpacity
          style={styles.plusCircle}
          onPress={() => navigation.navigate('TripPlanChoose')}>
          <AntDesign name="pluscircle" size={47} color={'#2AB6AD'} />
        </TouchableOpacity>
        <Text style={{ color: '#000', marginTop: 5, fontWeight: '600' }}>
          Thêm mới một kế hoạch
        </Text>
      </View>
      {result && (
        <View style={{ flexDirection: 'row' }}>
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
                senRequest(token);
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
      <FlatList
        ref={flatList}
        style={{ flex: 1, marginBottom: 15 }}
        data={result}
        renderItem={({ item }: any) => (
          <View>
            <TouchableOpacity
              style={styles.trip}
              onPress={() => {
                navigation.navigate('DetailTripScreen', {
                  idTrip: item._id,
                });
              }}>
              <Text style={{ ...styles.text, fontWeight: '600' }}>
                {item.nameTrip}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '60%',
                  gap: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
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
                          from: { translateX: 0 },
                          to: { translateX: -20 },
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
                    <Text style={{ color: '#000' }}>{item.location}</Text>
                  )}
                  <Text style={styles.text}>
                    {`${convertDatetoString2(item.startDate).slice(
                      0,
                      -5,
                    )} - ${convertDatetoString2(item.endDate).slice(0, -5)}`}
                  </Text>
                </View>
                <TouchableOpacity>
                  <Ionicons name="trash" size={20} color="#EB4335" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        )}
        inverted
        keyExtractor={(item: any, index: any) =>
          item.nameTrip + index.toString()
        }
        onContentSizeChange={() => {
          if (flatList.current !== null) {
            flatList.current.scrollToEnd();
          }
        }}
      />
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
});
