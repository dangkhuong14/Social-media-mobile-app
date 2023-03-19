import {
  Text,
  Image,
  ActivityIndicator,
  Pressable,
  Keyboard,
  Alert,
} from 'react-native';
import {useEffect, useState} from 'react';
import colors from '../../theme/colors';
import {useForm} from 'react-hook-form';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UsersByUsernameQuery,
  UsersByUsernameQueryVariables,
} from '../../API';
import {useMutation, useQuery, useLazyQuery} from '@apollo/client';
import {deleteUser, getUser, updateUser, usersByUsername} from './queries';
import {useAuthContext} from '../../contexts/AuthContext';
import ApiErrorMessage from '../../components/ApiErrorMessage';
import {DEFAULT_USER_IMAGE} from '../../config';
import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';
import styles from './styles';
import CustomInput, {IEditableUser} from './CustomInput';

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const EditProfileScreen = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<null | Asset>(null);
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<IEditableUser>();

  const {userId, user: authUser} = useAuthContext();

  const {data, loading, error, refetch} = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {variables: {id: userId}});

  const [doUpdateUser, {loading: updateLoading, error: updateError}] =
    useMutation<UpdateUserMutation, UpdateUserMutationVariables>(updateUser);

  const user = data?.getUser;

  const [
    doDeleteUser,
    {data: deleteData, loading: deleteLoading, error: deleteError},
  ] = useMutation<DeleteUserMutation, DeleteUserMutationVariables>(deleteUser);

  const [
    doValidateUsername,
    {data: validateData, loading: validateLoading, error: validateError},
  ] = useLazyQuery<UsersByUsernameQuery, UsersByUsernameQueryVariables>(
    usersByUsername,
  );

  useEffect(() => {
    if (user?.name) setValue('name', user?.name);
    setValue('bio', user?.bio);
    setValue('website', user?.website);
    if (user?.username) setValue('username', user?.username);
  }, [user]);

  const onSubmit = async (formData: IEditableUser) => {
    console.log('Submitted', data);
    await doUpdateUser({
      variables: {input: {id: userId, ...formData, _version: user?._version}},
    });
    navigation.goBack();
  };

  const confirmDelete = () => {
    Alert.alert(
      'This will delete this user',
      'Do you want to continue this action',
      [
        {
          text: 'Yes, delete',
          style: 'destructive',
          onPress: onDeleteUser,
        },

        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  const onDeleteUser = async () => {
    if (user) {
      // Delete DynamoDB user
      await doDeleteUser({
        variables: {input: {id: userId, _version: user._version}},
      });

      // Delete Cognito user
      authUser?.deleteUser(err => {
        if (err) console.warn(err);

        Auth.signOut();
      });
    }
  };

  const onPhotoChange = () => {
    launchImageLibrary(
      {mediaType: 'photo'},
      ({didCancel, errorCode, assets}) => {
        if (!didCancel && !errorCode && assets && assets.length > 0) {
          setSelectedPhoto(assets[0]);
        }
      },
    );
  };

  const validateUsername = async (username: string) => {
    try {
      const response = await doValidateUsername({variables: {username}});
      const users = response.data?.usersByUsername?.items;
      if (response.error) {
        Alert.alert('Failed to fetch username');
        return 'Failed to fetch username';
      }
      // if username exists and user ID is different from authenticated user ID
      if (users && users.length > 0 && users[0]?.id !== userId) {
        return 'username has already been taken';
      }
    } catch (err) {
      Alert.alert('Failed to fetch username');
    }
  };

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={{flex: 1, width: '100%'}}
      />
    );

  if (error || updateError || deleteError)
    return (
      <ApiErrorMessage
        title={error ? 'Error fetching the user' : 'Error updating user'}
        message={error?.message || updateError?.message}
        onRetry={() => refetch()}
      />
    );

  return (
    <Pressable style={styles.page} onPress={() => Keyboard.dismiss()}>
      <Image
        source={{uri: selectedPhoto?.uri || user?.image || DEFAULT_USER_IMAGE}}
        style={styles.image}
      />
      <Text onPress={onPhotoChange} style={styles.textButton}>
        Change profile photo
      </Text>
      <CustomInput
        name="name"
        control={control}
        label="Name"
        rules={{required: 'This field need to be filled'}}
      />
      <CustomInput
        name="username"
        control={control}
        label="Username"
        rules={{
          required: 'This field need to be filled',
          minLength: {value: 3, message: 'At least 3 characters'},
          validate: validateUsername,
        }}
      />
      <CustomInput
        name="website"
        control={control}
        label="Website"
        rules={{pattern: {value: URL_REGEX, message: 'Invalid URL'}}}
      />
      <CustomInput
        name="bio"
        control={control}
        label="Bio"
        multiline
        rules={{
          maxLength: {
            value: 200,
            message: 'Bio should be less than 200 characters',
          },
        }}
      />

      {/* Button */}

      <Text style={styles.textButton} onPress={handleSubmit(onSubmit)}>
        {updateLoading ? 'Submitting...' : 'Submit'}
      </Text>
      <Text style={styles.dangerButton} onPress={confirmDelete}>
        {deleteLoading ? 'Deleting...' : 'Delete'}
      </Text>
    </Pressable>
  );
};

export default EditProfileScreen;
