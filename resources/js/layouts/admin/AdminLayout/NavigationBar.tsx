import { Box, Flex, Text, Button } from '@chakra-ui/react';
import React from 'react';

interface NavigationBarProps {
    userName: string;
    onLogout: () => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ userName, onLogout }) => {
    return (
        <Box
            bg="blue.800"
            borderBottom="1px"
            borderColor="gray.200"
            px={4}
            py={2}
            position="fixed"
            top={0}
            left={0}
            right={0}
            zIndex={1000}
            height="60px"
        >
            <Flex h="100%" alignItems="center" justifyContent="space-between">
                {/* Logo Section */}
                <Box>
                    <Text fontWeight="bold" fontSize="lg" color="blue.500">
                        Logo
                    </Text>
                </Box>

                {/* User Section */}
                <Flex alignItems="center" gap={4}>
                    <Text fontSize="sm">{userName}</Text>
                    <Button size="sm" colorScheme="red" variant="outline" onClick={onLogout}>
                        Logout
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
};

export default NavigationBar;
