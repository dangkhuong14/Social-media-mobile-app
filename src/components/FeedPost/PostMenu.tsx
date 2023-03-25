import {View, Text, StyleSheet, Alert} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import {deletePost} from './queries';
import {useMutation} from '@apollo/client';
import {DeleteLikeMutationVariables, DeletePostMutation, Post} from '../../API';
import {useAuthContext} from '../../contexts/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {UpdatePostNavigationProp} from '../../types/navigation';

interface IPostMenu {
  post: Post;
}

const PostMenu = ({post}: IPostMenu) => {
  const [doDeletePost] = useMutation<
    DeletePostMutation,
    DeleteLikeMutationVariables
  >(deletePost, {variables: {input: {id: post.id, _version: post._version}}});

  const {userId} = useAuthContext();
  const isMyPost = userId === post.userID;

  const navigation = useNavigation<UpdatePostNavigationProp>();

  const startDeletingPost = async () => {
    const response = await doDeletePost();
  };

  const onDeleteOptionPressed = () => {
    Alert.alert(
      'Delete this post?',
      'The deletion is permanent, you can not undo this action!',
      [
        {
          text: 'Delete',
          style: 'destructive',
          onPress: startDeletingPost,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  const onEditOptionPressed = () => {
    navigation.navigate('UpdatePost', {id: post.id});
  };

  return (
    <Menu renderer={renderers.SlideInMenu} style={styles.threeDots}>
      <MenuTrigger>
        <Entypo name="dots-three-horizontal" size={16} />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={() => Alert.alert('Reporting')}>
          <Text style={styles.optionText}>Report</Text>
        </MenuOption>

        {isMyPost && (
          <>
            <MenuOption onSelect={onDeleteOptionPressed}>
              <Text style={[styles.optionText, {color: colors.error}]}>
                Delete
              </Text>
            </MenuOption>

            <MenuOption onSelect={onEditOptionPressed}>
              <Text style={styles.optionText}>Edit</Text>
            </MenuOption>
          </>
        )}
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  threeDots: {
    marginLeft: 'auto',
  },

  optionText: {
    fontSize: fonts.size.lg,
    padding: 10,
    textAlign: 'center',
    color: colors.black,
  },
});

export default PostMenu;
