import { Drawer, EmptyState, IconButton, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { FaTrophy } from 'react-icons/fa';
import { LuX } from 'react-icons/lu';
import { Tooltip } from '@/shared/components/ui/Tooltip';
import type LeaderboardItem from '../../models/LeaderboardItem';
import LeaderboardPlayerCard from './LeaderboardPlayerCard';

interface LeaderboardDrawerProps {
    leaderboard: LeaderboardItem[];
}

function LeaderboardDrawer({ leaderboard }: LeaderboardDrawerProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Tooltip content="Leaderboard">
                <IconButton aria-label="Leaderboard" variant="ghost" size="sm" onClick={() => setIsOpen(true)}>
                    <FaTrophy />
                </IconButton>
            </Tooltip>

            <Drawer.Root
                open={isOpen}
                onOpenChange={({ open }) => setIsOpen(open)}
                placement="end"
                size={{
                    base: 'full',
                    md: 'md',
                }}
            >
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header shadow="sm">
                            <Drawer.Title fontWeight="bold">Leaderboard</Drawer.Title>
                            <Drawer.CloseTrigger>
                                <IconButton variant="ghost" colorPalette="gray" size="xs" marginTop={2}>
                                    <LuX />
                                </IconButton>
                            </Drawer.CloseTrigger>
                        </Drawer.Header>

                        <Drawer.Body>
                            {leaderboard.length === 0 ? (
                                <EmptyState.Root>
                                    <EmptyState.Content>
                                        <EmptyState.Indicator>
                                            <FaTrophy />
                                        </EmptyState.Indicator>
                                        <EmptyState.Title>No games played yet.</EmptyState.Title>
                                    </EmptyState.Content>
                                </EmptyState.Root>
                            ) : (
                                <VStack align="stretch" gap={2}>
                                    {leaderboard.map((item) => (
                                        <LeaderboardPlayerCard key={`${item.rank}-${item.name}`} {...item} />
                                    ))}
                                </VStack>
                            )}
                        </Drawer.Body>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Drawer.Root>
        </>
    );
}

export default LeaderboardDrawer;
