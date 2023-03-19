import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

const styles = StyleSheet.create({
  page: {
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 100,
  },
  textButton: {
    color: colors.primary,
    fontWeight: fonts.weight.semi,
    fontSize: fonts.size.md,

    margin: 10,
  },

  dangerButton: {
    color: colors.error,
    fontWeight: fonts.weight.semi,
    fontSize: fonts.size.md,

    margin: 10,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  label: {
    width: 80,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: colors.border,
  },

  errorText: {
    color: colors.error,
  },
});

export default styles;
