import { Box, Container } from '@chakra-ui/react';
import { Head } from '@inertiajs/react';
import React from 'react';

interface ScoresheetLayoutProps {
    title: string;
    children: React.ReactNode;
}

function ScoresheetLayout({ title, children }: ScoresheetLayoutProps) {
    return (
        <>
            <Head title={title} />
            <Box minH="100vh" bg="gray.50">
                <Container maxW="2xl" py={4} pb={8} px={4}>
                    {children}
                </Container>
            </Box>
        </>
    );
}

export default ScoresheetLayout;
