import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import PlayerText from './PlayerText';
import Score from './Score';

interface TeamProps {
    player1: string;
    player2: string;
    score: number;
}

interface GameCardProps {
    id: string;
    teamA: TeamProps;
    teamB: TeamProps;
}

function GameCard({ teamA, teamB }: GameCardProps) {
    const teamAWon = teamA.score > teamB.score;
    const teamBWon = teamB.score > teamA.score;

    const teamAGradient = teamAWon ? { bgGradient: 'to-r', gradientFrom: 'green.100', gradientTo: 'transparent' } : {};

    const teamBGradient = teamBWon ? { bgGradient: 'to-l', gradientFrom: 'green.100', gradientTo: 'transparent' } : {};

    return (
        <Box borderBottomWidth="1px" borderColor="gray.200" _last={{ borderBottomWidth: 0 }}>
            <Flex align="center" gap={2}>
                <VStack align="flex-start" flex="1" gap={0} px={4} py={2} {...teamAGradient}>
                    <Score value={teamA.score} won={teamAWon} />
                    <PlayerText name={teamA.player1} won={teamAWon} />
                    <PlayerText name={teamA.player2} won={teamAWon} />
                </VStack>
                <Text fontSize="sm" color="gray.400">
                    vs
                </Text>
                <VStack align="flex-end" flex="1" gap={0} px={4} py={2} {...teamBGradient}>
                    <Score value={teamB.score} won={teamBWon} />
                    <PlayerText name={teamB.player1} won={teamBWon} textAlign="right" />
                    <PlayerText name={teamB.player2} won={teamBWon} textAlign="right" />
                </VStack>
            </Flex>
        </Box>
    );
}

export default GameCard;
