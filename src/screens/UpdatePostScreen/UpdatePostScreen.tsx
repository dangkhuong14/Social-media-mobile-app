import {
  View,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  UpdatePostNavigationProp,
  UpdatePostRouteProp,
} from '../../types/navigation';
import colors from '../../theme/colors';
import Button from '../../components/Button/Button';
import {useMutation, useQuery} from '@apollo/client';
import {getPost, updatePost} from './queries';
import {
  GetPostQuery,
  GetPostQueryVariables,
  UpdatePostMutation,
  UpdatePostMutationVariables,
} from '../../API';
import ApiErrorMessage from '../../components/ApiErrorMessage';

const UpdatePostScreen = () => {
  const [description, setDescription] = useState('');

  const navigation = useNavigation<UpdatePostNavigationProp>();
  const route = useRoute<UpdatePostRouteProp>();
  const {id} = route.params;
  const {data, error, loading, refetch} = useQuery<
    GetPostQuery,
    GetPostQueryVariables
  >(getPost, {variables: {id}});

  const [doUpdatePost, {error: updateError, data: updateData}] = useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(updatePost);

  useEffect(() => {
    setDescription(data?.getPost?.description || '');
  }, [data]);

  useEffect(() => {
    if (updateData) {
      setDescription('');
      navigation.popToTop();
      navigation.navigate('Feed');
    }
  }, [updateData]);

  const submit = () => {
    doUpdatePost({
      variables: {
        input: {
          id,
          description,
          _version: data?.getPost?._version,
        },
      },
    });
  };

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={{flex: 1, width: '100%'}}
      />
    );

  if (error || updateError)
    return (
      <ApiErrorMessage
        title="Error fetching posts"
        message={error?.message || updateError?.message}
        onRetry={() => refetch()}
      />
    );

  return (
    <View style={styles.root}>
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
export default UpdatePostScreen;
