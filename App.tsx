import {View, StyleSheet} from 'react-native';
import PostUploadScreen from './src/screens/PostUploadScreen/PostUploadScreen';

const App = () => {
  return (
    <View style={styles.app}>
      <PostUploadScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});

export default App;
