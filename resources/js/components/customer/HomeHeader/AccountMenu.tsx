import { Box, Button, Menu, Portal } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import React from 'react';
import { LuCalendar, LuChevronDown, LuLogOut } from 'react-icons/lu';

function AccountMenu() {
    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <Button variant="subtle" size="sm">
                    Account <LuChevronDown />
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content>
                        <Menu.Item value="reservations" asChild>
                            <Link href="/reservations">
                                <LuCalendar />
                                <Box flex="1">Reservations</Box>
                            </Link>
                        </Menu.Item>
                        <Menu.Item value="logout" asChild>
                            <Link href="/logout" method="post">
                                <LuLogOut />
                                <Box flex="1">Logout</Box>
                            </Link>
                        </Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    );
}

export default AccountMenu;
