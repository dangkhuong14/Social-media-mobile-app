import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import CommentsScreen from '../screens/CommentsScreen';
import {RootNavigatorParamList} from '../types/navigation';
import AuthStackNavigator from './AuthStackNavigator';
import {useAuthContext} from '../contexts/AuthContext';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

const Navitgation = () => {
  const {user} = useAuthContext();

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

  if (user === undefined) return <WelcomeScreen />;

  return (
    <NavigationContainer linking={linking} fallback={<WelcomeScreen />}>
      <Stack.Navigator screenOptions={{headerShown: true}}>
        {!user ? (
          <Stack.Screen
            name="Auth"
            component={AuthStackNavigator}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={BottomTabNavigator}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Comments" component={CommentsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navitgation;
