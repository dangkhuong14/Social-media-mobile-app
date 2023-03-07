import {CognitoUser} from 'amazon-cognito-identity-js';
import {Auth, Hub} from 'aws-amplify';
import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from 'react';

type UserType = CognitoUser | undefined | null;

type AuthContextType = {
  user: UserType;
  setUser: Dispatch<SetStateAction<UserType>>;
};

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  setUser: () => {},
});

const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<CognitoUser | undefined | null>(undefined);

  useEffect(() => {
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
    checkUser();
  }, []);

  //Listen to amplify event
  useEffect(() => {
    const listener = data => {
      const {event} = data.payload;
      if (event === 'signOut') {
        setUser(null);
      }
    };
    const hubListenerCancelToken = Hub.listen('auth', listener);

    return () => hubListenerCancelToken();
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
