import { Text } from '@chakra-ui/react';

interface PlayerTextProps {
    name: string;
    won: boolean;
    textAlign?: 'left' | 'right';
}

function PlayerText({ name, won, textAlign = 'left' }: PlayerTextProps) {
    return (
        <Text fontWeight={won ? 'semibold' : 'normal'} fontSize="sm" textAlign={textAlign}>
            {name}
        </Text>
    );
}

export default PlayerText;
