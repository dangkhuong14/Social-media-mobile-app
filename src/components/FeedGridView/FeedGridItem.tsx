import {View, Image, StyleSheet} from 'react-native';
import {IPost} from '../../types/models';
import colors from '../../theme/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const FeedGridItem = ({post}: {post: IPost}) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        source={{uri: post.image || post.images[0]}}
        style={styles.image}
      />
      {post.images && (
        <MaterialIcons
          name="collections"
          size={16}
          color={colors.white}
          style={styles.icon}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: '33.33%',

    padding: 1,
  },

  image: {
    flex: 1,
  },

  icon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export default FeedGridItem;
