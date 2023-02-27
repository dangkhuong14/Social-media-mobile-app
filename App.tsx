import {View, StyleSheet} from 'react-native';
import EditProfileScreen from './src/screens/EditProfileScreen/EditProfileScreen';

const App = () => {
  return (
    <View style={styles.app}>
      <EditProfileScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});

export default App;
