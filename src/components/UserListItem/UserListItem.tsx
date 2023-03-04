import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {IUser} from '../../types/models';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {UserListItemNavigationProp} from '../../navigation/types';

interface IUserListItem {
  user: IUser;
}

const UserListItem = ({user}: IUserListItem) => {
  const navigation = useNavigation<UserListItemNavigationProp>();
  const goToUserProfile = () => {
    navigation.navigate('UserProfile', {userId: user.id});
  };

  return (
    <Pressable onPress={goToUserProfile} style={styles.root}>
      <Image source={{uri: user.image}} style={styles.image} />

      <View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>{user.username}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },

  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
    marginRight: 10,
  },

  name: {
    fontWeight: fonts.weight.bold,
    color: colors.black,
    marginBottom: 5,
  },

  username: {color: colors.grey},
});

export default UserListItem;
