import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { NavigationBar } from './NavigationBar';
import { Sidebar } from './Sidebar';

interface AdminLayoutProps {
    children: React.ReactNode;
    userName: string;
    onLogout: () => void;
    onNavigate?: (route: string) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, userName, onLogout, onNavigate }) => {
    return (
        <Box minH="100vh" bg="white">
            <NavigationBar userName={userName} onLogout={onLogout} />
            <Flex>
                <Sidebar onNavigate={onNavigate} />
                <Box flex={1} ml="250px" mt="60px" p={6}>
                    {children}
                </Box>
            </Flex>
        </Box>
    );
};

export default AdminLayout;
