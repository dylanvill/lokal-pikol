import { Heading, type HeadingProps } from '@chakra-ui/react';
import React from 'react';

function AppTitle({ children, ...props }: HeadingProps) {
    return (
        <Heading {...props} fontSize="md">
            {children}
        </Heading>
    );
}

export default AppTitle;
