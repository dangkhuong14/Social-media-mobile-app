import {View, StyleSheet} from 'react-native';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';

const App = () => {
  return (
    <View style={styles.app}>
      <ProfileScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    paddingTop: 10,
  },
});

export default App;
