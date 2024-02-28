import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Animatable from 'react-native-animatable';

import Registration from '../components/management_Account/Registration';
import Login from '../components/management_Account/Login';
import VerifyAccount from '../components/management_Account/VerifyAccount';
import LandingPage from '../components/management_Account/LandingPage';
import ForgotPassword from '../components/management_Account/ForgotPassword';
import VerifyCode from '../components/management_Account/VerifyCode';
import LoginNew from '../components/management_Account/LoginNew';
import HomeScreens from '../screens/HomeScreens';
import {ChatScreen} from '../screens/ChatScreen';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import ProfileScreens from '../screens/ProfileScreens';
import EditProfile from '../components/management_Account/EditProfile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const iconsColor = '#000';
const TabArr = [
  {
    route: 'Trang chủ',
    label: 'Trang chủ',
    type: Ionicons,
    activeIcon: 'home',
    unActiveIcon: 'home-outline',
    component: HomeScreens,
  },
  {
    route: 'Bảng tin',
    label: 'Bảng tin',
    type: Ionicons,
    activeIcon: 'newspaper',
    unActiveIcon: 'newspaper-outline',
    component: HomeScreens,
  },
  {
    route: 'Trợ lý',
    label: 'Trợ lý',
    type: AntDesign,
    activeIcon: 'aliwangwang',
    unActiveIcon: 'aliwangwang-o1',
    component: ChatScreen,
  },
  {
    route: 'Xếp hạng',
    label: 'Xếp hạng',
    type: Ionicons,
    activeIcon: 'podium',
    unActiveIcon: 'podium-outline',
    component: HomeScreens,
  },
  {
    route: 'Tài khoản',
    label: 'Tài khoản',
    type: Ionicons,
    activeIcon: 'person',
    unActiveIcon: 'person-outline',
    component: ProfileScreens,
  },
];
// const TabButton = (props: any) => {
//   const {item, onPress, accessabilityState} = props;
//   const focused = accessabilityState.selected;
//   const viewRef = useRef(null);
//   useEffect(() => {
//     if (focused) {
// viewRef.current.animate;
//     }
//   }, [focused]);
//   return (
//     <TouchableOpacity onPress={onPress}>
//       <Animatable.View ref={viewRef} duration={1000}>
//         {/* <Icon></Icon> */}
//       </Animatable.View>
//     </TouchableOpacity>
//   );
// };
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
        tabBarInactiveTintColor: '#000',
        tabBarActiveTintColor: '#000',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#D0FFF9',
          height: 50,
        },
        tabBarHideOnKeyboard: true,
      })}>
      {/* <Tab.Screen name="Trang chủ" component={HomeScreens} />
      <Tab.Screen name="Bảng tin" component={HomeScreens} />
      <Tab.Screen name="Trợ lý" component={ChatScreen} />
      <Tab.Screen name="Xếp hạng" component={HomeScreens} />
      <Tab.Screen name="Tài khoản" component={HomeScreens} /> */}
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            name={item.route}
            component={item.component}
            options={{
              tabBarLabel: item.label,
            }}
          />
        );
      })}
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
        <Stack.Screen name="Homestack" component={Homestack} />
        <Stack.Screen name="Editprofile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
