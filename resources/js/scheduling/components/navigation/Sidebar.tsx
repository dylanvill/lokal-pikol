import { Box, Flex, Image, VStack, Link as ChakraLink, Text } from '@chakra-ui/react';
import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import { LuCalendar, LuCalendarCheck, LuCalendarX2, LuLayoutGrid } from 'react-icons/lu';
import AvailabilityController from '@/actions/App/Http/Scheduling/Court/Controllers/AvailabilityController';
import BlockReservationsController from '@/actions/App/Http/Scheduling/Court/Controllers/BlockReservationsController';
import CourtsController from '@/actions/App/Http/Scheduling/Court/Controllers/CourtsController';
import ReservationsController from '@/actions/App/Http/Scheduling/Court/Controllers/ReservationsController';
import Logo from '../../../../images/logo/lokal-pikol-horizontal-white-out.svg';

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
}

const navItems: NavItem[] = [
    { label: 'Courts', href: CourtsController.show.url(), icon: <LuLayoutGrid /> },
    { label: 'Reservations', href: ReservationsController.show.url(), icon: <LuCalendar /> },
    { label: 'Availability', href: AvailabilityController.show.url(), icon: <LuCalendarCheck /> },
    { label: 'Block reservations', href: BlockReservationsController.show.url(), icon: <LuCalendarX2 /> },
    // { label: 'Profile', href: ProfileController.show.url(), icon: <LuBuilding2 /> },
];

function Sidebar() {
    const { url } = usePage();
    return (
        <Box
            as="aside"
            width={{ base: '72px', md: '260px' }}
            bg="blue.900"
            color="white"
            position="sticky"
            top={0}
            height="100vh"
            display="flex"
            flexDirection="column"
        >
            <Flex align="center" justify={{ base: 'center', md: 'flex-start' }} px={{ base: 0, md: 6 }} py={6}>
                <Image src={Logo} alt="Lokal Pikol" objectFit="contain" maxHeight={10} />
            </Flex>
            <VStack as="nav" align="stretch" gap={1} px={{ base: 2, md: 4 }} flex="1">
                {navItems.map((item) => {
                    const itemPath = item.href.startsWith('http') ? new URL(item.href).pathname : item.href;
                    const isActive = url.startsWith(itemPath);
                    return (
                        <ChakraLink
                            key={item.href}
                            as={Link}
                            href={item.href}
                            display="flex"
                            alignItems="center"
                            gap={3}
                            px={3}
                            py={2.5}
                            borderRadius="md"
                            fontSize="sm"
                            fontWeight="medium"
                            color={isActive ? 'white' : 'blue.100'}
                            bg={isActive ? 'blue.700' : 'transparent'}
                            _hover={{ bg: 'blue.800', color: 'white', textDecoration: 'none' }}
                            justifyContent={{ base: 'center', md: 'flex-start' }}
                        >
                            <Box fontSize="lg" display="flex" alignItems="center">
                                {item.icon}
                            </Box>
                            <Text display={{ base: 'none', md: 'inline' }}>{item.label}</Text>
                        </ChakraLink>
                    );
                })}
            </VStack>
        </Box>
    );
}

export default Sidebar;
