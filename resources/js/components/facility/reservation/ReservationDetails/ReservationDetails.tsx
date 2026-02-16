import { Button, Card, GridItem, HStack, SimpleGrid, Stack, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { LuCheck, LuX } from 'react-icons/lu';
import type ReservationStatus from '../../../../models/customer/reservation/ReservationStatus';
import type CourtSlot from '../../../../models/shared/CourtSlot';
import CardHeading from '../../../customer/ReservationReview/CardHeading';
import DetailItem from '../../../shared/DetailItem';
import ReservationSlotCard from '../../../shared/ReservationSlotCard';

export interface ReservationDetailsProps {
    date: string;
    reservedSlots: CourtSlot[];
    courtSlots: CourtSlot[];
    status: ReservationStatus;
}

function ReservationDetails({ date, reservedSlots, courtSlots }: ReservationDetailsProps) {
    const dateDisplay = dayjs(date).format('MMMM D, YYYY');

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
                                {reservedSlots.map((slot) => (
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
