import Navitgation from './src/navigation';
import {Amplify} from 'aws-amplify';
import awsExports from './src/aws-exports';
import AuthContextProvider from './src/contexts/AuthContext';

Amplify.configure(awsExports);

const App = () => {
  return (
    <AuthContextProvider>
      <Navitgation />
    </AuthContextProvider>
  );
};

export default App;
