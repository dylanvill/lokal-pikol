import { GridItem, Heading, HStack, SimpleGrid, Text } from '@chakra-ui/react';
import { LuSun } from 'react-icons/lu';
import typographyTokens from '../../../lib/tokens/typography';
import type CourtSlot from '../../../models/customer/court/CourtSlot';
import type Photo from '../../../models/shared/Photo';
import CourtSlotSection from './CourtSlotSection';
import ImageCarousel from './ImageCarousel';

export interface CourtReservationBlockProps {
    courtId: string;
    name: string;
    photos: Photo[];
    slots: CourtSlot[];
}

function CourtReservationBlock({ courtId, name, photos, slots }: CourtReservationBlockProps) {

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
                <Heading fontSize={typographyTokens.title.fontSize.lg} marginBottom={2} fontWeight={typographyTokens.title.fontWeight.bold}>
                    Court Schedule:
                </Heading>
                <form action="">
                    <SimpleGrid columns={{ base: 2, md: 4, lg: 3, xl: 4 }} gap={4}>
                        {slots.map((slot) => (
                            <CourtSlotSection
                                key={`${courtId}-${slot.startTime}-${slot.endTime}`}
                                courtId={courtId}
                                label={`${slot.startTime} - ${slot.endTime}`}
                                startTime={slot.startTime}
                                endTime={slot.endTime}
                                price={slot.price}
                                onSlotSelected={() => {}}
                                onSlotDeselected={() => {}}
                            />
                        ))}
                    </SimpleGrid>
                </form>
            </GridItem>
        </SimpleGrid>
    );
}

export default CourtReservationBlock;
