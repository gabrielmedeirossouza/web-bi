import {
  Button as ChakraButton, ButtonProps,
} from '@chakra-ui/react';

interface IButtonProps extends ButtonProps {
  text: string;
}

export const Button = ({ text, ...props }: IButtonProps) => {
  return (
    <ChakraButton
      size="lg"
      bg="purple.700"
      type="submit"
      _hover={{ bgColor: 'purple.500' }}
      {...props}
    >
      {text}
    </ChakraButton>
  );
};
