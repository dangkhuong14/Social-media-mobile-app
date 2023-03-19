import {View, Text, TextInput} from 'react-native';
import styles from './styles';
import {User} from '../../API';
import {Control, Controller} from 'react-hook-form';
import colors from '../../theme/colors';

type IEditableUserField = 'name' | 'bio' | 'website' | 'username';
export type IEditableUser = Pick<User, IEditableUserField>;

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

export default CustomInput;
