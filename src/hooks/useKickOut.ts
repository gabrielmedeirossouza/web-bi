import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './useAuth';

export const useKickOut = () => {
  const { authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authUser) { router.push('/signin'); }
  }, [authUser]);
};
