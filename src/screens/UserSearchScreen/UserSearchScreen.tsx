import {ActivityIndicator, FlatList} from 'react-native';
import UserListItem from '../../components/UserListItem';
import {useQuery} from '@apollo/client';
import {listUsers} from './queries';
import {ListUsersQuery, ListUsersQueryVariables} from '../../API';
import ApiErrorMessage from '../../components/ApiErrorMessage';
import colors from '../../theme/colors';

const UserSearchScreen = () => {
  const {data, loading, error, refetch} = useQuery<
    ListUsersQuery,
    ListUsersQueryVariables
  >(listUsers);

  const users = (data?.listUsers?.items || []).filter(
    user => user && !user._deleted,
  );

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={{flex: 1, width: '100%'}}
      />
    );

  if (error || !users)
    return (
      <ApiErrorMessage
        title="Error fetching the users"
        message={error?.message || 'Users not found'}
        onRetry={() => refetch()}
      />
    );

  return (
    <FlatList
      data={users}
      renderItem={({item}) =>
        item && <UserListItem key={item.id} user={item} />
      }
      onRefresh={() => refetch()}
      refreshing={loading}
    />
  );
};

export default UserSearchScreen;
