import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import type { Team } from '../useMatchWizard';

interface PairInfo {
    player1Name: string;
    player2Name: string;
}

interface Props {
    pairA: PairInfo;
    pairB: PairInfo;
    selected: Team | null;
    onSelect: (team: Team) => void;
}

function SelectLoserStep({ pairA, pairB, selected, onSelect }: Props) {
    return (
        <VStack align="stretch" gap={4}>
            <Heading size="xl" textAlign="center">
                Which team lost?
            </Heading>
            <VStack gap={3} align="stretch">
                <TeamButton info={pairA} selected={selected === 'A'} onClick={() => onSelect('A')} />
                <TeamButton info={pairB} selected={selected === 'B'} onClick={() => onSelect('B')} />
            </VStack>
        </VStack>
    );
}

interface TeamButtonProps {
    info: PairInfo;
    selected: boolean;
    onClick: () => void;
}

function TeamButton({ info, selected, onClick }: TeamButtonProps) {
    return (
        <Button
            variant={selected ? 'solid' : 'outline'}
            colorPalette={selected ? 'orange' : 'gray'}
            width="full"
            height="auto"
            py={4}
            flexDirection="column"
            gap={1}
            onClick={onClick}
        >
            <Text fontSize="md" fontWeight="semibold">{info.player1Name}</Text>
            <Text fontSize="md" fontWeight="semibold">{info.player2Name}</Text>
        </Button>
    );
}

export default SelectLoserStep;
