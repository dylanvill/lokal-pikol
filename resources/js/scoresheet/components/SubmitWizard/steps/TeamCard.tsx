import { Badge, Box, Text, VStack } from '@chakra-ui/react';

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
            borderColor={won ? 'green.400' : 'orange.400'}
            bg={won ? 'green.100' : 'orange.100'}
            borderRadius="lg"
            p={4}
            textAlign="center"
        >
            <Badge colorPalette={won ? "green" : "red"} variant="solid" marginBottom={4}>{won ? 'Winner' : 'Loser'}</Badge>
            <VStack gap={3}>
                <Text fontWeight="bold" fontSize="6xl" lineHeight="1" color={won ? 'green.600' : 'orange.600'}>
                    {info.score}
                </Text>
                <VStack gap={0}>
                    <Text fontWeight={won ? 'semibold' : 'normal'} fontSize="sm" color={won ? 'green.700' : 'orange.600'}>
                        {info.player1Name}
                    </Text>
                    <Text fontWeight={won ? 'semibold' : 'normal'} fontSize="sm" color={won ? 'green.700' : 'orange.600'}>
                        {info.player2Name}
                    </Text>
                </VStack>
            </VStack>
        </Box>
    );
}

export default TeamCard;
