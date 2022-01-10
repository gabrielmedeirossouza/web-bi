import { createContext, ReactNode } from 'react';
import { useFirebaseAuth, IUserCredentialWithStatus } from '@hooks/core/useFirebaseAuth';

interface IAuthUserProviderProps {
  children: ReactNode;
}

interface IFormatAuthUser {
  uid: string;
  email: string | null;
}

type EmailPasswordCredentials = (email: string, password: string) => Promise<IUserCredentialWithStatus>;

export const authUserContext = createContext({
  authUser: null as IFormatAuthUser | null,
  isLoading: false,
  signInWithEmailAndPassword: {} as EmailPasswordCredentials,
  createUserWithEmailAndPassword: {} as EmailPasswordCredentials,
  signOut: {} as () => void,
});

export const AuthUserProvider = ({ children }: IAuthUserProviderProps) => {
  const auth = useFirebaseAuth();

  return (
    <authUserContext.Provider value={auth}>
      { children }
    </authUserContext.Provider>
  );
};
