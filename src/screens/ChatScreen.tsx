/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  // Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

export const ChatScreen: FC = (): JSX.Element => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
          <View style={styles.chatContent}>
            <Text>ádfasdf</Text>
          </View>
          <View style={styles.textInputPlace}>
            <TextInput
              placeholder="Nhập"
              placeholderTextColor={'gray'}
              style={styles.textInput}
              multiline={true}
            />
            <TouchableOpacity style={styles.sendBtn}>
              <Feather name="send" size={24} color={'#2AB6AD'} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  chatContent: {
    flex: 1,
  },
  textInputPlace: {
    height: 50,
    width: '90%',
    justifyContent: 'center',
    marginBottom: 10,
    alignSelf: 'center',
  },
  textInput: {
    position: 'absolute',
    bottom: 0,
    maxHeight: 70,
    height: 'auto',
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2AB6AD',
    fontSize: 16,
    paddingLeft: 20,
    paddingRight: 55,
    color: '#000',
  },
  sendBtn: {
    position: 'absolute',
    right: 0,
    marginRight: 20,
  },
});
