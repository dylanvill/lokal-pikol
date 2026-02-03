import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { NavigationBar } from './NavigationBar';
import { Sidebar } from './Sidebar';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
    return (
        <Box minH="100vh" bg="gray.50">
            <NavigationBar />
            <Flex>
                <Sidebar />
                <Box flex={1} ml="250px" mt="60px" p={6}>
                    {children}
                </Box>
            </Flex>
        </Box>
    );
};

export default AdminLayout;
