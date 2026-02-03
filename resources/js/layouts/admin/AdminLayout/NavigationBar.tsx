import { Box, Flex, Text, IconButton } from '@chakra-ui/react';
import React from 'react';
import { LuLogOut } from 'react-icons/lu';

export const NavigationBar = () => {
    return (
        <Box bg="blue.800" p={4} position="fixed" top={0} left={0} right={0} zIndex={1000} height="60px">
            <Flex h="100%" alignItems="center" justifyContent="space-between">
                <Box>
                    <Text fontWeight="bold" fontSize="lg" color="blue.500">
                        Logo
                    </Text>
                </Box>
                <Flex alignItems="center" gap={4}>
                    <Text fontSize="sm">Dylan</Text>
                    <IconButton size="sm" backgroundColor="blue.600">
                        <LuLogOut color="white" />
                    </IconButton>
                </Flex>
            </Flex>
        </Box>
    );
};

export default NavigationBar;
