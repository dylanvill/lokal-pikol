import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import { LuCalendar, LuCalendarOff, LuCalendarPlus, LuGrid2X2, LuHouse, LuLogOut, LuUser } from 'react-icons/lu';

const sidebarItems = [
    {
        category: 'Dashboard',
        children: [
            {
                label: 'Dashboard',
                route: '/facility/dashboard',
                icon: () => <LuHouse />,
            },
        ],
    },
    {
        category: 'Courts',
        children: [
            {
                label: 'Courts',
                route: '/facility/courts',
                icon: () => <LuGrid2X2 />,
            },
            {
                label: 'Block Bookings',
                route: '/facility/courts/block-bookings',
                icon: () => <LuCalendarOff />,
            },
        ],
    },
    {
        category: 'Reservations',
        children: [
            {
                label: 'Reservations',
                route: '/facility/reservations',
                icon: () => <LuCalendar />,
            },
            {
                label: 'Create Reservation',
                route: '/facility/reservations/create',
                icon: () => <LuCalendarPlus />,
            },
        ],
    },
    {
        category: 'Account',
        children: [
            {
                label: 'Account',
                route: '/facility/account',
                icon: () => <LuUser />,
            },
            {
                label: 'Logout',
                route: '/facility/auth/logout',
                icon: () => <LuLogOut />,
            },
        ],
    },
];

export const Sidebar = () => {
    return (
        <Box bg="gray.100" position="fixed" p={0} left={0} top="60px" bottom={0} width="200px" overflowY="auto">
            <VStack gap={4} align="stretch" marginTop={4}>
                {sidebarItems.map((category) => (
                    <VStack key={category.category} alignItems="stretch">
                        <Text fontSize="xs" textTransform="uppercase" fontWeight="bold" color="gray.500" marginLeft={2}>
                            {category.category}
                        </Text>
                        {category.children.map((item) => (
                            <Link key={item.label} href={item.route} method={item.route === '/facility/auth/logout' ? 'post' : 'get'}>
                                <HStack px={2}>
                                    {item.icon()}
                                    <Text fontSize="md">{item.label}</Text>
                                </HStack>
                            </Link>
                        ))}
                    </VStack>
                ))}
            </VStack>
        </Box>
    );
};

export default Sidebar;
