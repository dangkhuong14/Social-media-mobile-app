import {useState} from 'react';
import {View, Text, TextInput, Image, StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

const CommentsInput = () => {
  const [commentText, setCommentText] = useState('');

  const onPost = () => {
    console.warn(commentText);

    setCommentText('');
  };
  return (
    <View style={styles.root}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
        }}
      />
      <TextInput
        value={commentText}
        style={styles.input}
        placeholder="Write your comment here"
        onChangeText={setCommentText}
        multiline
      />
      <Text style={styles.button} onPress={onPost}>
        POST
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderColor: colors.border,

    padding: 5,
  },

  image: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 25,
  },

  input: {
    flex: 1,
    // IOS
    alignSelf: 'center',

    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,

    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 5,
    paddingRight: 50,
  },

  button: {
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 10,

    fontSize: fonts.size.s,
    fontWeight: fonts.weight.full,
    color: colors.primary,

    right: 5,
    bottom: 18,
  },
});

export default CommentsInput;
