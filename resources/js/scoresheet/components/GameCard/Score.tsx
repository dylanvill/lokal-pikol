import { Text } from '@chakra-ui/react';

interface ScoreProps {
    value: number;
    won: boolean;
}

function Score({ value, won }: ScoreProps) {
    return (
        <Text fontWeight="bold" fontSize="2xl" textAlign="center" color={won ? 'green.600' : 'gray.600'}>
            {value}
        </Text>
    );
}

export default Score;
