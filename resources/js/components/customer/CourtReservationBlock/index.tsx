import { Box, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import type Photo from '../../../models/shared/Photo';
import CourtSlot from './CourtSlot';
import type { CourtSlotState } from './CourtSlot/types';
import ImageCarousel from './ImageCarousel';

export interface CourtReservationBlockProps {
    courtId: string;
    name: string;
    photos: Photo[];
    slots: { id: number; state: CourtSlotState; label: string }[];
    onSlotSelected: (courtId: number, slotId: number) => void;
    onSlotDeselected: (courtId: number, slotId: number) => void;
}

function CourtReservationBlock({ courtId, name, photos, onSlotSelected, onSlotDeselected }: CourtReservationBlockProps) {
    const handleSlotSelected = (slotId: number) => {
        onSlotSelected(courtId, slotId);
    };

    const handleSlotDeselected = (slotId: number) => {
        onSlotDeselected(courtId, slotId);
    };

    return (
        <SimpleGrid columns={{ base: 1, md: 2 }}>
            <Box width="full">
                <ImageCarousel photos={photos} />
                <Text fontWeight="bold">{name}</Text>
            </Box>
            <Flex flexDirection="row" flexWrap="wrap" gap={2}>
                {/* {slots.map((slot) => (
                        <CourtSlot
                            key={slot.id}
                            id={slot.id}
                            state={slot.state}
                            label={slot.label}
                            onSlotSelected={handleSlotSelected}
                            onSlotDeselected={handleSlotDeselected}
                        />
                    ))} */}
            </Flex>
        </SimpleGrid>
    );
}

export default CourtReservationBlock;
