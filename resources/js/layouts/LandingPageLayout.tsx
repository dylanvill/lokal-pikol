import { Box, Container, Heading, Text, HStack, VStack, IconButton, Flex } from '@chakra-ui/react';
import React from 'react';
import { FiUser } from 'react-icons/fi';
import RootLayout from '@/layouts/RootLayout';
import SearchBar from '../components/SearchBar';

interface LandingPageLayoutProps {
    children: React.ReactNode;
    title?: string;
}

function LandingPageLayout({ children, title }: LandingPageLayoutProps) {
    return (
        <RootLayout title={title}>
            {/* Header */}
            <Box bgGradient="to-t" gradientFrom="gray.300" gradientTo="gray.100" paddingBottom="65px">
                <Container maxW="7xl" py={4}>
                    <VStack gap={4} align="stretch">
                        <Flex justify="space-between" align="center">
                            <HStack gap={3}>
                                <Box w="10" h="10" bg="orange.400" borderRadius="lg" display="flex" alignItems="center" justifyContent="center">
                                    <Text color="white" fontWeight="bold" fontSize="lg">
                                        🏓
                                    </Text>
                                </Box>
                                <Heading size="md" color="gray.800">
                                    Lokal Pikol
                                </Heading>
                            </HStack>
                            <IconButton aria-label="My Account" variant="ghost" size="md" color="gray.600">
                                <FiUser />
                            </IconButton>
                        </Flex>
                        <SearchBar />
                    </VStack>
                </Container>
            </Box>
            <Container maxW="7xl" py={4} shadow="2xl" borderTopRadius={20} backgroundColor="white" marginTop="-50px">
                {children}
            </Container>
        </RootLayout>
    );
}

export default LandingPageLayout;
