import { Box, Container, Heading, Text, HStack, Button, IconButton, Flex } from '@chakra-ui/react';
import React from 'react';
import { FiUser } from 'react-icons/fi';
import RootLayout from '@/layouts/RootLayout';

interface LandingPageLayoutProps {
    children: React.ReactNode;
    title?: string;
}

function LandingPageLayout({ children, title }: LandingPageLayoutProps) {
    return (
        <RootLayout title={title}>
            {/* Header */}
            <Box bg="white" shadow="sm" borderBottom="1px" borderColor="gray.200">
                <Container maxW="7xl" py={4}>
                    <Flex justify="space-between" align="center">
                        {/* Logo/Brand */}
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

                        {/* Header Buttons */}
                        <HStack gap={4}>
                            <Button colorScheme="orange" variant="solid" size="md">
                                Search Courts
                            </Button>
                            <IconButton aria-label="My Account" variant="ghost" size="md" color="gray.600">
                                <FiUser />
                            </IconButton>
                        </HStack>
                    </Flex>
                </Container>
            </Box>

            {children}
        </RootLayout>
    );
}

export default LandingPageLayout;
