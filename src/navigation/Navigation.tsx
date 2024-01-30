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
const Stack = createNativeStackNavigator();
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
