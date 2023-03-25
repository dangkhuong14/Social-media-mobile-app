import {View, Image, StyleSheet, TextInput, Alert} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CreateNavigationProp, CreateRouteProp} from '../../types/navigation';
import colors from '../../theme/colors';
import Button from '../../components/Button/Button';
import {useMutation} from '@apollo/client';
import {CreatePostMutation, CreatePostMutationVariables} from '../../API';
import {createPost} from './queries';
import {useAuthContext} from '../../contexts/AuthContext';
import Carousel from '../../components/Carousel';
import VideoPlayer from '../../components/VideoPlayer';

const CreatePostScreen = () => {
  const [description, setDescription] = useState('');

  const navigation = useNavigation<CreateNavigationProp>();
  const route = useRoute<CreateRouteProp>();

  const [doCreatePost] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(createPost);

  const {userId} = useAuthContext();

  const {image, images, video} = route.params;

  const submit = async () => {
    try {
      const response = await doCreatePost({
        variables: {
          input: {
            description,
            image,
            images,
            video,
            nofLikes: 0,
            nofComments: 0,
            userID: userId,
          },
        },
      });
      setDescription('');

      navigation.popToTop();
      navigation.navigate('Feed');
    } catch (err) {
      Alert.alert('Error creating post', (err as Error).message);
    }
  };

  let content = null;
  if (image) {
    content = (
      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
        resizeMode="cover"
      />
    );
  } else if (images) {
    content = (
      <View style={styles.carouselContainer}>
        <Carousel images={images} />
      </View>
    );
  } else if (video) {
    content = <VideoPlayer uri={video} />;
  }

  return (
    <View style={styles.root}>
      {content}
      <View style={styles.inputContainer}>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
          style={styles.input}
          multiline
        />
      </View>
      <Button text="Submit" onPress={submit} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  },

  image: {
    height: 200,
    aspectRatio: 1,
  },

  input: {
    alignSelf: 'stretch',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
  },

  inputContainer: {
    width: '100%',
    padding: 10,
  },

  carouselContainer: {width: '100%', aspectRatio: 1},
});

export default CreatePostScreen;
