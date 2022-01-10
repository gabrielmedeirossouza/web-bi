import { NextPage } from 'next';
import { useAuth, useKickOut } from '@hooks';
import {
  Text, Flex, Box, Avatar,
} from '@chakra-ui/react';
import { AppForm } from '@components';

const Dashboard: NextPage = () => {
  useKickOut();

  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Box
      w="100vw"
      h="100vh"
      bg="blackAlpha.300"
      p="8"
    >
      <Flex
        w="100%"
        h="100%"
        bg="gray.900"
        borderRadius="30"
        overflow="hidden"
      >
        <Flex
          w="100%"
          h="100%"
          maxW="300"
          bg="gray.800"
        >
          <Flex flexDirection="column" w="100%">
            <Flex justify="center" maxW="260px" align="center" mt="10" h="min">
              <Avatar
                w="112px"
                h="112px"
                borderWidth="5px"
                src="https://github.com/gabrielmedeirossouza.png"
                borderColor="purple.700"
                name="Gabriel Souza"
              />
              <Text pl="4">
                Olá,
                <br />
                {' '}
                <Text as="span">Gabriel Souza</Text>
              </Text>
            </Flex>

            <AppForm.Button
              mt="auto"
              mb="6"
              alignSelf="center"
              w="100%"
              maxW="80%"
              text="Sair"
              onClick={handleSignOut}
            />
          </Flex>
        </Flex>

        <Flex
          w="100%"
        />
      </Flex>
    </Box>
  );
};

export default Dashboard;
