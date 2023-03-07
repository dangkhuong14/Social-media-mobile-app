import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import CommentsScreen from '../screens/CommentsScreen';
import {RootNavigatorParamList} from '../types/navigation';
import {ActivityIndicator} from 'react-native';
import colors from '../theme/colors';
import AuthStackNavigator from './AuthStackNavigator';

const Navitgation = () => {
  const Stack = createNativeStackNavigator<RootNavigatorParamList>();

  const linking: LinkingOptions<RootNavigatorParamList> = {
    prefixes: ['mystarphotos://', 'https://mystarphotos.com'],
    config: {
      initialRouteName: 'Home',
      screens: {
        Comments: 'comments',
        Home: {
          screens: {
            HomeStack: {
              initialRouteName: 'Feed',
              screens: {
                UserProfile: 'user/:userId',
              },
            },
          },
        },
      },
    },
  };

  return (
    <NavigationContainer
      linking={linking}
      fallback={
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{flex: 1, width: '100%'}}
        />
      }>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{headerShown: true}}>
        <Stack.Screen
          name="Auth"
          component={AuthStackNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Comments" component={CommentsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navitgation;
