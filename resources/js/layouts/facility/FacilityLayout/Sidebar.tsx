import { Box, Link, Text, VStack } from '@chakra-ui/react';
import { router } from '@inertiajs/react';
import { LuCalendar, LuCalendarOff, LuCalendarPlus, LuGrid2X2, LuHouse, LuUser } from 'react-icons/lu';
import AppButton from '../../../components/app/AppButton';

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
                label: 'Block Bookings',
                route: '/facility/reservations/block-bookings',
                icon: () => <LuCalendarOff />,
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
        ],
    },
];

export const Sidebar = () => {
    const handleItemClick = (route: string) => {
        router.visit(route);
    };

    return (
        <Box bg="gray.100" position="fixed" p={0} left={0} top="60px" bottom={0} width="200px" overflowY="auto">
            <VStack gap={4} align="stretch" marginTop={4}>
                {sidebarItems.map((category) => (
                    <Box key={category.category}>
                        <Text fontSize="xs" textTransform="uppercase" fontWeight="bold" color="gray.500" marginLeft={2}>
                            {category.category}
                        </Text>
                        {category.children.map((item) => (
                            <Link key={item.label}>
                                <AppButton
                                    key={item.route}
                                    backgroundColor="transparent"
                                    justifyContent="flex-start"
                                    borderRadius={0}
                                    onClick={() => handleItemClick(item.route)}
                                    color="black"
                                >
                                    {item.icon()} {item.label}
                                </AppButton>
                            </Link>
                        ))}
                    </Box>
                ))}
            </VStack>
        </Box>
    );
};

export default Sidebar;
