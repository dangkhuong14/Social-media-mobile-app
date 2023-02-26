import {StyleSheet} from 'react-native';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  avatar: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
    marginBottom: 10,
  },

  numberContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  numberText: {
    fontWeight: fonts.weight.full,
    color: colors.black,
    fontSize: fonts.size.md,
  },

  name: {
    fontWeight: fonts.weight.semi,
    fontSize: fonts.size.md,
  },

  buttonContainer: {
    flexDirection: 'row',
  },
});

export default styles;
