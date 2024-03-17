/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Registration from '../components/management_Account/Registration';
import Login from '../components/management_Account/Login';
import VerifyAccount from '../components/management_Account/VerifyAccount';
import LandingPage from '../components/management_Account/LandingPage';
import HomeScreens from '../screens/HomeScreens';
import {ChatScreen} from '../screens/ChatScreen';
import {TripPlanScreen} from '../screens/TripPlannersStack/AddNewTripPlanScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreens from '../screens/ProfileScreens';
import EditProfile from '../components/management_Account/EditProfile';
import {useWindowDimensions} from 'react-native';
import {TripPlanChoose} from '../screens/TripPlannersStack/CreateTripPlanScreen';
import RefreshVerifyCode from '../components/management_Account/RefreshVerifyCode';
import ForgotPassword from '../components/management_Account/ForgotPassword';
import NewPassword from '../components/management_Account/NewPassword';
import {GenerateTripsScreen} from '../screens/TripPlannersStack/GenerateTripsScreen';
import {useState} from 'react';
import Notification from '../components/management_Account/Notification';
import VideoTravel from '../components/shortVideo/VideoTravel';
import RankingScreen from '../screens/RankingScreen';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TripPlanStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AddNewTrip" component={TripPlanScreen} />
      <Stack.Screen name="TripPlanChoose" component={TripPlanChoose} />
      <Stack.Screen
        name="GenerateTripsScreen"
        component={GenerateTripsScreen}
      />
    </Stack.Navigator>
  );
};

const renderScene = SceneMap({
  first: ChatScreen,
  second: TripPlanStack,
});
const renderAssistanceTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: '#2AB6AD'}}
    style={{backgroundColor: '#D0FFF9'}}
    activeColor="#2AB6AD"
    inactiveColor="#000"
    pressColor="#2AB6AD"
    bounces={true}
    labelStyle={{fontSize: 14, fontFamily: ''}}
    upperCaseLabel={false}
  />
);
const AssistanceScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Chat'},
    {key: 'second', title: 'Kế hoạch'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={renderAssistanceTabBar}
    />
  );
};

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
    component: AssistanceScreen,
  },
  {
    route: 'Xếp hạng',
    label: 'Xếp hạng',
    type: Ionicons,
    activeIcon: 'podium',
    unActiveIcon: 'podium-outline',
    component: RankingScreen,
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
        tabBarActiveTintColor: '#fff',
        tabBarActiveBackgroundColor: '#2AB6AD',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#D0FFF9',
          height: 50,
        },
        tabBarHideOnKeyboard: true,
      })}>
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            name={item.route}
            key={index}
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
      <Stack.Navigator
        // initialRouteName="Homestack"
        screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="RotatingElement" component={RotatingElement} /> */}
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
        <Stack.Screen name="RefreshVerifyCode" component={RefreshVerifyCode} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
        <Stack.Screen name="Homestack" component={Homestack} />
        <Stack.Screen name="Editprofile" component ={EditProfile} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="VideoTravel" component={VideoTravel} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
