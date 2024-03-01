import React, { useRef } from 'react';
import {Text, View, StyleSheet, Animated, Easing, TouchableWithoutFeedback } from 'react-native';

const RotatingElement = () => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const stopRotation = () => {
    rotateValue.stopAnimation();
  };

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={startRotation}>
        <View style={styles.button}>
          <Animated.View style={{ transform: [{ rotate }], color: 'white' }}>Start</Animated.View>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={stopRotation}>
        <View style={styles.button}>
          <Text style={{ color: 'white' }}>Stop</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});

export default RotatingElement;