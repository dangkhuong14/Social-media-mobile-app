import {View, Text, Image} from 'react-native';
import styles from './styles';
import Button from '../../components/Button/Button';
import {useNavigation} from '@react-navigation/native';
import {ProfileNavigationProp} from '../../types/navigation';
import {Auth} from 'aws-amplify';
import {User} from '../../API';
import {DEFAULT_USER_IMAGE} from '../../config';
import {useAuthContext} from '../../contexts/AuthContext';

interface IProfileHeader {
  user: User;
}

const ProfileHeader = ({user}: IProfileHeader) => {
  const navigation = useNavigation<ProfileNavigationProp>();
  const {userId} = useAuthContext();

  const navigateToEditProfile = () => {
    navigation.navigate('Edit Profile');
  };

  return (
    <View style={styles.root}>
      {/* header */}

      <View style={styles.headerRow}>
        <Image
          style={styles.avatar}
          source={{uri: user.image || DEFAULT_USER_IMAGE}}
        />
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofPosts}</Text>
          <Text>Post</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofFollowers}</Text>
          <Text>Followers</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofFollowings}</Text>
          <Text>Followings</Text>
        </View>
      </View>

      {/* description */}

      <Text style={styles.name}>{user.name}</Text>
      <Text>{user.bio}</Text>

      {/* buttons */}

      {userId === user.id && (
        <View style={styles.buttonContainer}>
          <Button onPress={navigateToEditProfile} text="Edit profile" inline />
          <Button
            text="Sign out"
            inline
            onPress={() => {
              Auth.signOut();
            }}
          />
        </View>
      )}
    </View>
  );
};

export default ProfileHeader;
