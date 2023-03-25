import {Linking} from 'react-native';
import Navitgation from './src/navigation';
import {Amplify} from 'aws-amplify';
import awsExports from './src/aws-exports';
import AuthContextProvider from './src/contexts/AuthContext';
import Client from './src/apollo/Client';
import {MenuProvider} from 'react-native-popup-menu';

// ------------------Theses comments is used for in-app browser which didn't work as expected-----------------------------------
// import {InAppBrowser} from 'react-native-inappbrowser-reborn';

// const urlOpener = async (url: string, redirectUrl: string) => {
//   await InAppBrowser.isAvailable();
//   const response = await InAppBrowser.openAuth(url, redirectUrl, {
//     showTitle: false,
//     enableUrlBarHiding: true,
//     enableDefaultShare: false,
//     ephemeralWebSession: false,
//   });

//   if (response.type === 'success') {
//     Linking.openURL(response.url);
//   }
// };

// Amplify.configure({
//   ...awsExports,
//   oauth: {
//     ...awsExports.oauth,
//     urlOpener,
//   },
// });

Amplify.configure(awsExports);

const App = () => {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <Client>
          <Navitgation />
        </Client>
      </AuthContextProvider>
    </MenuProvider>
  );
};

export default App;
