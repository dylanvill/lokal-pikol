import { Box, Flex, Heading, Link, Text, VStack } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { FaCircle } from 'react-icons/fa';
import GamesSection from '../../components/GamesSection';
import LeaderboardDrawer from '../../components/LeaderboardDrawer';
import SubmitWizard from '../../components/SubmitWizard';
import ScoresheetLayout from '../../layouts/ScoresheetLayout';
import type Session from '../../models/Session';

interface SessionShowPageProps extends PageProps {
    session: Session;
}

function SessionShowPage() {
    const { session } = usePage<SessionShowPageProps>().props;
    const isActive = session.status === 'active';

    return (
        <ScoresheetLayout title={session.name}>
            <Box maxWidth="xs" marginBottom={4} marginX="auto">
                <Text textAlign="center" fontSize="sm" color="gray.500">
                    A free scoresheet for{' '}
                    <Text as="span" fontWeight="semibold">
                        Recplays Duma
                    </Text>{' '}
                    in partnership with{' '}
                    <Link href="https://directory.lokalpikol.com/" target="_blank" rel="noopener noreferrer" fontWeight="semibold" color="blue.500">
                        Lokal Pikol
                    </Link>
                    .
                </Text>
            </Box>
            <VStack align="stretch" gap={4}>
                <Flex align="center" justify="space-between">
                    <Flex align="center">
                        <Box marginTop={0.5}>
                            <FaCircle size={8} color={isActive ? 'green' : 'orange'} />
                        </Box>
                        <Heading marginLeft={2}>{session.name}</Heading>
                    </Flex>
                    <LeaderboardDrawer leaderboard={session.leaderboard} />
                </Flex>
                {!isActive && (
                    <Text color="gray.500" fontSize="sm">
                        This session has ended. Results are still viewable below:
                    </Text>
                )}
                <GamesSection games={session.games} />
            </VStack>
            <Box height="60px" />
            <SubmitWizard session={session} />
        </ScoresheetLayout>
    );
}

export default SessionShowPage;
