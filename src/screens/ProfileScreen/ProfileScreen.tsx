import {View} from 'react-native';
import ProfileHeader from './ProfileHeader';
import user from '../../assets/data/user.json';
import FeedGridView from '../../components/FeedGridView/FeedGridView';

const ProfileScreen = () => {
  return (
    <View>
      <FeedGridView data={user.posts} ListHeaderComponent={ProfileHeader} />
    </View>
  );
};

export default ProfileScreen;
