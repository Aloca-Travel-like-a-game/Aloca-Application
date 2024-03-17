/* eslint-disable react-native/no-inline-styles */
import React, {FC, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ChatScreen: FC = (): JSX.Element => {
  const APIurl = 'http://52.63.147.17:8080/chat ';
  const [token, setToken] = useState<any>();
  const [data, setData] = useState([
    {
      type: 'bot',
      text: 'Xin chào, tôi là Aloca, trợ lý du lịch của bạn. Tôi có thể giúp bạn lên kế hoạch cho chuyến đi, giới thiệu điểm đến, giới thiệu khách sạn hoặc trả lời bất kỳ câu hỏi nào liên quan đến du lịch.',
      error: false,
    },
    {type: 'bot', text: 'Bạn muốn làm gì?', error: false},
  ]);
  const [idChat, setIdChat] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [reloadQuest, setReloadQuest] = useState(textInput);
  const [reload, setReload] = useState(false);
  const [isAnalyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('AccessToken').then(result => setToken(result));
  });

  const sendRequest = (prompt: any) => {
    console.log(token);
    const res = axios.post(
      APIurl,
      {
        message: prompt,
        idChat: idChat,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    );
    return res;
  };
  const reloadSend = async (prompt: string) => {
    setAnalyzing(true);
    const response = await sendRequest(prompt);
    setData(data.filter(item => item.error !== true));
    if (response.data.message === 'Send message successfully') {
      setAnalyzing(false);
      const text = response.data.data.ChatResponse;
      setData([...data, {type: 'bot', text: text, error: false}]);
      setIdChat(response?.data.data.chatAi._id);
    } else if (
      response.data.message ===
      'Đã xảy ra lỗi trong quá trình gửi tin nhắn, thử lại'
    ) {
      setAnalyzing(false);
      const text = response.data.message;
      setData([...data, {type: 'bot', text: text, error: true}]);
      setIdChat(response?.data.chatAi._id);
      setReload(true);
    } else {
      setAnalyzing(false);
      const text = response.data.message;
      setData([...data, {type: 'bot', text: text, error: false}]);
      setIdChat(response?.data.chatAi._id);
    }
  };
  const handleSend = async () => {
    setAnalyzing(true);
    const prompt = textInput;
    setReloadQuest(prompt);
    setData(
      textInput === ''
        ? data
        : [...data, {type: 'user', text: textInput, error: false}],
    );
    setTextInput('');
    const response = await sendRequest(prompt);
    if (response.data.message === 'Send message successfully') {
      setAnalyzing(false);
      const text = response.data.data.ChatResponse;
      setData(data.filter(item => item.error !== true));
      setData([
        ...data,
        {type: 'user', text: textInput, error: false},
        {type: 'bot', text: text, error: false},
      ]);
      setIdChat(response?.data.data.chatAi._id);
    } else if (
      response.data.message ===
      'Đã xảy ra lỗi trong quá trình gửi tin nhắn, thử lại'
    ) {
      setAnalyzing(false);
      const text = response.data.message;
      setData([
        ...data,
        {type: 'user', text: textInput, error: false},
        {type: 'bot', text: text, error: true},
      ]);
      setIdChat(response?.data.chatAi._id);
      setReload(true);
    } else {
      setAnalyzing(false);
      const text = response.data.message;
      setData([
        ...data,
        {type: 'user', text: textInput, error: false},
        {type: 'bot', text: text, error: false},
      ]);
    }
  };

  const renderLoad = (item: any) => {
    return (
      <View>
        <Text
          style={
            item.type === 'user'
              ? {...styles.textChat, ...styles.userContent}
              : styles.textChat
          }>
          {item.text}
        </Text>
        {item.error && (
          <TouchableOpacity
            style={{display: reload ? 'flex' : 'none'}}
            onPress={() => {
              reloadSend(reloadQuest);
              setReload(!reload);
            }}>
            <Ionicons name="reload" size={20} color={'#2AB6AD'} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const flatList = useRef<FlatList | null>(null);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      contentContainerStyle={{flex: 1}}>
      <View style={{flex: 1}}>
        <FlatList
          ref={flatList}
          style={styles.chatContent}
          data={data}
          renderItem={({item}) => renderLoad(item)}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{justifyContent: 'flex-end'}}
          onContentSizeChange={() => {
            if (flatList.current !== null) {
              flatList.current.scrollToEnd();
            }
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
          <TouchableOpacity
            style={styles.sendBtn}
            onPress={() => {
              handleSend();
            }}
            disabled={isAnalyzing || textInput === '' ? true : false}>
            <View>
              {isAnalyzing ? (
                <ActivityIndicator size={24} color="#2AB6AD" />
              ) : (
                <Feather name="send" size={24} color={'#2AB6AD'} />
              )}
            </View>
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
