import {Image} from 'react-native';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import logo from '../assets/images/logo.png';

const Navitgation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Feed"
        screenOptions={{headerShown: true}}>
        <Stack.Screen
          name="Feed"
          component={HomeScreen}
          options={{
            headerTitle: HeaderTitle,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={'UserProfile'}
          component={ProfileScreen}
          options={{headerTitle: 'Profile'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HeaderTitle = () => (
  <Image
    source={logo}
    resizeMode="contain"
    style={{width: 130, height: 45, marginTop: 5}}
  />
);

export default Navitgation;
