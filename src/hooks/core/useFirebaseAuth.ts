import { useState, useEffect } from 'react';
import { Firebase } from '@firebase';

interface IStatus {
  error: string | null;
}

interface IFormatAuthUser {
  uid: string;
  email: string | null;
}

export interface IUserCredentialWithStatus {
  data: void | Firebase.auth.UserCredential;
  status: IStatus;
}

const formatAuthUser = ({ uid, email }: IFormatAuthUser) => ({
  uid,
  email,
});

export function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<IFormatAuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const status: IStatus = {
    error: null,
  };

  const authStateChanged = async (authState: Firebase.User | null) => {
    if (!authState) {
      setAuthUser(null);

      return;
    }

    const formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
  };

  const prepareToAction = () => {
    setIsLoading(true);
  };

  const clear = () => {
    setAuthUser(null);
    setIsLoading(false);
  };

  const signInWithEmailAndPassword = async (
    email: string,
    password: string,
  ): Promise<IUserCredentialWithStatus> => {
    prepareToAction();

    const resp = await Firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((err) => {
        status.error ??= err.code;
      })
      .finally(() => {
        setIsLoading(false);
      });

    return {
      data: resp,
      status,
    };
  };

  const createUserWithEmailAndPassword = async (
    email: string,
    password: string,
  ): Promise<IUserCredentialWithStatus> => {
    prepareToAction();

    const resp = await Firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        status.error ??= err.code;
      })
      .finally(() => {
        setIsLoading(false);
      });

    return {
      data: resp,
      status,
    };
  };

  const signOut = () => Firebase.auth().signOut().then(clear);

  useEffect(() => {
    const unsubscribe = Firebase.auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    isLoading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
  };
}
