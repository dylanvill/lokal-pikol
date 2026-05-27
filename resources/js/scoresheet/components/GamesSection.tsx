import { Box, Card, HStack, Text } from '@chakra-ui/react';
import type Game from '../models/Game';
import GameCard from './GameCard';

interface GamesSectionProps {
    games: Game[];
}

function GamesSection({ games }: GamesSectionProps) {
    const numberOfGamesLabel = `${games.length} ${games.length === 1 ? 'game' : 'games'}`;
    const hasGames = games.length === 0;

    return (
        <Card.Root variant="outline">
            <Card.Header borderBottomWidth="1px" borderColor="gray.100" py={3} px={4}>
                <HStack justify="space-between">
                    <Card.Title color="gray.700">Results</Card.Title>
                    <Text fontSize="xs" color="gray.400">
                        {numberOfGamesLabel}
                    </Text>
                </HStack>
            </Card.Header>

            <Card.Body p={0}>
                {hasGames ? (
                    <Box py={4} textAlign="center">
                        <Text color="gray.400" fontSize="sm">
                            No games recorded yet.
                        </Text>
                    </Box>
                ) : (
                    games.map((game) => (
                        <GameCard
                            key={game.id}
                            id={game.id}
                            teamA={{ player1: game.teamAPlayer1Name, player2: game.teamAPlayer2Name, score: game.teamAScore }}
                            teamB={{ player1: game.teamBPlayer1Name, player2: game.teamBPlayer2Name, score: game.teamBScore }}
                        />
                    ))
                )}
            </Card.Body>
        </Card.Root>
    );
}

export default GamesSection;
