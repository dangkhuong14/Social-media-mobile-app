import {Text, Pressable, StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

interface IButton {
  text?: string;
  inline?: boolean;
  onPress?: () => void;
}

const Button = ({text = '', inline = false, onPress = () => {}}: IButton) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.buttonContainer, inline ? {flex: 1} : {}]}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
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
