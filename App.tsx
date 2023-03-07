import Navitgation from './src/navigation';
import {Amplify} from 'aws-amplify';
import awsExports from './src/aws-exports';
import {withAuthenticator} from '@aws-amplify/ui-react-native';

Amplify.configure(awsExports);

const App = () => {
  return <Navitgation />;
};

export default withAuthenticator(App);
