import { Card, GridItem, SimpleGrid, Stack, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import type ReservationStatus from '../../../../models/customer/reservation/ReservationStatus';
import type CourtSlot from '../../../../models/shared/CourtSlot';
import CardHeading from '../../../customer/ReservationReview/CardHeading';
import DetailItem from '../../../shared/DetailItem';
import ReservationSlotCard from '../../../shared/ReservationSlotCard';
import ReservationStatusBadge from '../../../shared/ReservationStatusBadge';

export interface ReservationDetailsProps {
    date: string;
    reservedSlots: CourtSlot[];
    courtSlots: CourtSlot[];
    status: ReservationStatus;
}

function ReservationDetails({ date, reservedSlots, courtSlots, status }: ReservationDetailsProps) {
    const dateDisplay = dayjs(date).format('MMMM D, YYYY');

    return (
        <Card.Root>
            <Card.Body>
                <CardHeading text="Reservation Details" />
                <Stack gap={6}>
                    <VStack align="start" gap={4}>
                        <DetailItem label="Reservation Date" value={dateDisplay} />
                        <DetailItem label="Status">
                            <ReservationStatusBadge status={status} />
                        </DetailItem>
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
                                {reservedSlots.map((slot) => (
                                    <GridItem key={slot.startTime}>
                                        <ReservationSlotCard courtSlots={courtSlots} startTime={slot.startTime} endTime={slot.endTime} />
                                    </GridItem>
                                ))}
                            </SimpleGrid>
                        </DetailItem>
                    </VStack>
                </Stack>
            </Card.Body>
        </Card.Root>
    );
}

export default ReservationDetails;
