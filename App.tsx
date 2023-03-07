import Navitgation from './src/navigation';
import {Amplify} from 'aws-amplify';
import awsExports from './src/aws-exports';

Amplify.configure(awsExports);

const App = () => {
  return <Navitgation />;
};

export default App;
