import {View, Image, StyleSheet, ActivityIndicator} from 'react-native';
import logo from '../../assets/images/logo.png';
import colors from '../../theme/colors';

const WelcomeScreen = () => {
  return (
    <View style={styles.root}>
      <Image source={logo} style={styles.logoImage} resizeMode="contain" />
      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={styles.activityIndicator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoImage: {
    width: 300,
    height: 100,
  },

  activityIndicator: {},
});

export default WelcomeScreen;
