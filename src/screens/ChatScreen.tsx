import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeScreens from './HomeScreens';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Homestack = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string = '';
          if (route.name === 'Trang chủ') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Bảng tin') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'Trợ lý') {
            iconName = focused ? 'aliwangwang' : 'aliwangwang-o1';
            return <AntDesign name={iconName} size={size} color={color} />;
          } else if (route.name === 'Xếp hạng') {
            iconName = focused ? 'podium' : 'podium-outline';
          } else if (route.name === 'Tài khoản') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarInactiveTintColor: '#91d3fa',
        tabBarActiveTintColor: '#91d3fa',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#353B51',
        },
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen name="Trang chủ" component={HomeScreens} />
      <Tab.Screen name="Bảng tin" component={HomeScreens} />
      <Tab.Screen name="Trợ lý" component={HomeScreens} />
      <Tab.Screen name="Xếp hạng" component={HomeScreens} />
      <Tab.Screen name="Tài khoản" component={HomeScreens} />
    </Tab.Navigator>
  );
};

export default function ChatScreen() {
  return (
    <NavigationContainer>
      <Homestack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
