/* eslint-disable react-native/no-inline-styles */
import React, {FC, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';

export const ChatScreen: FC = (): JSX.Element => {
  const APIurl = 'http://52.63.147.17:8080/chat ';
  const [data, setData] = useState([
    {type: 'bot', text: 'Tôi có thể giúp gì cho bạn?'},
  ]);
  const [idChat, setIdChat] = useState(null);
  const [textInput, setTextInput] = useState('');
  const accessTooken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQ4NWRlNWUzNmM2ZjA5YzA3NzYyODYiLCJpYXQiOjE3MDg5MTExNzEsImV4cCI6MTcwODkyMTk3MX0.INV4NIZSmOk41wqkmkLaTQZ49WBUgdf531LzgwGgeYg';

  const handleSend = async () => {
    const prompt = textInput;
    console.log(idChat);
    setData(
      textInput === '' ? data : [...data, {type: 'user', text: textInput}],
    );
    setTextInput('');
    const response = await axios.post(
      APIurl,
      {
        message: prompt,
        idChat: idChat,
      },
      {
        headers: {
          Authorization: 'Bearer ' + accessTooken,
        },
      },
    );
    const text = response.data.data.ChatResponse;
    setIdChat(response.data.data.chatAi._id);
    setData([
      ...data,
      {type: 'user', text: textInput},
      {type: 'bot', text: text},
    ]);
    console.log(response);
    console.log(data);
    console.log(idChat);
  };
  const flatList = useRef(null);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      contentContainerStyle={{flex: 1}}>
      <View style={{flex: 1}}>
        <FlatList
          ref={flatList}
          style={styles.chatContent}
          data={data}
          renderItem={({item}) => (
            <Text
              style={
                item.type === 'user'
                  ? {...styles.textChat, ...styles.userContent}
                  : styles.textChat
              }>
              {item.text}
            </Text>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{justifyContent: 'flex-end'}}
          onContentSizeChange={() => {
            flatList.current.scrollToEnd();
          }}
        />
        <View style={styles.textInputPlace}>
          <TextInput
            placeholder="Nhập"
            placeholderTextColor={'gray'}
            style={styles.textInput}
            multiline={true}
            value={textInput}
            onChangeText={text => setTextInput(text)}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <Feather name="send" size={24} color={'#2AB6AD'} />
          </TouchableOpacity>
        </View>
      </View>
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
    margin: 20,
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
    height: 50,
    width: 50,
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: 20,
    // backgroundColor: 'red',
  },
  textChat: {
    color: '#000',
    marginTop: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
    width: 'auto',
    backgroundColor: '#fff',
    borderColor: '#2AB6AD',
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  userContent: {
    color: '#fff',
    alignSelf: 'flex-end',
    backgroundColor: '#2AB6AD',
  },
});
