import { Box, Button, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import { LuPlus } from 'react-icons/lu';
import ShowCreateBlockReservationsController from '@/actions/App/Http/Scheduling/Court/Controllers/ShowCreateBlockReservationsController';
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
            <Heading size="lg" marginBottom={4}>{name}</Heading>
            {blockReservations.length === 0 ? (
                <Box display="flex" alignItems="center" gap={4} py={4} px={5} borderWidth="1px" borderStyle="dashed" borderRadius="md" borderColor="gray.300">
                    <Text fontSize="sm" color="gray.500" flex="1">
                        No block reservations for this court yet.
                    </Text>
                    <Link href={ShowCreateBlockReservationsController.show().url}>
                        <Button size="xs" colorPalette="blue" variant="outline">
                            <LuPlus />
                            Add one
                        </Button>
                    </Link>
                </Box>
            ) : (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 5, "2xl": 7 }} gap={4}>
                    {blockReservations.map((blockReservation) => (
                        <DayOfTheWeekCard
                            key={`${id}-${blockReservation.dayOfTheWeek}`}
                            dayOfTheWeek={blockReservation.dayOfTheWeek}
                            schedules={blockReservation.schedules}
                        />
                    ))}
                </SimpleGrid>
            )}
        </Box>
    );
}

export default CourtBlockReservationSection;
