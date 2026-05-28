import { Card, Circle, Flex, HStack, Text } from '@chakra-ui/react';
import { FaTrophy } from 'react-icons/fa';
import type LeaderboardItem from '../../models/LeaderboardItem';

function LeaderboardPlayerCard({ rank, name, wins, gamesPlayed, winRate }: LeaderboardItem) {
    const winRatePercent = `${Math.round(winRate * 100)}%`;
    const record = `${wins}/${gamesPlayed}`;

    const podiumColor: Record<number, string> = { 1: '#FFD700', 2: '#C0C0C0', 3: '#CD7F32' };
    const icon = podiumColor[rank] ? (
        <Circle backgroundColor={podiumColor[rank]} p={2}>
            <FaTrophy color="white" size={12} />
        </Circle>
    ) : null;

    const podiumGradientProps = podiumColor[rank]
        ? { bgGradient: 'to-r', gradientFrom: `${podiumColor[rank]}75`, gradientTo: 'transparent' }
        : {};

    return (
        <Card.Root flexDirection="row" variant="outline" overflow="hidden" size="sm">
            <Flex align="center" justify="center" minW="40px" bg="blue.700" px={3}>
                <Text color="white" fontSize="md" fontWeight="black">
                    {rank}
                </Text>
            </Flex>

            <Card.Body py={3} px={4} {...podiumGradientProps}>
                <HStack gap={8}>
                    <HStack gap={2}>
                        <Text color="black" fontSize="xs" fontWeight="bold" flexShrink={0}>
                            {record}
                        </Text>
                        <Text color="gray.500" fontSize="xs" flexShrink={0}>
                            ({winRatePercent})
                        </Text>
                    </HStack>
                    <Flex flex={1} alignItems="center" justifyContent="space-between">
                        <Text fontSize="sm" fontWeight="medium">
                            {name}
                        </Text>
                        {icon}
                    </Flex>
                </HStack>
            </Card.Body>
        </Card.Root>
    );
}

export default LeaderboardPlayerCard;
