import { Box, Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { Link, usePage } from '@inertiajs/react';
import { LuArrowRight, LuUser } from 'react-icons/lu';
import useCustomer from '../../../lib/hooks/useCustomer';
function HomeHeader() {
    const { isLoggedIn } = useCustomer();
    const { url } = usePage();

    const showCreateAccount = !isLoggedIn && url !== '/sign-up';

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
                {isLoggedIn ? (
                    <Link href="/sign-up">
                        <Button variant="subtle">
                            My Account
                            <LuUser />
                        </Button>
                    </Link>
                ) : (
                    showCreateAccount && (
                        <Link href="/sign-up">
                            <Button variant="outline" backgroundColor="white" size="xs">
                                Create Account
                                <LuArrowRight />
                            </Button>
                        </Link>
                    )
                )}
            </Flex>
        </VStack>
    );
}

export default HomeHeader;
