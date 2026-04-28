import { Box, HStack, Text } from '@chakra-ui/react';
import React from 'react';

export interface NavigationBarProps {
    title?: string;
}

function NavigationBar({ title }: NavigationBarProps) {
    return (
        <Box
            as="header"
            bg="white"
            borderBottomWidth="1px"
            borderColor="gray.200"
            px={{ base: 4, md: 8 }}
            py={4}
            position="sticky"
            top={0}
            zIndex={10}
        >
            <HStack justify="space-between">
                <Text fontSize="lg" fontWeight="semibold" color="gray.800">
                    {title}
                </Text>
                <HStack gap={3} />
            </HStack>
        </Box>
    );
}

export default NavigationBar;
