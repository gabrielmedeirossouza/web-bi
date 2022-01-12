import { useState, useEffect } from 'react';

import { firebaseApp } from '@firebase';
import {
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signOut as firebaseSignOut,
  getAuth,
  User,
} from 'firebase/auth';
import { useRouter } from 'next/router';

export interface IResponseStatus {
  error: {
    code: string | null;
    message: string | null;
  }
}

export function useFirebaseAuth() {
  const firebaseAuth = getAuth(firebaseApp);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const error = {
    code: null,
    message: null,
  };

  const authStateChanged = async (authState: User | null) => {
    if (!authState) {
      router.push('/signin');
    }
  };

  const prepareToAction = () => {
    setIsLoading(true);
  };

  const clear = () => {
    setIsLoading(false);
  };

  const signInWithEmailAndPassword = async (email: string, password: string) => {
    prepareToAction();

    await firebaseSignInWithEmailAndPassword(firebaseAuth, email, password)
      .catch((err) => {
        error.code ??= err.code;
        error.message ??= err.message;
      })
      .finally(() => {
        setIsLoading(false);
      });

    return { error };
  };

  const createUserWithEmailAndPassword = async (email: string, password: string) => {
    prepareToAction();

    await firebaseCreateUserWithEmailAndPassword(firebaseAuth, email, password)
      .catch((err) => {
        error.code ??= err.code;
        error.message ??= err.message;
      })
      .finally(() => {
        setIsLoading(false);
      });

    return { error };
  };

  const signOut = () => firebaseSignOut(firebaseAuth).then(clear);

  useEffect(() => {
    const unsubscribe = firebaseOnAuthStateChanged(firebaseAuth, authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    isLoading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
  };
}
