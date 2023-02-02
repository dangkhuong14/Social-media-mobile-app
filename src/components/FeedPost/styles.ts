import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

const styles = StyleSheet.create({
  post: {
    
  },

  // -----Header------
  header: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: 10,
  },

  userAvatar: {
    height: 50,
    width: 50,
    borderRadius: 25,

    marginRight: 10,
  },

  userName: {
    fontWeight: fonts.weight.bold,
    color: colors.black,
  },

  threeDots: {
    // Full left margin
    marginLeft: 'auto',
  },

  // -----Content------

  image: {
    width: '100%',
    aspectRatio: 1,
  },

  // ------Footer------

  footer: {
    padding: 10,
  },

  iconContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },

  icon: {
    marginHorizontal: 5,
  },

  text: {
    color: colors.black,
    lineHeight: 18,
  },

  bold: {
    fontWeight: fonts.weight.bold,
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
});

export default styles;
