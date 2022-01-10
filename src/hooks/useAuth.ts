import { useContext } from 'react';
import { authUserContext } from '@contexts';

export const useAuth = () => useContext(authUserContext);
