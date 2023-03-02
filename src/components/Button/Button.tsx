import {Text, Pressable, StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

interface IButton {
  text?: string;
  onPress?: () => void;
}

const Button = ({text = '', onPress = () => {}}: IButton) => {
  return (
    <Pressable onPress={onPress} style={styles.buttonContainer}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 5,

    padding: 5,
    margin: 5,
  },

  text: {
    fontWeight: fonts.weight.semi,
    color: colors.black,
    textAlign: 'center',
  },
});

export default Button;
