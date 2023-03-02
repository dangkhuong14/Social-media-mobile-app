import {View, Text, Image} from 'react-native';
import user from '../../assets/data/user.json';
import styles from './styles';
import Button from '../../components/Button/Button';
import {useNavigation} from '@react-navigation/native';

const ProfileHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      {/* header */}

      <View style={styles.headerRow}>
        <Image style={styles.avatar} source={{uri: user.image}} />
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>32</Text>
          <Text>Post</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>113</Text>
          <Text>Followers</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>11</Text>
          <Text>Followings</Text>
        </View>
      </View>

      {/* description */}

      <Text style={styles.name}>{user.name}</Text>
      <Text>{user.bio}</Text>

      {/* buttons */}

      <View style={styles.buttonContainer}>
        <Button text="Edit profile" />
        <Button
          onPress={() => navigation.popToTop()}
          text="Go back to home page"
        />
      </View>
    </View>
  );
};

export default ProfileHeader;
