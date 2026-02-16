import { Card, Text, Badge, HStack, VStack, Flex, AspectRatio, Image } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import dayjs from 'dayjs';
import { LuCheck, LuClock, LuHouse, LuInfo, LuMapPin, LuX } from 'react-icons/lu';
import courtTypeIconParser from '../../helpers/courtTypeIconParser';
import militaryTimeToAmPmTime from '../../helpers/militaryTimeToAmPmTime';
import type ReservationStatus from '../../models/customer/reservation/ReservationStatus';
import DetailWithIcon from '../shared/DetailWithIcon';

const BadgeComponent = (status: ReservationStatus) => {
    switch (status) {
        case 'on hold':
            return (
                <Badge colorPalette="orange" variant="solid" marginTop={1}>
                    <LuInfo />
                    On Hold
                </Badge>
            );
        case 'confirmed':
            return (
                <Badge colorPalette="green" variant="solid" marginTop={1}>
                    <LuCheck />
                    Confirmed
                </Badge>
            );
        case 'cancelled':
            return (
                <Badge colorPalette="red" variant="solid" marginTop={1}>
                    <LuX />
                    Cancelled
                </Badge>
            );
        case 'pending':
            return (
                <Badge colorPalette="blue" variant="solid" marginTop={1}>
                    <LuClock />
                    Pending Approval
                </Badge>
            );
        default:
            return (
                <Badge colorPalette="gray" variant="solid" marginTop={1}>
                    {status}
                </Badge>
            );
    }
};

const StatusNote = (status: ReservationStatus) => {
    switch (status) {
        case 'on hold':
            return 'Your reservation is currently on hold. Please settle any outstanding payments.';
        case 'pending':
            return 'Your reservation is pending approval by the facility. We will notify you once it is confirmed.';
        case 'confirmed':
            return 'Your reservation is confirmed! We look forward to seeing you on the court.';
        case 'cancelled':
            return 'This reservation has been cancelled. If you have any questions, please contact support.';
        default:
            return '';
    }
};
export interface ReservationCardProps {
    id: string;
    facilityName: string;
    city: string;
    address: string;
    date: string;
    startTime: string;
    endTime: string;
    status: ReservationStatus;
    courtImageUrl: string;
    courtName: string;
    covered: boolean;
}

function ReservationCard({
    id,
    facilityName,
    city,
    address,
    date,
    startTime,
    endTime,
    status,
    courtImageUrl,
    courtName,
    covered,
}: ReservationCardProps) {
    const CourtIcon = courtTypeIconParser(covered);

    const startTimeDisplay = militaryTimeToAmPmTime(startTime);
    const endTimeDisplay = militaryTimeToAmPmTime(endTime);
    const displayDate = dayjs(date).format('MMMM D, YYYY');

    const link = status === 'on hold' ? `/reservations/reserve/${id}` : `/reservations/${id}`;

    return (
        <Link href={link}>
            <Card.Root>
                <Card.Body gap="2">
                    <AspectRatio ratio={16 / 9} width="100%" borderRadius={8} overflow="hidden">
                        <Image src={courtImageUrl} borderRadius={8} />
                    </AspectRatio>
                    <Flex justify="space-between" align="flex-start" mt="2">
                        <Card.Title marginRight={4}>{courtName}</Card.Title>
                        {BadgeComponent(status)}
                    </Flex>

                    <Card.Description>
                        <VStack align="flex-start" gap={1} mt={2}>
                            <DetailWithIcon icon={<LuHouse />} label={facilityName} />
                            <DetailWithIcon icon={<LuMapPin />} label={`${city}, ${address}`} />
                            <DetailWithIcon icon={<CourtIcon />} label={covered ? 'Covered' : 'Outdoor'} />
                        </VStack>

                        <HStack gap={6} mt={4} pt={3} borderTop="1px solid" borderColor="gray.200">
                            <VStack align="flex-start" gap={1}>
                                <Text fontSize="xs" color="gray.500" fontWeight="semibold">
                                    DATE
                                </Text>
                                <Text fontSize="sm" fontWeight="medium">
                                    {displayDate}
                                </Text>
                            </VStack>
                            <VStack align="flex-start" gap={1}>
                                <Text fontSize="xs" color="gray.500" fontWeight="semibold">
                                    TIME
                                </Text>
                                <Text fontSize="sm" fontWeight="medium">
                                    {startTimeDisplay} - {endTimeDisplay}
                                </Text>
                            </VStack>
                        </HStack>
                        <Text fontSize="sm" color="gray.500" mt={2} fontStyle="italic">
                            {StatusNote(status)}
                        </Text>
                    </Card.Description>
                </Card.Body>
            </Card.Root>
        </Link>
    );
}

export default ReservationCard;
