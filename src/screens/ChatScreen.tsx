import React, {FC} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';

export const ChatScreen: FC = (): JSX.Element => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.chatContent}><Text>ádfasdf</Text></View>
      <TextInput placeholder="Nhập" style={styles.textInput} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  chatContent: {
    flex: 10,
  },
  textInput: {
    flex: 1,
    // position: 'absolute',
    height: 60,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#2AB6AD',
    fontSize: 14,
    paddingLeft: 30,
  },
});
