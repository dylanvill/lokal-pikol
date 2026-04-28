import { Box, Flex } from '@chakra-ui/react';
import { Head } from '@inertiajs/react';
import React from 'react';
import NavigationBar from '../components/navigation/NavigationBar';
import Sidebar from '../components/navigation/Sidebar';

interface SchedulingLayoutProps {
    title: string;
    children: React.ReactNode;
}

function SchedulingLayout({ title, children }: SchedulingLayoutProps) {
    return (
        <>
            <Head title={title} />
            <Flex minH="100vh" bg="gray.50" colorPalette="blue">
                <Sidebar />
                <Flex direction="column" flex="1" minW={0}>
                    <NavigationBar title={title} />

                    <Box as="main" flex="1" px={{ base: 4, md: 8 }} py={6}>
                        {children}
                    </Box>
                </Flex>
            </Flex>
        </>
    );
}

export default SchedulingLayout;
