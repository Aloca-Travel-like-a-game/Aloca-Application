/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-sequences */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {FC, useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import {provices} from './provices';
import {FlatList} from 'react-native';
import {removeVietnameseTones} from '../../Helper/removeVietNamTone';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const TripPlanChoose: FC = (): JSX.Element => {
  const [location, onChangeLocation] = useState('');
  const [proviceShow, setProviceShow] = useState(false);
  const useSearch = (string: string) => {
    const provicesFilter = provices.filter(
      value =>
        removeVietnameseTones(value.toLowerCase()).includes(
          string.toLowerCase(),
        ) || value.toLowerCase().includes(string.toLowerCase()),
    );
    return provicesFilter;
  };
  const Item = ({title}: any) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => {
        onChangeLocation(title), setProviceShow(!proviceShow);
      }}>
      <Text style={{...styles.sdHeader, fontSize: 14, fontWeight: '400'}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <TouchableWithoutFeedback
        style={{flex: 1, backgroundColor: 'red'}}
        onPress={Keyboard.dismiss}
        accessible={false}>
        <View style={styles.container}>
          <Text style={styles.header}>Lên kế hoạch cho chuyến đi của bạn</Text>
          <View>
            <Text style={styles.sdHeader}>Đâu sẽ là nơi bạn đến</Text>
            <View
              style={{
                height: 40,
                width: 250,
                alignSelf: 'center',
                marginBottom: 5,
              }}>
              <TextInput
                placeholder="Nơi bạn sẽ tới là?"
                placeholderTextColor={'#aaa'}
                style={styles.input}
                onChangeText={onChangeLocation}
                value={location}
                onFocus={() => {
                  setProviceShow(true);
                }}
              />
              <TouchableOpacity
                style={styles.dropdownBtn}
                onPress={() => {
                  setProviceShow(!proviceShow);
                  onChangeLocation('');
                }}>
                <Ionicons
                  name={proviceShow ? 'caret-up' : 'caret-down'}
                  size={15}
                  color={'#aaa'}
                />
              </TouchableOpacity>
            </View>
            {proviceShow ? (
              <FlatList
                data={useSearch(location)}
                renderItem={({item}) => <Item title={item} />}
                keyExtractor={item => item}
                style={styles.dropdown}
              />
            ) : null}
            <TextInput
              inputMode="none"
              placeholder="Ngày đi, ngày về"
              placeholderTextColor={'#aaa'}
              style={styles.input}
            />
          </View>
          <View>
            <Text style={styles.sdHeader}>
              Kế hoạch lên cho bao nhiêu người
            </Text>
            <TextInput
              inputMode="none"
              placeholder="Ngày đi, ngày về"
              placeholderTextColor={'#aaa'}
              style={styles.input}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderColor: '#2AB6AD',
    margin: 10,
    borderWidth: 1,
    padding: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: '500',
    color: '#2AB6AD',
    alignSelf: 'center',
    marginBottom: 15,
  },
  sdHeader: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    marginBottom: 5,
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
  dropdownBtn: {
    position: 'absolute',
    right: 0,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    maxHeight: 150,
    marginBottom: 5,
    width: 230,
    alignSelf: 'center',
  },
  option: {
    height: 40,
    paddingLeft: 15,
    justifyContent: 'center',
    borderColor: '#aaa',
    borderBottomWidth: 1,
  },
});
