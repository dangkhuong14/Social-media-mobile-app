import {View} from 'react-native';
import ProfileHeader from './ProfileHeader';
import user from '../../assets/data/user.json';
import FeedGridView from '../../components/FeedGridView/FeedGridView';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  MyProfileNavigationProp,
  UserProfileNavigationProp,
  MyProfileRouteProp,
  UserProfileRouteProp,
} from '../../types/navigation';

const ProfileScreen = () => {
  const navigation = useNavigation<
    MyProfileNavigationProp | UserProfileNavigationProp
  >();
  const route = useRoute<MyProfileRouteProp | UserProfileRouteProp>();
  const userId = route.params?.userId;
  // query the user with userId

  console.warn(userId);

  return (
    <View>
      <FeedGridView data={user.posts} ListHeaderComponent={ProfileHeader} />
    </View>
  );
};

export default ProfileScreen;
