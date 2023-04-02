import {ActivityIndicator, FlatList} from 'react-native';
import {useQuery} from '@apollo/client';
import {
  LikesForPostByUserQuery,
  LikesForPostByUserQueryVariables,
} from '../../API';
import {likesForPostByUser} from './queries';
import {useRoute} from '@react-navigation/native';
import {PostLikesRouteProp} from '../../types/navigation';
import colors from '../../theme/colors';
import ApiErrorMessage from '../../components/ApiErrorMessage';
import UserListItem from '../../components/UserListItem/UserListItem';

const PostLikesScreen = () => {
  const route = useRoute<PostLikesRouteProp>();
  const {id: postID} = route.params;
  const {data, loading, error, refetch} = useQuery<
    LikesForPostByUserQuery,
    LikesForPostByUserQueryVariables
  >(likesForPostByUser, {variables: {postID}});

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={{flex: 1, width: '100%'}}
      />
    );

  if (error)
    return (
      <ApiErrorMessage
        title="Error fetching likes"
        message={error && error.message}
        onRetry={() => refetch()}
      />
    );

  const likes =
    data?.likesForPostByUser?.items.filter(like => !like?._deleted) || [];

  return (
    <FlatList
      data={likes}
      renderItem={({item}) => item?.User && <UserListItem user={item.User} />}
      refreshing={loading}
      onRefresh={() => refetch()}
    />
  );
};

export default PostLikesScreen;
