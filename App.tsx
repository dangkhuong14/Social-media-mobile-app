import {View, ScrollView, StyleSheet} from 'react-native';
import FeedPost from './src/components/FeedPost';

const post = {
  id: '1',
  createdAt: '19 December 2021',
  image:
    'https://images.wallpapersden.com/image/download/village-scenery-digital-art_bGltaGmUmZqaraWkpJRobWllrWdma2U.jpg',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic repellendus unde blanditiis. Eos fugiat dolorem ea fugit aut sapiente corrupti autem dolores deleniti architecto, omnis, amet unde dignissimos quam minima?',
  user: {
    id: '1',
    image:
      'https://mobimg.b-cdn.net/v3/fetch/d5/d55df39017a436b82f7ce4ffca77ad7c.jpeg',
    username: 'Đăng Khương',
    name: 'Khuong',
  },
  nofComments: 11,
  nofLikes: 33,
  comments: [
    {
      id: '1',
      comment: 'Hello there',
      user: {
        username: 'Gia Huy',
        id: '2',
        name: 'Huy',
      },
    },
    {
      id: '2',
      comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. H',
      user: {
        id: '3',
        username: 'Phát Minh',
        name: 'Minh',
      },
    },
  ],
};

const App = () => {
  return (
    <ScrollView style={styles.app}>
      <FeedPost post={post} />
      {/* <FeedPost post={post} /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});

export default App;
