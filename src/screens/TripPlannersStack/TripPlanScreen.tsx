/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Text,
} from 'react-native';

export const TripPlanScreen: FC = (): JSX.Element => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.addNewTrip}>
            <TouchableOpacity style={styles.plusCircle}>
              <AntDesign name="pluscircle" size={47} color={'#2AB6AD'} />
            </TouchableOpacity>
            <Text style={{color: '#000', marginTop: 5, fontWeight: '600'}}>Thêm mới một kế hoạch</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
});
