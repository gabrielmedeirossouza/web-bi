import { createContext, ReactNode } from 'react';
import { useFirebaseAuth, IResponseStatus } from '@hooks/core/useFirebaseAuth';

interface IAuthUserProviderProps {
  children: ReactNode;
}

type EmailPasswordCredentials = (email: string, password: string) => Promise<IResponseStatus>;

export const authUserContext = createContext({
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
