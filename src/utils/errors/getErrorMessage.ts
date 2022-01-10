import { errors } from '@constants';

export const getErrorMessage = (errorCode: string | null) => {
  if (errorCode && errorCode in errors) {
    const message = errors[errorCode];

    return message;
  }

  const message = errors.DEFAULT;

  return message;
};
