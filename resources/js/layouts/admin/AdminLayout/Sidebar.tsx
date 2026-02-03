import { Box, VStack, Button, Text } from '@chakra-ui/react';
import React from 'react';

interface SidebarProps {
    onNavigate?: (route: string) => void;
}

const sidebarItems = [
    {
        label: 'Courts',
        route: '/admin/courts',
    },
    {
        label: 'Account',
        route: '/admin/account',
    },
];

export const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
    const handleItemClick = (route: string) => {
        if (onNavigate) {
            onNavigate(route);
        }
    };

    return (
        <Box
            bg="gray.50"
            borderRight="1px"
            borderColor="gray.200"
            position="fixed"
            left={0}
            top="60px"
            bottom={0}
            width="250px"
            overflowY="auto"
        >
            <VStack gap={0} align="stretch" p={4}>
                <Text fontSize="sm" fontWeight="bold" color="gray.600" mb={4}>
                    Navigation
                </Text>

                {sidebarItems.map((item) => (
                    <Button
                        key={item.route}
                        variant="ghost"
                        justifyContent="flex-start"
                        size="sm"
                        mb={1}
                        onClick={() => handleItemClick(item.route)}
                    >
                        {item.label}
                    </Button>
                ))}
            </VStack>
        </Box>
    );
};

export default Sidebar;
