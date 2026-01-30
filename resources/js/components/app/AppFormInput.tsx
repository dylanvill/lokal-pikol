import { Input } from '@chakra-ui/react';
import type { InputProps } from '@chakra-ui/react';
import React from 'react';

export interface AppFormInputProps extends InputProps {}

function AppFormInput({ ...props }: AppFormInputProps) {
    return (
        <Input
            borderRadius="md"
            borderColor="gray.300"
            _focus={{
                borderColor: 'blue.500',
                boxShadow: '0 0 0 1px #3182ce',
            }}
            {...props}
        />
    );
}

export default AppFormInput;
