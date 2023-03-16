import {ActivityIndicator, View} from 'react-native';
import ProfileHeader from './ProfileHeader';
import FeedGridView from '../../components/FeedGridView/FeedGridView';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  MyProfileNavigationProp,
  UserProfileNavigationProp,
  MyProfileRouteProp,
  UserProfileRouteProp,
} from '../../types/navigation';
import {useQuery} from '@apollo/client';
import {getUser} from './queries';
import ApiErrorMessage from '../../components/ApiErrorMessage';
import colors from '../../theme/colors';
import {GetUserQuery, GetUserQueryVariables} from '../../API';
import {useAuthContext} from '../../contexts/AuthContext';

const ProfileScreen = () => {
  const navigation = useNavigation<
    MyProfileNavigationProp | UserProfileNavigationProp
  >();
  const route = useRoute<MyProfileRouteProp | UserProfileRouteProp>();
  const {userId: currentUserId} = useAuthContext();

  const userId = route.params?.userId || currentUserId;
  // query the user with userId

  const {data, loading, error, refetch} = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {
    variables: {id: userId},
  });

  const user = data?.getUser;

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={{flex: 1, width: '100%'}}
      />
    );

  if (error || !user)
    return (
      <ApiErrorMessage
        title="Error fetching user's data"
        message={error?.message || 'User not found'}
        onRetry={() => refetch()}
      />
    );

  return (
    <View>
      <FeedGridView
        data={user.Posts?.items || []}
        ListHeaderComponent={() => <ProfileHeader user={user} />}
        refetch={refetch}
        loading={loading}
      />
    </View>
  );
};

export default ProfileScreen;
