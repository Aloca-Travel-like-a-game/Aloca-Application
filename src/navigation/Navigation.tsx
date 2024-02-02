import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Registration from '../components/management_Account/Registration';
import Login from '../components/management_Account/Login';
import VerifyAccount from '../components/management_Account/VerifyAccount';
import LandingPage from '../components/management_Account/LandingPage';
import ForgotPassword from '../components/management_Account/ForgotPassword';
import VerifyCode from '../components/management_Account/VerifyCode';
import LoginNew from '../components/management_Account/LoginNew';
import HomeScreens from '../screens/HomeScreens';
const Stack = createNativeStackNavigator();
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
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
        <Stack.Screen name="VerifyCode" component={VerifyCode} />
        <Stack.Screen name="LoginNew" component={LoginNew} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
