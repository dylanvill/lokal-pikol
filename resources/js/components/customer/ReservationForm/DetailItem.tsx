import { Box, Text } from '@chakra-ui/react';
import React from 'react';

export interface DetailItemProps {
    label: string;
    value?: string;
    children?: React.ReactNode;
}

function DetailItem({ label, value, children }: DetailItemProps) {
    return (
        <Box width="full">
            <Text fontWeight="semibold" mb={1}>
                {label}
            </Text>
            {value && <Text>{value}</Text>}
            {children}
        </Box>
    );
}

export default DetailItem;
