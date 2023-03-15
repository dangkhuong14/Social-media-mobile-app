import {
  ActivityIndicator,
  FlatList,
  Text,
  ViewToken,
  ViewabilityConfig,
} from 'react-native';
import {useRef, useState} from 'react';
import FeedPost from '../../components/FeedPost';
import ApiErrorMessage from '../../components/ApiErrorMessage/ApiErrorMessage';
import {useQuery} from '@apollo/client';
import colors from '../../theme/colors';
import {listPosts} from './queries';
import {ListPostsQuery, ListPostsQueryVariables} from '../../API';

const HomeScreen = () => {
  const [visibleItemId, setVisibleItemId] = useState<string | null>(null);
  const {data, loading, error, refetch} = useQuery<
    ListPostsQuery,
    ListPostsQueryVariables
  >(listPosts);

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0) {
        setVisibleItemId(viewableItems[0].item.id);
      }
    },
  );

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
        title="Error fetching posts"
        message={error && error.message}
        onRetry={refetch}
      />
    );

  const posts = data?.listPosts?.items || [];

  return (
    <FlatList
      data={posts}
      renderItem={({item}) =>
        item && (
          <FeedPost
            post={item}
            isVisible={visibleItemId === item.id ? true : false}
          />
        )
      }
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig}
    />
  );
};

export default HomeScreen;
