import { Box, Flex, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import { FiUser } from 'react-icons/fi';
import SearchBar from './SearchBar';

function HomeHeader() {
    return (
        <VStack gap={4} align="stretch">
            <Flex justify="space-between" align="center">
                <Link href="/">
                    <HStack gap={3}>
                        <Box w="10" h="10" bg="orange.400" borderRadius="lg" display="flex" alignItems="center" justifyContent="center">
                            <Text color="white" fontWeight="bold" fontSize="lg">
                                🏓
                            </Text>
                        </Box>
                    </HStack>
                </Link>
                <IconButton aria-label="My Account" variant="ghost" size="md" color="gray.600">
                    <FiUser color="white" />
                </IconButton>
            </Flex>
            <SearchBar />
        </VStack>
    );
}

export default HomeHeader;
