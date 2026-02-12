import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { Link, usePage } from '@inertiajs/react';
import useCustomer from '../../../lib/hooks/useCustomer';
import AccountMenu from './AccountMenu';
import GuestCta from './GuestCta';
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
                {isLoggedIn ? <AccountMenu /> : showCreateAccount && <GuestCta />}
            </Flex>
        </VStack>
    );
}

export default HomeHeader;
