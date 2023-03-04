import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import UserSearchScreen from '../screens/UserSearchScreen/UserSearchScreen';
import colors from '../theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CommentsScreen from '../screens/CommentsScreen/CommentsScreen';
import {SearchTabNavigatorParamList} from './types';

const SearchTabNavigator = () => {
  const insets = useSafeAreaInsets();
  const Tab = createMaterialTopTabNavigator<SearchTabNavigatorParamList>();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {backgroundColor: colors.primary},
        tabBarStyle: {paddingTop: insets.top},
      }}>
      <Tab.Screen name="Users" component={UserSearchScreen} />
      <Tab.Screen name="Posts" component={CommentsScreen} />
    </Tab.Navigator>
  );
};

export default SearchTabNavigator;
