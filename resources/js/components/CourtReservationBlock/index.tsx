import { Flex, Text, VStack } from '@chakra-ui/react';
import CourtSlot from './CourtSlot';
import type { CourtSlotState } from './CourtSlot/types';

export interface CourtReservationBlockProps {
    courtId: number;
    courtName: string;
    slots: { id: number; state: CourtSlotState; label: string }[];
    onSlotSelected: (courtId: number, slotId: number) => void;
    onSlotDeselected: (courtId: number, slotId: number) => void;
}

function CourtReservationBlock({ courtId, courtName, slots, onSlotSelected, onSlotDeselected }: CourtReservationBlockProps) {
    const handleSlotSelected = (slotId: number) => {
        onSlotSelected(courtId, slotId);
    };

    const handleSlotDeselected = (slotId: number) => {
        onSlotDeselected(courtId, slotId);
    };

    return (
        <div>
            <VStack alignItems="flex-start">
                <Text fontWeight="bold">{courtName}</Text>
                <Flex
                    flexDirection="row"
                    flexWrap="wrap"
                    gap={2}
                >
                    {slots.map((slot) => (
                        <CourtSlot
                            key={slot.id}
                            id={slot.id}
                            state={slot.state}
                            label={slot.label}
                            onSlotSelected={handleSlotSelected}
                            onSlotDeselected={handleSlotDeselected}
                        />
                    ))}
                </Flex>
            </VStack>
        </div>
    );
}

export default CourtReservationBlock;
