import {CognitoUser} from 'amazon-cognito-identity-js';
import {Auth, Hub} from 'aws-amplify';
import {useState, createContext, ReactNode, useContext, useEffect} from 'react';

type UserType = CognitoUser | undefined | null;

type AuthContextType = {
  user: UserType;
  userId: string;
};

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  userId: '',
});

const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<CognitoUser | undefined | null>(undefined);

  const checkUser = async () => {
    try {
      // query user that currently logged in and still in session
      const authUser = await Auth.currentAuthenticatedUser({
        // take user from incognito not from local cache
        bypassCache: true,
      });
      setUser(authUser);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  //Listen to amplify event
  useEffect(() => {
    const listener = data => {
      const {event} = data.payload;
      if (event === 'signOut') {
        setUser(null);
      }
      if (event === 'signIn') {
        checkUser();
      }
    };
    const hubListenerCancelToken = Hub.listen('auth', listener);

    return () => hubListenerCancelToken();
  }, []);

  return (
    <AuthContext.Provider value={{user, userId: user?.attributes?.sub}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
