import {useState} from 'react';
import {Text, View, Image, Pressable} from 'react-native';
import colors from '../../theme/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import Comment from '../Comment';
import DoublePressable from '../DoublePressable';
import Carousel from '../Carousel';
import VideoPlayer from '../VideoPlayer';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '../../types/navigation';
import {
  CreateLikeMutation,
  CreateLikeMutationVariables,
  DeleteLikeMutation,
  DeleteLikeMutationVariables,
  LikesForPostByUserQuery,
  LikesForPostByUserQueryVariables,
  Post,
  UpdatePostMutation,
  UpdatePostMutationVariables,
} from '../../API';
import {DEFAULT_USER_IMAGE} from '../../config';
import PostMenu from './PostMenu';
import {useMutation, useQuery} from '@apollo/client';
import {
  createLike,
  deleteLike,
  likesForPostByUser,
  updatePost,
} from './queries';
import {useAuthContext} from '../../contexts/AuthContext';

interface IFeedPost {
  post: Post;
  isVisible: boolean;
}

const FeedPost = ({post, isVisible}: IFeedPost) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const navigation = useNavigation<RootNavigationProp>();
  const {userId} = useAuthContext();
  const [doCreateLike, {loading: createLikeLoading}] = useMutation<
    CreateLikeMutation,
    CreateLikeMutationVariables
  >(createLike, {
    variables: {input: {postID: post.id, userID: userId}},
    refetchQueries: ['LikesForPostByUser'],
  });

  const [doDeleteLike, {loading: deleteLikeLoading}] = useMutation<
    DeleteLikeMutation,
    DeleteLikeMutationVariables
  >(deleteLike, {refetchQueries: ['LikesForPostByUser']});

  const [doUpdatePost, {loading: updatePostLoading}] = useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(updatePost);

  const {data: userLikeData} = useQuery<
    LikesForPostByUserQuery,
    LikesForPostByUserQueryVariables
  >(likesForPostByUser, {variables: {postID: post.id, userID: {eq: userId}}});

  const userLike = (userLikeData?.likesForPostByUser?.items || []).filter(
    like => !like?._deleted,
  )?.[0];

  const postLikes = post.Likes?.items.filter(like => !like?._deleted) || [];

  const adjustNumberOfLikes = (ammount: 1 | -1) => {
    doUpdatePost({
      variables: {
        input: {
          id: post.id,
          _version: post._version,
          nofLikes: post.nofLikes + ammount,
        },
      },
    });
  };

  const navigateToUser = () => {
    if (post.User) navigation.navigate('UserProfile', {userId: post.User.id});
  };

  const navigateToComments = () => {
    navigation.navigate('Comments', {postId: post.id});
  };

  const navigateToLikesPage = () => {
    navigation.navigate('PostLikes', {id: post.id});
  };

  const toggleDescriptionExpanded = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const toggleLike = () => {
    if (userLike) {
      doDeleteLike({
        variables: {input: {id: userLike.id, _version: userLike._version}},
      });
      adjustNumberOfLikes(-1);
      return;
    }
    doCreateLike();
    adjustNumberOfLikes(1);
  };

  let content = null;
  if (post.image) {
    content = (
      <DoublePressable onDoublePress={toggleLike}>
        <Image
          source={{
            uri: post.image,
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </DoublePressable>
    );
  } else if (post.images) {
    content = <Carousel images={post.images} onDoublePressed={toggleLike} />;
  } else if (post.video) {
    content = (
      <DoublePressable onDoublePress={toggleLike}>
        <VideoPlayer uri={post.video} paused={!isVisible} />
      </DoublePressable>
    );
  }

  return (
    <View style={styles.post}>
      {/* Header */}

      <View style={styles.header}>
        <Pressable onPress={navigateToUser}>
          <Image
            style={styles.userAvatar}
            source={{
              uri: post.User?.image || DEFAULT_USER_IMAGE,
            }}
          />
        </Pressable>
        <Text onPress={navigateToUser} style={styles.userName}>
          {post.User?.username}
        </Text>
        <PostMenu post={post} />
      </View>

      {/* Content */}

      {content}

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <Pressable
            onPress={
              deleteLikeLoading || createLikeLoading || updatePostLoading
                ? () => {}
                : toggleLike
            }>
            <AntDesign
              name={userLike ? 'heart' : 'hearto'}
              size={24}
              style={styles.icon}
              color={userLike ? colors.accent : colors.black}
            />
          </Pressable>
          <Ionicons
            name="chatbubble-outline"
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Feather
            name="send"
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Feather
            name="bookmark"
            size={24}
            style={{marginLeft: 'auto'}}
            color={colors.black}
          />
        </View>

        {/* Likes */}

        {postLikes.length === 0 ? (
          <Text style={styles.text}>Be the first one to like the post</Text>
        ) : (
          <Text style={styles.text} onPress={navigateToLikesPage}>
            Liked by {''}
            <Text style={styles.bold}>
              {postLikes[postLikes.length - 1]?.User?.username}
            </Text>
            {postLikes.length > 1 && (
              <>
                {' '}
                and
                <Text style={styles.bold}>
                  {' '}
                  {post.nofLikes <= 0 ? 0 : post.nofLikes - 1} others
                </Text>
              </>
            )}
          </Text>
        )}

        {/* Post description */}

        <Text style={styles.text} numberOfLines={isDescriptionExpanded ? 0 : 2}>
          <Text style={styles.bold}>{post.User?.username}</Text>{' '}
          {post.description}
        </Text>
        <Text onPress={toggleDescriptionExpanded}>
          {isDescriptionExpanded ? 'less' : 'more'}
        </Text>

        {/* Post's comments */}
        <Text onPress={navigateToComments}>
          View all {post.nofComments} comments
        </Text>
        {(post.Comments?.items || []).map(
          comment => comment && <Comment key={comment?.id} comment={comment} />,
        )}
        <Text>{post.createdAt}</Text>
      </View>
    </View>
  );
};

export default FeedPost;
