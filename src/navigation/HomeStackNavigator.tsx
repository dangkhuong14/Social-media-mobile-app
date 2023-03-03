import {Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import logo from '../assets/images/logo.png';

const HomeStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={HomeScreen}
        options={{headerTitle: HeaderTitle, headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name={'UserProfile'}
        component={ProfileScreen}
        options={{headerTitle: 'Profile'}}
      />
    </Stack.Navigator>
  );
};

const HeaderTitle = () => (
  <Image
    source={logo}
    resizeMode="contain"
    style={{width: 130, height: 45, marginTop: 5}}
  />
);

export default HomeStackNavigator;
