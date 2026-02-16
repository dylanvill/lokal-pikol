import { Button, Card, GridItem, HStack, SimpleGrid, Stack, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { LuCheck, LuX } from 'react-icons/lu';
import CardHeading from '../../../customer/ReservationReview/CardHeading';
import DetailItem from '../../../shared/DetailItem';
import ReservationSlotCard from '../../../shared/ReservationSlotCard';

function ReservationDetails() {
    // Static data for now
    const reservationDate = '2026-03-15';
    const dateDisplay = dayjs(reservationDate).format('MMMM D, YYYY');
    const status = 'Pending';

    // Sample time slots
    const slots = [
        { startTime: '14:00', endTime: '15:00' },
        { startTime: '15:00', endTime: '16:00' },
    ];

    // Sample court slots for ReservationSlotCard
    const courtSlots = [
        { startTime: '14:00', endTime: '15:00', price: 100000, isAvailable: false },
        { startTime: '15:00', endTime: '16:00', price: 100000, isAvailable: true },
    ];

    return (
        <Card.Root>
            <Card.Body>
                <CardHeading text="Reservation Details" />
                <Stack gap={6}>
                    <VStack align="start" gap={4}>
                        <DetailItem label="Reservation Date" value={dateDisplay} />
                        <DetailItem label="Status" value={status} />
                        <DetailItem label="Selected Time Slots">
                            <SimpleGrid
                                columns={{
                                    base: 2,
                                    md: 3,
                                    lg: 5,
                                    xl: 6,
                                }}
                                gap={2}
                            >
                                {slots.map((slot) => (
                                    <GridItem key={slot.startTime}>
                                        <ReservationSlotCard courtSlots={courtSlots} startTime={slot.startTime} endTime={slot.endTime} />
                                    </GridItem>
                                ))}
                            </SimpleGrid>
                        </DetailItem>
                    </VStack>

                    <HStack>
                        <Button colorPalette="green">
                            Confirm <LuCheck />
                        </Button>
                        <Button colorPalette="red">
                            Cancel <LuX />
                        </Button>
                    </HStack>
                </Stack>
            </Card.Body>
        </Card.Root>
    );
}

export default ReservationDetails;
