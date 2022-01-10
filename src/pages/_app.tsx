import type { AppProps } from 'next/app';
import { AuthUserProvider } from '@contexts';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { theme } from '@styles/theme';

const WebApp = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={theme}>
    <Box
      as="main"
      minW="100vw"
      minH="100vh"
      bg="gray.900"
    >

      <AuthUserProvider>
        <Component {...pageProps} />
      </AuthUserProvider>

    </Box>
  </ChakraProvider>
);

export default WebApp;
