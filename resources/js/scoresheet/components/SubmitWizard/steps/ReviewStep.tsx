import { Box, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import TeamCard from './TeamCard';

interface PairInfo {
    player1Name: string;
    player2Name: string;
    score: number;
}

interface Props {
    pairA: PairInfo;
    pairB: PairInfo;
    errors: Record<string, string>;
}

function ReviewStep({ pairA, pairB, errors }: Props) {
    const errorMessages = Object.values(errors);
    const pairAWon = pairA.score > pairB.score;
    const pairBWon = pairB.score > pairA.score;

    return (
        <VStack align="stretch" gap={4}>
            <SimpleGrid columns={2} gap={3}>
                <TeamCard info={pairA} won={pairAWon} />
                <TeamCard info={pairB} won={pairBWon} />
            </SimpleGrid>

            {errorMessages.length > 0 && (
                <Box bg="red.50" borderWidth="1px" borderColor="red.200" borderRadius="md" p={3}>
                    {errorMessages.map((msg, i) => (
                        <Text key={i} color="red.600" fontSize="sm">
                            {msg}
                        </Text>
                    ))}
                </Box>
            )}
        </VStack>
    );
}

export default ReviewStep;
