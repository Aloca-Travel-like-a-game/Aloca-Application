/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-sequences */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {FC, useEffect, useState} from 'react';
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

import {provices} from '../../Helper/provices';
import {FlatList} from 'react-native';
import {removeVietnameseTones} from '../../Helper/removeVietNamTone';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import {addCommas, convertDatetoString} from '../../Helper/convertDate';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AreaTypes = [
  'Phù hợp với trẻ em',
  'Hoạt động ngoài trời',
  'Nghệ thuật & văn hóa',
  'Lịch sử',
  'Triển lãm',
  'Giải trí',
  'Mua sắm',
];

export const TripPlanChoose: FC = (): JSX.Element => {
  const navigation = useNavigation<any>();

  const [proviceShow, setProviceShow] = useState(false);
  const [isChoosingStartDate, setIsChoosingStartDate] = useState(true);
  const [showPicker, setShowPicker] = useState(false);
  const [showBudget, setShowBudget] = useState(false);

  const [location, onChangeLocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [quantity, setQuantity] = useState<any>(1);
  const [budget, setBudget] = useState<any>('');
  const [areaTypes, setAreaTypes] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<any>();

  const budgetList = [
    `Dưới ${addCommas(1000000 * quantity)} VND`,
    `${addCommas(1000000 * quantity)} VND - ${addCommas(
      5000000 * quantity,
    )} VND`,
    `${addCommas(5000000 * quantity)} VND - ${addCommas(
      15000000 * quantity,
    )} VND`,
  ];

  useEffect(() => {
    AsyncStorage.getItem('userLocation').then((result: any) =>
      setUserLocation(result),
    );
  });

  const useSearch = (string: string) => {
    const provicesFilter = provices.filter(
      value =>
        removeVietnameseTones(value.toLowerCase()).includes(
          string.toLowerCase(),
        ) || value.toLowerCase().includes(string.toLowerCase()),
    );
    return provicesFilter;
  };

  const ItemProvice = ({title}: any) => (
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

  const ItemBudget = ({title}: any) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => {
        setBudget(title), setShowBudget(!showBudget);
      }}>
      <Text style={{...styles.sdHeader, fontSize: 14, fontWeight: '400'}}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const ItemAreaType = ({title}: any) => {
    const handleSelectChange = (item: string) => {
      const isareaTypes = areaTypes.includes(item);
      if (isareaTypes) {
        setAreaTypes(prevareaTypes =>
          prevareaTypes.filter(areaTypesItem => areaTypesItem !== item),
        );
      } else {
        setAreaTypes(prevareaTypes => [...prevareaTypes, item]);
      }
    };

    return (
      <TouchableOpacity
        style={
          areaTypes.includes(title)
            ? {...styles.areaType, backgroundColor: '#2AB6AD'}
            : styles.areaType
        }
        onPress={() => {
          handleSelectChange(title);
        }}>
        <Text
          style={{
            color: areaTypes.includes(title) ? '#fff' : '#000',
            fontSize: 14,
            fontWeight: '400',
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleCalculateDateRange = (startDate: Date, endDate: Date) => {
    if (startDate > endDate) {
      Toast.show({
        type: 'error',
        text1: 'Thất bại',
        text2: 'Vui lòng chọn lại ngày',
      });
    } else {
      const days =
        Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
        ) + 1;
      return days;
    }
  };
  const DateRangePicker = () => {
    const handleDateChange = (selectedDate: Date) => {
      if (isChoosingStartDate) {
        if (
          new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000) < new Date()
        ) {
          Toast.show({
            type: 'error',
            text1: 'Thất bại',
            text2: 'Không được chọn trước ngày hôm nay',
          });
        } else {
          if (
            selectedDate.getDate() === new Date().getDate() &&
            new Date().getHours() >= 18
          ) {
            Toast.show({
              type: 'error',
              text1: 'Thất bại',
              text2: 'Hôm nay muộn quá bạn ơi',
            });
          } else {
            setStartDate(selectedDate);
          }
        }
      } else {
        if (selectedDate >= startDate) {
          setEndDate(selectedDate);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Thất bại',
            text2: 'Ngày về không được chọn trước ngày đi',
          });
        }
      }
    };

    return (
      <View style={{justifyContent: 'center'}}>
        <View
          style={{
            ...styles.input,
            borderWidth: 0,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 0,
          }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setIsChoosingStartDate(true);
              setShowPicker(true);
            }}>
            <Text style={{color: '#fff', fontWeight: '500'}}>
              Ngày đi: {convertDatetoString(startDate)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setIsChoosingStartDate(false);
              setShowPicker(true);
            }}>
            <Text style={{color: '#fff', fontWeight: '500'}}>
              Ngày về: {convertDatetoString(endDate)}
            </Text>
          </TouchableOpacity>
        </View>
        <DatePicker
          title={isChoosingStartDate ? 'Chọn ngày đi' : 'Chọn ngày về'}
          confirmText="Xác nhận"
          cancelText="Hủy"
          modal
          mode="date"
          locale="vi_Vietnamese"
          open={showPicker}
          date={isChoosingStartDate ? startDate : endDate}
          onConfirm={(date: any) => {
            setShowPicker(false);
            handleDateChange(date);
          }}
          onCancel={() => {
            setShowPicker(false);
          }}
        />
      </View>
    );
  };
  const updateQuantity = (newQuantity: number) => {
    const clampedQuantity = Math.max(1, Math.min(50, Math.floor(newQuantity)));
    setQuantity(clampedQuantity);
  };

  const handleInputChange = (text: string) => {
    const newQuantity = parseInt(text, 10);
    if (text.trim() === '') {
      updateQuantity(1);
    } else if (!isNaN(newQuantity)) {
      updateQuantity(newQuantity);
    }
  };

  const handleInputBlur = (text: string) => {
    if (text.trim() === '') {
      updateQuantity(1);
    }
  };

  const increaseQuantity = () => {
    updateQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    updateQuantity(quantity - 1);
  };

  const validate = (location: any, budget: any) => {
    if (
      location === (false || undefined || null || '') ||
      provices.includes(location) === false
    ) {
      console.log(provices.includes(location));
      return false;
    }
    if (budget === (false || undefined || null || '')) {
      return false;
    }
    return true;
  };
  const provinceFilter = useSearch(location);

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <>
          <TouchableOpacity
            style={{
              position: 'absolute',
              zIndex: 1,
              backgroundColor: '#2AB6AD',
              padding: 10,
              top: 10,
              left: 10,
              borderTopRightRadius: 50,
              borderBottomRightRadius: 50,
            }}
            onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>
          <FlatList
            contentContainerStyle={styles.container}
            ListHeaderComponent={
              <>
                <Text style={styles.header}>Lên kế hoạch chuyến đi</Text>
                <View>
                  <Text style={styles.sdHeader}>Đâu sẽ là nơi bạn đến?</Text>
                  <View
                    style={{
                      height: 40,
                      width: 250,
                      alignSelf: 'center',
                      marginBottom: 5,
                    }}>
                    <TextInput
                      placeholder="Tỉnh, thành phố bạn sẽ tới là?"
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
                      data={provinceFilter}
                      renderItem={({item}: any) => <ItemProvice title={item} />}
                      keyExtractor={(item: any) => item}
                      style={styles.dropdown}
                    />
                  ) : null}
                  <DateRangePicker />
                </View>
                <View>
                  <Text style={styles.sdHeader}>
                    Kế hoạch lên cho bao nhiêu người?
                  </Text>
                  <View style={{width: 250, alignSelf: 'center'}}>
                    <TextInput
                      value={quantity.toString()}
                      onChangeText={handleInputChange}
                      onBlur={() => handleInputBlur(quantity.toString())}
                      style={{...styles.input, alignItems: 'center'}}
                      keyboardType="numeric"
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        height: 40,
                        alignItems: 'center',
                        position: 'absolute',
                        right: 10,
                      }}>
                      <TouchableOpacity
                        style={{display: quantity === 1 ? 'none' : 'flex'}}
                        onPress={decreaseQuantity}>
                        <Ionicons
                          name="remove-circle"
                          size={30}
                          color={'#aaa'}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={increaseQuantity}>
                        <Ionicons name="add-circle" size={30} color={'#aaa'} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.sdHeader}>
                    Kinh phí của bạn là bao nhiêu?
                  </Text>
                  <View
                    style={{
                      height: 40,
                      width: 250,
                      alignSelf: 'center',
                      marginBottom: 5,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setShowBudget(!showBudget);
                      }}>
                      <TextInput
                        placeholder="Chọn mức kinh phí của bạn?"
                        placeholderTextColor={'#aaa'}
                        style={styles.input}
                        onChangeText={onChangeLocation}
                        value={budget}
                        editable={false}
                      />
                      <View style={styles.dropdownBtn}>
                        <Ionicons
                          name={showBudget ? 'caret-up' : 'caret-down'}
                          size={15}
                          color={'#aaa'}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  {showBudget ? (
                    <FlatList
                      data={budgetList}
                      renderItem={({item}: any) => <ItemBudget title={item} />}
                      keyExtractor={(item: any) => item}
                      style={styles.dropdown}
                    />
                  ) : null}
                </View>
                <Text style={styles.sdHeader}>Kiểu địa điểm bạn muốn đến</Text>
              </>
            }
            ListFooterComponent={
              <View
                style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <TouchableOpacity
                  style={{
                    ...styles.sendBtn,
                    backgroundColor: '#fff',
                    borderColor: '#2AB6AD',
                    borderWidth: 1,
                  }}
                  onPress={() => {
                    onChangeLocation('');
                    setStartDate(new Date());
                    setEndDate(new Date());
                    setQuantity(1);
                    setBudget('');
                    setAreaTypes([]);
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#2AB6AD',
                      fontWeight: '700',
                    }}>
                    ĐẶT LẠI
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.sendBtn}
                  onPress={() => {
                    const days = handleCalculateDateRange(startDate, endDate);
                    // console.log(
                    //   location,
                    //   startDate,
                    //   endDate,
                    //   days,
                    //   quantity,
                    //   budget,
                    //   areaTypes,
                    //   userLocation,
                    // );
                    if (
                      days !== undefined &&
                      days <= 7 &&
                      validate(location, budget)
                    ) {
                      navigation.navigate('GenerateTripsScreen', {
                        location: location,
                        quantity: quantity,
                        budget: budget,
                        areaTypes: areaTypes,
                        userLocation: userLocation,
                        days: days,
                        startDate: startDate,
                        endDate: endDate,
                      });
                    } else {
                      if (days !== undefined && days > 7) {
                        Toast.show({
                          type: 'error',
                          text1: 'Thất bại',
                          text2:
                            'Chúng tôi chỉ có thể tạo cho bạn kế hoạch tối đa 7 ngày',
                        });
                      }
                      if (validate(location, budget) === false) {
                        if (provices.includes(location) === false) {
                          Toast.show({
                            type: 'error',
                            text1: 'Thất bại',
                            text2:
                              'Vui lòng chọn đúng tỉnh, thành phố mà chúng tôi đã cung cấp',
                          });
                        } else {
                          Toast.show({
                            type: 'error',
                            text1: 'Thất bại',
                            text2: 'Vui lòng điền đầy đủ thông tin!',
                          });
                        }
                      }
                    }
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#fff',
                      fontWeight: '700',
                    }}>
                    TIẾP
                  </Text>
                </TouchableOpacity>
              </View>
            }
            data={AreaTypes}
            renderItem={({item}: any) => <ItemAreaType title={item} />}
            keyExtractor={(item: any) => item}
            style={styles.areaTypes}
            numColumns={2}
          />
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderColor: '#2AB6AD',
    margin: 10,
    borderWidth: 1,
    padding: 25,
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
  btn: {
    backgroundColor: '#2AB6AD',
    padding: 9,
    borderRadius: 8,
  },
  areaType: {
    color: '#000',
    marginTop: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#2AB6AD',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '49%',
    marginRight: '2%',
  },
  areaTypes: {
    width: '100%',
  },
  sendBtn: {
    backgroundColor: '#2AB6AD',
    padding: 10,
    borderRadius: 10,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
});
