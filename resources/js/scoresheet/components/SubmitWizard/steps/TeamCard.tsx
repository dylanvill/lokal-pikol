import { Box, Text, VStack } from '@chakra-ui/react';

interface PairInfo {
    player1Name: string;
    player2Name: string;
    score: number;
}

interface Props {
    info: PairInfo;
    won: boolean;
}

function TeamCard({ info, won }: Props) {
    return (
        <Box
            borderWidth="1px"
            borderColor={won ? 'green.300' : 'gray.200'}
            bg={won ? 'green.50' : 'transparent'}
            borderRadius="lg"
            p={4}
            textAlign="center"
        >
            <VStack gap={3}>
                <Text
                    fontWeight="bold"
                    fontSize="6xl"
                    lineHeight="1"
                    color={won ? 'green.600' : 'gray.600'}
                >
                    {info.score}
                </Text>
                <VStack gap={0}>
                    <Text
                        fontWeight={won ? 'semibold' : 'normal'}
                        fontSize="sm"
                        color={won ? 'green.700' : 'gray.600'}
                    >
                        {info.player1Name}
                    </Text>
                    <Text
                        fontWeight={won ? 'semibold' : 'normal'}
                        fontSize="sm"
                        color={won ? 'green.700' : 'gray.600'}
                    >
                        {info.player2Name}
                    </Text>
                </VStack>
            </VStack>
        </Box>
    );
}

export default TeamCard;
