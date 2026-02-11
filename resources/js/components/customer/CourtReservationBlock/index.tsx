import { GridItem, Heading, HStack, SimpleGrid, Text } from '@chakra-ui/react';
import type Photo from '../../../models/shared/Photo';
import ImageCarousel from './ImageCarousel';
import { LuSun } from 'react-icons/lu';

export interface CourtReservationBlockProps {
    courtId: string;
    name: string;
    photos: Photo[];
}

function CourtReservationBlock({ courtId, name, photos }: CourtReservationBlockProps) {
    return (
        <SimpleGrid columns={{ base: 1, lg: 3 }} gap={8}>
            <GridItem width="full" colSpan={{ base: 1, lg: 1 }}>
                <ImageCarousel photos={photos} />
            </GridItem>
            <GridItem colSpan={{ base: 1, lg: 2 }}>
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
            </GridItem>
        </SimpleGrid>
    );
}

export default CourtReservationBlock;
