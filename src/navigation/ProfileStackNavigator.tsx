import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen/EditProfileScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

const ProfileStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
