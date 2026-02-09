import { Box, VStack } from '@chakra-ui/react';
import { router } from '@inertiajs/react';
import React from 'react';
import { LuCalendar, LuGrid2X2, LuHouse, LuUser } from 'react-icons/lu';
import AppButton from '../../../components/app/AppButton';

const sidebarItems = [
    {
        label: 'Dashboard',
        route: '/facility/dashboard',
        icon: () => <LuHouse />,
    },
    {
        label: 'Courts',
        route: '/facility/courts',
        icon: () => <LuGrid2X2 />,
    },
    {
        label: 'Reservations',
        route: '/facility/reservations',
        icon: () => <LuCalendar />,
    },
    {
        label: 'Account',
        route: '/facility/account',
        icon: () => <LuUser />,
    },
];

export const Sidebar = () => {
    const handleItemClick = (route: string) => {
        router.visit(route);
    };

    return (
        <Box bg="gray.100" position="fixed" p={0} left={0} top="60px" bottom={0} width="200px" overflowY="auto">
            <VStack gap={0} align="stretch">
                {sidebarItems.map((item) => (
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
                ))}
            </VStack>
        </Box>
    );
};

export default Sidebar;
