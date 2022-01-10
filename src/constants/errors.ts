interface IErrors {
  [key: string]: string
}

export const errors: IErrors = {
  'auth/user-not-found': 'Endereço de e-mail não cadastrado.',
  DEFAULT: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
};
