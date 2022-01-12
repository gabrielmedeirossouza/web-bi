import { NextPage } from 'next';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAuth } from '@hooks';

import { SignIn as schema } from '@schemas';
import { getErrorMessage } from '@utils';

import { AppForm } from '@components';
import {
  Box, Flex, Text, useToast,
} from '@chakra-ui/react';

interface IFormInputs {
  email: string;
  password: string;
}

const SignIn: NextPage = () => {
  const { signInWithEmailAndPassword, isLoading } = useAuth();
  const router = useRouter();
  const toast = useToast();

  const { register, handleSubmit, formState } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ email, password }: IFormInputs) => {
    const { error } = await signInWithEmailAndPassword(email, password);

    if (error.code) {
      const errorMessage = getErrorMessage(error.code);
      toast({
        title: errorMessage,
        status: 'error',
        isClosable: true,
        position: 'top-right',
        duration: 10000,
      });

      return;
    }

    router.push('/dashboard');
  };

  return (
    <Flex
      as="form"
      w="100vw"
      h="100vh"
      align="center"
      flexDirection="column"
      justifyContent="center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Flex
        w="100%"
        p="8"
        bg="gray.800"
        maxW="450"
        direction="column"
        borderRadius="12px"
      >
        <Box pb="12">
          <Text fontSize="1.25rem">
            Faça login em sua conta para acessar o
            {' '}
            <Box as="br" />
            <Text
              as="span"
              color="green.400"
              textDecor="underline"
              fontSize="1.5rem"
              fontWeight="black"
            >
              System BI

            </Text>
            .
          </Text>
        </Box>

        <AppForm.Input
          name="email"
          label="E-mail"
          placeholder="Digite seu e-mail"
          pb="6"
          register={{ ...register('email') }}
          error={formState.errors?.email}
        />

        <AppForm.Input
          name="password"
          label="Senha"
          placeholder="Digite sua senha"
          pb="8"
          inputType="password"
          register={{ ...register('password') }}
          error={formState.errors?.password}
        />

        <AppForm.Button text="Entrar" isLoading={isLoading} />
      </Flex>
    </Flex>
  );
};

export default SignIn;
