import { Button, type ButtonProps } from '@chakra-ui/react';
import React from 'react';

function AppButton({ children, ...props }: ButtonProps) {
    return <Button {...props}>{children}</Button>;
}

export default AppButton;
