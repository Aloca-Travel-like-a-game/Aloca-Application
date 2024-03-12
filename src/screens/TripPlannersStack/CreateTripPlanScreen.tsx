/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-shadow */
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
  Alert,
} from 'react-native';

import {provices} from '../../Helper/provices';
import {FlatList} from 'react-native';
import {removeVietnameseTones} from '../../Helper/removeVietNamTone';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import {convertDatetoString} from '../../Helper/convertDate';
import {useNavigation} from '@react-navigation/native';

const budgetList = [
  'Dưới 1.000.000 VND',
  '1.000.000 VND - 5.000.000 VND',
  '5.000.000 VND - 15.000.000 VND',
];

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
  const navigation = useNavigation();

  const [proviceShow, setProviceShow] = useState(false);
  const [isChoosingStartDate, setIsChoosingStartDate] = useState(true);
  const [showPicker, setShowPicker] = useState(false);
  const [showBudget, setShowBudget] = useState(false);

  const [location, onChangeLocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [quantity, setQuantity] = useState(1);
  const [budget, setBudget] = useState();
  const [areaTypes, setAreaTypes] = useState<string[]>([]);

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
      Alert.alert('Vui lòng chọn lại ngày');
    } else {
      const days =
        Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
        ) + 1;
      return days;
    }
  };
  const DateRangePicker: React.FC = () => {
    const handleDateChange = (selectedDate: Date) => {
      if (isChoosingStartDate) {
        if (
          new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000) < new Date()
        ) {
          Alert.alert('Không được chọn trước hôm nay');
        } else {
          if (
            selectedDate.getDate() === new Date().getDate() &&
            new Date().getHours() >= 18
          ) {
            Alert.alert('Hôm nay muộn quá bạn ơi!');
          } else {
            setStartDate(selectedDate);
          }
        }
      } else {
        if (selectedDate >= startDate) {
          setEndDate(selectedDate);
        } else {
          Alert.alert('Ngày về không được chọn trước ngày đi');
        }
      }
    };

    return (
      <View>
        <View
          style={{
            ...styles.input,
            borderWidth: 0,
            justifyContent: 'space-evenly',
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
            <Text style={{color: '#fff', fontWeight: '500'}}>Chọn ngày đi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setIsChoosingStartDate(false);
              setShowPicker(true);
            }}>
            <Text style={{color: '#fff', fontWeight: '500'}}>Chọn ngày về</Text>
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
          onConfirm={date => {
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
    const clampedQuantity = Math.max(1, Math.floor(newQuantity));
    setQuantity(clampedQuantity);
  };
  const increaseQuantity = () => {
    updateQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    updateQuantity(quantity - 1);
  };

  const validate = (location: any, budget: any) => {
    if (location === (false || undefined || null || '')) {
      return false;
    }
    if (budget === undefined) {
      return false;
    }
    return true;
  };
  const provinceFilter = useSearch(location);

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <FlatList
          contentContainerStyle={styles.container}
          ListHeaderComponent={
            <>
              <Text style={styles.header}>
                Lên kế hoạch cho chuyến đi của bạn
              </Text>
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
                    renderItem={({item}) => <ItemProvice title={item} />}
                    keyExtractor={item => item}
                    style={styles.dropdown}
                  />
                ) : null}
                <TextInput
                  inputMode="none"
                  placeholder={`${convertDatetoString(
                    startDate,
                  )} - ${convertDatetoString(endDate)}`}
                  placeholderTextColor={'#000'}
                  style={{...styles.input, borderColor: '#000'}}
                  editable={false}
                />
                <DateRangePicker />
              </View>
              <View>
                <Text style={styles.sdHeader}>
                  Kế hoạch lên cho bao nhiêu người?
                </Text>
                <View>
                  <TextInput
                    value={quantity.toString() + ' người'}
                    editable={false}
                    placeholderTextColor={'#aaa'}
                    style={styles.input}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      height: 40,
                      alignItems: 'center',
                      position: 'absolute',
                      right: '10%',
                    }}>
                    <TouchableOpacity onPress={decreaseQuantity}>
                      <Ionicons name="remove-circle" size={30} color={'#aaa'} />
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
                    renderItem={({item}) => <ItemBudget title={item} />}
                    keyExtractor={item => item}
                    style={styles.dropdown}
                  />
                ) : null}
              </View>
              <Text style={styles.sdHeader}>Kiểu địa điểm bạn muốn đến</Text>
            </>
          }
          ListFooterComponent={
            <TouchableOpacity
              style={styles.sendBtn}
              onPress={() => {
                const days = handleCalculateDateRange(startDate, endDate);
                console.log(
                  location,
                  startDate,
                  endDate,
                  days,
                  quantity,
                  budget,
                  areaTypes,
                );

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
                    days: days,
                    startDate: startDate,
                    endDate: endDate,
                  });
                } else {
                  if (days !== undefined && days > 7) {
                    Alert.alert(
                      'Chúng tôi chỉ có thể tạo cho bạn kế hoạch tối đa 7 ngày',
                    );
                  }
                  if (validate(location, budget) === false) {
                    Alert.alert('Vui lòng điền đầy đủ thông tin!');
                  }
                }
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#fff',
                  fontWeight: '700',
                }}>
                TIẾP
              </Text>
            </TouchableOpacity>
          }
          data={AreaTypes}
          renderItem={({item}) => <ItemAreaType title={item} />}
          keyExtractor={item => item}
          style={styles.areaTypes}
          numColumns={2}
        />
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
    padding: 10,
    borderRadius: 10,
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
    padding: 15,
    borderRadius: 20,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
});
