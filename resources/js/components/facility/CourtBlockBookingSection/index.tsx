import { Box, Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import { LuCalendarX } from 'react-icons/lu';
import courtTypeIconParser from '../../../helpers/courtTypeIconParser';
import courtTypeLabelParser from '../../../helpers/courtTypeLabelParser';
import type BlockBooking from '../../../models/facility/BlockBooking';
import Empty from '../../shared/Empty';
import BlockBookingCard from './BlockBookingCard';

interface CourtBlockBookingSectionProps {
    id: string;
    name: string;
    covered: boolean;
    blockBookings: BlockBooking[];
}

function CourtBlockBookingSection({ id, name, covered, blockBookings }: CourtBlockBookingSectionProps) {
    const Icon = courtTypeIconParser(covered);
    const label = courtTypeLabelParser(covered);

    return (
        <Box>
            <VStack alignItems="stretch" gap={2} marginBottom={4}>
                <Heading size="md">{name}</Heading>
                <Heading size="sm" display="inline-flex" alignItems="center" gap={1}>
                    <Icon /> {label}
                </Heading>
            </VStack>

            {blockBookings.length > 0 ? (
                <SimpleGrid
                    columns={{
                        base: 2,
                        md: 3,
                        lg: 4,
                        xl: 5,
                        '2xl': 6,
                    }}
                >
                    {blockBookings.map((blockBooking) => (
                        <BlockBookingCard
                            key={blockBooking.id}
                            id={blockBooking.id}
                            name={blockBooking.name}
                            day={blockBooking.day}
                            startTime={blockBooking.startTime}
                            endTime={blockBooking.endTime}
                        />
                    ))}
                </SimpleGrid>
            ) : (
                <Empty icon={<LuCalendarX />} title="No block bookings" description="There are currently no block bookings for this court." />
            )}
        </Box>
    );
}

export default CourtBlockBookingSection;
