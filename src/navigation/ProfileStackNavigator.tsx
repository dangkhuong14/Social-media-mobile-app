import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen/';
import EditProfileScreen from '../screens/EditProfileScreen/';
import {ProfileStackNavigatorParamList} from './types';

const ProfileStackNavigator = () => {
  const Stack = createNativeStackNavigator<ProfileStackNavigatorParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
