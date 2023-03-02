import {View} from 'react-native';
import ProfileHeader from './ProfileHeader';
import user from '../../assets/data/user.json';
import FeedGridView from '../../components/FeedGridView/FeedGridView';
import {useRoute} from '@react-navigation/native';

const ProfileScreen = () => {
  const route = useRoute();
  const {userId} = route.params;
  // query the user with userId

  return (
    <View>
      <FeedGridView data={user.posts} ListHeaderComponent={ProfileHeader} />
    </View>
  );
};

export default ProfileScreen;
