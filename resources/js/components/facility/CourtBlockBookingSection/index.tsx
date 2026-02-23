import { Box, Button, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import { LuCalendarX, LuPlus } from 'react-icons/lu';
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
            <HStack alignItems="center" justifyContent="space-between">
                <VStack alignItems="stretch" gap={2} marginBottom={4}>
                    <Heading size="lg" color="blue.700">
                        {name}
                    </Heading>
                    <Heading size="sm" display="inline-flex" alignItems="center" color="blue.700" gap={1}>
                        <Icon color="blue.700" /> {label}
                    </Heading>
                </VStack>
                <Link href={`/facility/courts/block-booking/${id}/create`}>
                    <Button size="xs" colorPalette="blue" variant="subtle">
                        Add Block Booking to {name} <LuPlus />
                    </Button>
                </Link>
            </HStack>

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
