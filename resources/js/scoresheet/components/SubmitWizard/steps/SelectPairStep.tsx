import { Button, Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import type Player from '../../../models/Player';

interface Props {
    heading: string;
    players: Player[];
    selectedIds: string[];
    excludeIds: string[];
    onToggle: (player: Player) => void;
}

function SelectPairStep({ heading, players, selectedIds, excludeIds, onToggle }: Props) {
    const isComplete = selectedIds.length === 2;

    return (
        <VStack align="stretch" gap={3}>
            <Heading size="xl" textAlign="center">
                {heading}
            </Heading>
            <SimpleGrid columns={2} gap={2}>
                {players.map((player) => {
                    const isSelected = selectedIds.includes(player.id);
                    const isExcluded = excludeIds.includes(player.id);
                    const isDisabled = isExcluded || (!isSelected && isComplete);

                    return (
                        <Button
                            key={player.id}
                            variant={isSelected ? 'solid' : 'outline'}
                            colorPalette={isSelected ? 'blue' : 'gray'}
                            size="sm"
                            onClick={() => onToggle(player)}
                            disabled={isDisabled}
                            justifyContent="flex-start"
                        >
                            {player.name}
                        </Button>
                    );
                })}
            </SimpleGrid>
        </VStack>
    );
}

export default SelectPairStep;
