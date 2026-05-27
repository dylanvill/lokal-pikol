import { Button, Heading, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';

const SCORES = Array.from({ length: 12 }, (_, i) => i);

interface Props {
    player1Name: string;
    player2Name: string;
    score: number | null;
    onSelect: (score: number) => void;
}

function SelectScoreStep({ player1Name, player2Name, score, onSelect }: Props) {
    return (
        <VStack align="stretch" gap={4}>
            <HStack alignItems="center" justifyContent="center" gap={2}>
                <Heading size="xl" textAlign="center">
                    {player1Name}
                </Heading>
                <Text fontSize="xl" color="gray.400">
                    &amp;
                </Text>
                <Heading size="xl" textAlign="center">
                    {player2Name}
                </Heading>
            </HStack>
            <Text fontSize="sm" color="gray.500" textAlign="center">
                Select their score:
            </Text>
            <SimpleGrid columns={2} gap={2}>
                {SCORES.map((s) => (
                    <Button
                        key={s}
                        variant={score === s ? 'solid' : 'outline'}
                        colorPalette={score === s ? 'blue' : 'gray'}
                        size="md"
                        onClick={() => onSelect(s)}
                    >
                        {s}
                    </Button>
                ))}
            </SimpleGrid>
        </VStack>
    );
}

export default SelectScoreStep;
