import { Box, Flex, Heading, HStack, SimpleGrid, Text } from '@chakra-ui/react';
import type Photo from '../../../models/shared/Photo';
import type { CourtSlotState } from './CourtSlot/types';
import ImageCarousel from './ImageCarousel';
import { LuSun } from 'react-icons/lu';

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
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
            <Box width="full">
                <ImageCarousel photos={photos} />
            </Box>
            <Box>
                <Heading fontWeight="bold">{name}</Heading>
                <HStack marginBottom={4}>
                    <LuSun />
                    <Text>Outdoor Court</Text>
                </HStack>
                <Text fontSize="sm">Slots</Text>
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
            </Box>
        </SimpleGrid>
    );
}

export default CourtReservationBlock;
