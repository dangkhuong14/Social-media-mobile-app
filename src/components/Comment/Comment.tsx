import {useState} from 'react';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import {Comment as CommentType} from '../../API';
import {DEFAULT_USER_IMAGE} from '../../config';

interface ICommentProps {
  comment: CommentType;
  includeDetail?: boolean;
}

const Comment = ({comment, includeDetail = false}: ICommentProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLikeButton = () => setIsLiked(v => !v);

  return (
    <View style={styles.comment}>
      {includeDetail && (
        <Image
          source={{uri: comment.User?.image || DEFAULT_USER_IMAGE}}
          style={styles.avatar}
        />
      )}
      <View style={styles.middleColumn}>
        <Text style={styles.commentText}>
          <Text style={styles.bold}>{comment.User?.username} </Text>
          {comment.comment}
        </Text>
        {includeDetail && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>2d</Text>
            <Text style={styles.footerText}>5 likes</Text>
            <Text style={styles.footerText}>Reply</Text>
          </View>
        )}
      </View>
      <Pressable onPress={toggleLikeButton} hitSlop={5}>
        <AntDesign
          name={isLiked ? 'heart' : 'hearto'}
          style={styles.icon}
          color={isLiked ? colors.accent : colors.black}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    color: colors.black,
    lineHeight: 18,
  },

  middleColumn: {
    flex: 1,
  },

  commentText: {
    color: colors.black,
    lineHeight: 18,
  },

  footer: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  footerText: {
    marginRight: 10,
  },

  bold: {
    fontWeight: fonts.weight.bold,
  },

  icon: {
    marginHorizontal: 10,
  },

  avatar: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 25,
    marginHorizontal: 10,
  },
});

export default Comment;
