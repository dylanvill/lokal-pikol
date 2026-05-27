import { Badge, Box, Flex, HStack, Heading, Text, VStack } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import ScoresheetLayout from '../../layouts/ScoresheetLayout';
import type Game from '../../models/Game';
import type Session from '../../models/Session';

interface SessionShowPageProps extends PageProps {
    session: Session;
}

function GameRow({ game }: { game: Game }) {
    const teamAWon = game.teamAScore > game.teamBScore;
    const teamBWon = game.teamBScore > game.teamAScore;

    return (
        <Box borderBottomWidth="1px" borderColor="gray.200" py={3} _last={{ borderBottomWidth: 0 }}>
            <Flex align="center" gap={3}>
                <VStack align="flex-start" flex="1" gap={0}>
                    <Text fontWeight={teamAWon ? 'semibold' : 'normal'} fontSize="sm">
                        {game.teamAPlayer1Name}
                    </Text>
                    <Text fontWeight={teamAWon ? 'semibold' : 'normal'} fontSize="sm">
                        {game.teamAPlayer2Name}
                    </Text>
                </VStack>

                <HStack gap={2} flexShrink={0}>
                    <Text fontWeight="bold" fontSize="2xl" w="8" textAlign="center" color={teamAWon ? 'green.600' : 'gray.500'}>
                        {game.teamAScore}
                    </Text>
                    <Text color="gray.400" fontSize="sm">
                        –
                    </Text>
                    <Text fontWeight="bold" fontSize="2xl" w="8" textAlign="center" color={teamBWon ? 'green.600' : 'gray.500'}>
                        {game.teamBScore}
                    </Text>
                </HStack>

                <VStack align="flex-end" flex="1" gap={0}>
                    <Text fontWeight={teamBWon ? 'semibold' : 'normal'} fontSize="sm" textAlign="right">
                        {game.teamBPlayer1Name}
                    </Text>
                    <Text fontWeight={teamBWon ? 'semibold' : 'normal'} fontSize="sm" textAlign="right">
                        {game.teamBPlayer2Name}
                    </Text>
                </VStack>
            </Flex>
        </Box>
    );
}

function SessionShowPage() {
    const { session } = usePage<SessionShowPageProps>().props;
    const isActive = session.status === 'active';

    return (
        <ScoresheetLayout title={session.name}>
            <VStack align="stretch" gap={6}>
                <VStack align="flex-start" gap={2}>
                    <HStack align="center">
                        <Heading size="xl">{session.name}</Heading>
                        <Badge colorPalette={isActive ? 'green' : 'gray'} variant="subtle" size="md">
                            {isActive ? 'Active' : 'Ended'}
                        </Badge>
                    </HStack>
                    {!isActive && (
                        <Text color="gray.500" fontSize="sm">
                            This session has ended. Results are still viewable below.
                        </Text>
                    )}
                </VStack>

                {/* Submission wizard — added in Phase 5b */}
                {isActive && <Box id="submit-wizard-placeholder" />}

                <Box bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="lg" px={4}>
                    <HStack justify="space-between" py={3} borderBottomWidth="1px" borderColor="gray.100">
                        <Heading size="sm" color="gray.700">
                            Results
                        </Heading>
                        <Text fontSize="xs" color="gray.400">
                            {session.games.length} {session.games.length === 1 ? 'game' : 'games'}
                        </Text>
                    </HStack>

                    {session.games.length === 0 ? (
                        <Box py={8} textAlign="center">
                            <Text color="gray.400" fontSize="sm">
                                No games recorded yet.
                            </Text>
                        </Box>
                    ) : (
                        <Box>
                            {session.games.map((game) => (
                                <GameRow key={game.id} game={game} />
                            ))}
                        </Box>
                    )}
                </Box>
            </VStack>
        </ScoresheetLayout>
    );
}

export default SessionShowPage;
