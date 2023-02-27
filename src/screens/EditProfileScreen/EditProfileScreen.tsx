import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import {useState} from 'react';
import colors from '../../theme/colors';
import user from '../../assets/data/user.json';
import fonts from '../../theme/fonts';
import {useForm, Controller, Control} from 'react-hook-form';
import {IUser} from '../../types/models';
import {Asset, launchImageLibrary} from 'react-native-image-picker';

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

type IEditableUserField = 'name' | 'bio' | 'website' | 'username';
type IEditableUser = Pick<IUser, IEditableUserField>;

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
              value={value}
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

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IEditableUser>({
    defaultValues: {
      name: user.name,
      username: user.username,
      website: user.website,
      bio: user.bio,
    },
  });

  const onSubmit = (data: IEditableUser) => {
    console.log('Submitted', data);
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

  return (
    <View style={styles.page}>
      <Image
        source={{uri: selectedPhoto?.uri || user.image}}
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
      <Text style={styles.textButton} onPress={handleSubmit(onSubmit)}>
        Submit
      </Text>
    </View>
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
