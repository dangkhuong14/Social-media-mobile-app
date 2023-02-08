import {View, Text, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import {IComment} from '../../types/models';

interface ICommentProps {
  comment: IComment;
}

const Comment = ({comment}: ICommentProps) => {
  return (
    <View>
      <View style={styles.comment}>
        <Text style={styles.commentText}>
          <Text style={styles.bold}>{comment.user.username} </Text>
          {comment.comment}
        </Text>
        <AntDesign name={'hearto'} style={styles.icon} color={colors.black} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.black,
    lineHeight: 18,
  },

  comment: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  commentText: {
    color: colors.black,
    flex: 1,
    lineHeight: 18,
  },

  bold: {
    fontWeight: fonts.weight.bold,
  },

  icon: {
    marginHorizontal: 5,
  },
});

export default Comment;
