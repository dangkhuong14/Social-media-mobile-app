import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ActivityIndicator,
  Pressable,
  Keyboard,
  Alert,
} from 'react-native';
import {useEffect, useState} from 'react';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import {useForm, Controller, Control} from 'react-hook-form';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  User,
} from '../../API';
import {useMutation, useQuery} from '@apollo/client';
import {deleteUser, getUser, updateUser} from './queries';
import {useAuthContext} from '../../contexts/AuthContext';
import ApiErrorMessage from '../../components/ApiErrorMessage';
import {DEFAULT_USER_IMAGE} from '../../config';
import {useNavigation} from '@react-navigation/native';
import {onDeleteUser} from '../../graphql/subscriptions';
import {Auth} from 'aws-amplify';

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

type IEditableUserField = 'name' | 'bio' | 'website' | 'username';
type IEditableUser = Pick<User, IEditableUserField>;

interface ICustomInput {
  label: string;
  multiline?: boolean;
  control: Control<IEditableUser, object>;
  name: IEditableUserField;
  rules?: object;
}

const CustomInput = ({
  label,
  multiline = false,
  control,
  name,
  rules,
}: ICustomInput) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({field: {onChange, onBlur, value}, fieldState: {error}}) => {
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{label}</Text>
          <View style={{flex: 1}}>
            <TextInput
              style={[styles.input, error && {borderColor: colors.error}]}
              placeholder={label}
              multiline={multiline}
              value={value || ''}
              onChangeText={onChange}
              onBlur={onBlur}
            />
            {error && (
              <Text style={styles.errorText}>{error.message || 'Error'}</Text>
            )}
          </View>
        </View>
      );
    }}
  />
);

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

const styles = StyleSheet.create({
  page: {
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 100,
  },
  textButton: {
    color: colors.primary,
    fontWeight: fonts.weight.semi,
    fontSize: fonts.size.md,

    margin: 10,
  },

  dangerButton: {
    color: colors.error,
    fontWeight: fonts.weight.semi,
    fontSize: fonts.size.md,

    margin: 10,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  label: {
    width: 80,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: colors.border,
  },

  errorText: {
    color: colors.error,
  },
});

export default EditProfileScreen;
