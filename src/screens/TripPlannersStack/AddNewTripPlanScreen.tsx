/* eslint-disable react-native/no-inline-styles */
import React, {FC, useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, TouchableOpacity, Text, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {convertDatetoString2} from '../../Helper/convertDate';

export const TripPlanScreen: FC = (): JSX.Element => {
  const [token, setToken] = useState<string>();
  const [result, setResult] = useState<any>(null);
  useEffect(() => {
    AsyncStorage.getItem('AccessToken').then((tokenSave: any) =>
      setToken(tokenSave),
    );
  }, [token]);

  useEffect(() => {
    if (token !== undefined) {
      console.log('ab', token);
      const senRequest = async () => {
        try {
          const APIurl = 'http://52.63.147.17:8080/trip-plan/get-trip';
          const res = await axios.get(APIurl, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          });
          setResult(res.data.dataTrip);
          console.log(res.data.dataTrip);
        } catch {
          (e: any) => console.log(e);
        }
      };
      senRequest();
    }
  }, [token]);
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
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
        }
        style={{flex: 1}}
        data={result}
        renderItem={({item}:any) => (
          <TouchableOpacity
            style={styles.trip}
            onPress={() => {
              navigation.navigate('DetailTripScreen', {
                idTrip: item._id,
              });
            }}>
            <Text style={{color: '#000', marginTop: 5, fontWeight: '600'}}>
              {item.location}
            </Text>
            <Text style={{color: '#000', marginTop: 5, fontWeight: '600'}}>
              {item.nameTrip}
            </Text>
            <Text
              style={{
                color: '#000',
                marginTop: 5,
                fontWeight: '600',
              }}>
              {`${convertDatetoString2(item.startDate)}-${convertDatetoString2(item.endDate)}`}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item:any, index:any) => item.nameTrip + index.toString()}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
