import { Text, type TextProps } from '@chakra-ui/react';
import React from 'react';

function AppSmallText({ children, ...props }: TextProps) {
    return (
        <Text {...props} fontSize="sm" color="gray.500">
            {children}
        </Text>
    );
}

export default AppSmallText;
