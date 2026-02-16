import { Flex, HStack, Image, VStack } from '@chakra-ui/react';
import { Link, usePage } from '@inertiajs/react';
import Logo from '../../../../images/logo/lokal-pikol-horizontal-white-out.svg';
import useCustomer from '../../../lib/hooks/useCustomer';
import AccountMenu from './AccountMenu';
import GuestCta from './GuestCta';

function HomeHeader() {
    const { isLoggedIn } = useCustomer();
    const { url } = usePage();

    const isOnboardingPage = ['/login', '/sign-up'].includes(url);
    const showCreateAccount = !isLoggedIn && !isOnboardingPage;

    return (
        <VStack gap={4} align="stretch">
            <Flex justify="space-between" align="center">
                {!isOnboardingPage && (
                    <Link href="/">
                        <HStack gap={3}>
                            <Image src={Logo} alt="Lokal Pikol" objectFit="contain" width="full" maxHeight={12} />
                        </HStack>
                    </Link>
                )}
                {isLoggedIn ? <AccountMenu /> : showCreateAccount && <GuestCta />}
            </Flex>
        </VStack>
    );
}

export default HomeHeader;
