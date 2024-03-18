import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export const MapScreen = () => {
  return (
    <View style={style.container}>
      <Text>alo</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 5,
    color: '#000',
  },
});
