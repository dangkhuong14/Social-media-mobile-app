import {Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import logo from '../assets/images/logo.png';
import {HomeStackNavigatorParamList} from '../types/navigation';
import UpdatePostScreen from '../screens/UpdatePostScreen';

const HomeStackNavigator = () => {
  const Stack = createNativeStackNavigator<HomeStackNavigatorParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={HomeScreen}
        options={{headerTitle: HeaderTitle}}
      />
      <Stack.Screen name="UserProfile" component={ProfileScreen} />
      <Stack.Screen
        name="UpdatePost"
        component={UpdatePostScreen}
        options={{headerTitle: 'Update Post'}}
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
