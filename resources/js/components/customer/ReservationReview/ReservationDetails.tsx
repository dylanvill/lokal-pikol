import { Box, Card, GridItem, SimpleGrid, Stack, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import type CourtSlot from '../../../models/shared/CourtSlot';
import type Photo from '../../../models/shared/Photo';
import DetailItem from '../../shared/DetailItem';
import ImageCarousel from '../../shared/ImageCarousel';
import ReservationSlotCard from '../../shared/ReservationSlotCard';
import CardHeading from './CardHeading';

export interface ReservationDetailsProps {
    courtPhotos: Photo[];
    facilityName: string;
    courtName: string;
    city: string;
    address: string;
    reservationDate: string;
    reservedSlots: CourtSlot[];
    courtSlots: CourtSlot[];
    covered: boolean;
}

function ReservationDetails({
    courtPhotos,
    facilityName,
    courtName,
    city,
    address,
    reservationDate,
    reservedSlots,
    courtSlots,
    covered,
}: ReservationDetailsProps) {
    const dateDisplay = dayjs(reservationDate).format('MMMM D, YYYY');

    return (
        <Card.Root>
            <Card.Body>
                <CardHeading text="Reservation Details" />
                <Stack gap={6}>
                    {/* Facility Photos */}
                    <Box>
                        <ImageCarousel photos={courtPhotos} />
                    </Box>

                    {/* Facility and Court Information */}
                    <VStack align="start" gap={4}>
                        <DetailItem label="Facility" value={facilityName}></DetailItem>
                        <DetailItem label="City" value={city}></DetailItem>
                        <DetailItem label="Address" value={address}></DetailItem>
                        <DetailItem label="Court" value={`${courtName} ${covered ? '(Covered)' : '(Outdoor)'}`}></DetailItem>
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
