import * as yup from 'yup';

export const SignIn = yup.object({
  email: yup
    .string()
    .email('O e-mail precisa ser válido.')
    .required('O e-mail é obrigatório.'),
  password: yup
    .string()
    .min(4, 'A senha precisa ter no mínimo 4 caracteres.')
    .required('A senha é obrigatória.'),
});
