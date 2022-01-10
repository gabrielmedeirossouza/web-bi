import { UseFormRegisterReturn } from 'react-hook-form';
import {
  FormControl, FormLabel, Input as ChakraInput, FormControlProps, InputProps, Text,
} from '@chakra-ui/react';

interface IInputProps extends FormControlProps {
  name: string;
  label: string;
  placeholder?: string;
  inputVariant?: InputProps['variant'];
  inputType?: InputProps['type'];
  register?: UseFormRegisterReturn;
  error?: {
    message?: string;
  };
}

export const Input = ({
  name, label, placeholder, inputVariant = 'filled', inputType = 'text', register, error, ...props
}: IInputProps) => {
  return (
    <FormControl {...props}>
      <FormLabel htmlFor={name}>{label}</FormLabel>

      <ChakraInput
        id={name}
        name={name}
        variant={inputVariant}
        placeholder={placeholder}
        type={inputType}
        bgColor="gray.900"
        _hover={{
          bgColor: 'gray.900',
        }}
        {...register}
      />

      {error && (
      <Text
        pt="1"
        pl="1"
        color="red.300"
        fontSize="0.75rem"
      >
        {error.message}
      </Text>
      )}
    </FormControl>
  );
};
