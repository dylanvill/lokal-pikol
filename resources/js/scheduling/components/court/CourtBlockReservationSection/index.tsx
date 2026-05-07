import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import type BlockReservation from '../../../models/BlockReservation';
import { type UuidString } from '../../../types/String';
import DayOfTheWeekCard from './DayOfTheWeekCard';

export interface CourtBlockReservationSectionProps {
    id: UuidString;
    name: string;
    blockReservations: BlockReservation[];
}

function CourtBlockReservationSection({ id, name, blockReservations }: CourtBlockReservationSectionProps) {
    return (
        <Box key={id}>
            <Heading size="lg">{name}</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 5, "2xl": 7 }} gap={4}>
                {blockReservations.map((blockReservation) => (
                    <DayOfTheWeekCard
                        key={`${id}-${blockReservation.dayOfTheWeek}`}
                        dayOfTheWeek={blockReservation.dayOfTheWeek}
                        schedules={blockReservation.schedules}
                    />
                ))}
            </SimpleGrid>
        </Box>
    );
}

export default CourtBlockReservationSection;
