import { NextPage } from 'next';
import { useAuth } from '@hooks';
import { Button } from '@chakra-ui/react';

const Dashboard: NextPage = () => {
  const { signOut } = useAuth();

  return (
    <Button variant="link" onClick={signOut}>
      Sair
    </Button>
  );
};

export default Dashboard;
