import Navitgation from './src/navigation';
import {Amplify} from 'aws-amplify';
import config from './src/aws-exports';

Amplify.configure(config);

const App = () => {
  return <Navitgation />;
};

export default App;
