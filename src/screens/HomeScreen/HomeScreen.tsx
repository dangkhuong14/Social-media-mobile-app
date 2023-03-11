import {FlatList, ViewToken, ViewabilityConfig} from 'react-native';
import {useRef, useState, useEffect} from 'react';
// import posts from '../../assets/data/posts.json';
import FeedPost from '../../components/FeedPost';
import {API, graphqlOperation} from 'aws-amplify';

export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        image
        images
        video
        nofLikes
        nofComments
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        User {
          id
          name
          username
          image
        }
        Comments {
          items {
            id
            comment
            User {
              id
              name
              username
            }
          }
        }
      }
      nextToken
      startedAt
    }
  }
`;

const HomeScreen = () => {
  const [visibleItemId, setVisibleItemId] = useState<string | null>(null);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await API.graphql(graphqlOperation(listPosts));
    console.log(response);
    setPosts(response.data.listPosts.items);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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

  return (
    <FlatList
      data={posts}
      renderItem={({item}) => (
        <FeedPost
          post={item}
          isVisible={visibleItemId === item.id ? true : false}
        />
      )}
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig}
    />
  );
};

export default HomeScreen;
