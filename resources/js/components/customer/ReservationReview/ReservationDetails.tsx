import { Box, Card, GridItem, SimpleGrid, Stack, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import type Reservation from '../../../models/customer/reservation/Reservation';
import ImageCarousel from '../CourtReservationBlock/ImageCarousel';
import CardHeading from './CardHeading';
import DetailItem from './DetailItem';
import ReservationSlotCard from './ReservationSlotCard';

export interface ReservationDetailsProps {
    reservation: Reservation;
}

function ReservationDetails({ reservation }: ReservationDetailsProps) {
    const dateDisplay = dayjs(reservation.reservationDate).format('MMMM D, YYYY');

    return (
        <Card.Root>
            <Card.Body>
                <CardHeading text="Reservation Details" />
                <Stack gap={6}>
                    {/* Facility Photos */}
                    <Box>
                        <ImageCarousel photos={reservation.court.photos} />
                    </Box>

                    {/* Facility and Court Information */}
                    <VStack align="start" gap={4}>
                        <DetailItem label="Facility" value={reservation.facility.name}></DetailItem>
                        <DetailItem label="City" value={reservation.facility.city}></DetailItem>
                        <DetailItem label="Address" value={reservation.facility.address}></DetailItem>
                        <DetailItem label="Court" value={reservation.court.name}></DetailItem>
                        <DetailItem label="Reservation Date" value={dateDisplay}></DetailItem>
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
                                {reservation.slots.map((slot) => (
                                    <GridItem key={slot.startTime}>
                                        <ReservationSlotCard courtSlots={reservation.court.slots} startTime={slot.startTime} endTime={slot.endTime} />
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
