import {Text, View, Image, StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from './styles'

const FeedPost = () => {
  return (
    <View style={styles.post}>
      {/* Header */}

      <View style={styles.header}>
        <Image
          style={styles.userAvatar}
          source={{
            uri: 'https://mobimg.b-cdn.net/v3/fetch/d5/d55df39017a436b82f7ce4ffca77ad7c.jpeg',
          }}
        />
        <Text style={styles.userName}>Đăng Khương</Text>
        <Entypo
          name="dots-three-horizontal"
          size={16}
          style={styles.threeDots}
        />
      </View>

      {/* Content */}

      <Image
        source={{
          uri: 'https://images.wallpapersden.com/image/download/village-scenery-digital-art_bGltaGmUmZqaraWkpJRobWllrWdma2U.jpg',
        }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.iconContainer}>
        <AntDesign
          name={'hearto'}
          size={24}
          style={styles.icon}
          color={colors.black}
        />
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

        <Text style={styles.text}>
          Liked by {''} 
          <Text style={styles.bold}>Gia Huy</Text>
          {' '}and
          <Text style={styles.bold}> 120 others</Text>
        </Text>

        {/* Post description */}

        <Text style={styles.text}>
          <Text style={styles.bold}>Đăng Khương</Text> Amet occaecat ex irure nostrud cupidatat qui
            tempor cupidatat fugiat ut eiusmod eu. Occaecat consequat adipisicing irure amet. Ipsum 
            tempor occaecat reprehenderit non nulla nostrud consequat ad. Ex sit ad ea proident veniam
            aliquip ipsum. Sunt eu sint laboris sit culpa mollit dolor minim dolor ex sunt laboris mollit.
        </Text>

        {/* Post's comments */}
        <Text>View all 30 comments</Text>
        <View style={styles.comment}>
          <Text style={styles.commentText}>
            Lorem ipsum dolor sit amet, consectetur adipis, sed do eiusmod tempor incid
          </Text>
          <AntDesign
            name={'hearto'}
            style={styles.icon}
            color={colors.black}
          />
        </View>
        <Text>2 February, 2023</Text>
      </View>
      
    </View>
  );
};

export default FeedPost;
