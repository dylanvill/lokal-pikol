import { Button, Card, Link as ChakraLink, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { LuExternalLink, LuUser, LuCalendar, LuClock, LuCheck, LuMail, LuPhone, LuGrid2X2 } from 'react-icons/lu';
import courtTypeIconParser from '../../helpers/courtTypeIconParser';
import courtTypeLabelParser from '../../helpers/courtTypeLabelParser';
import militaryTimeToAmPmTime from '../../helpers/militaryTimeToAmPmTime';
import type Photo from '../../models/shared/Photo';
import DetailWithIcon from '../shared/DetailWithIcon';

export interface DashboardReservationCardProps {
    id: string;
    courtName: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    reservationDate: string;
    startTime: string;
    endTime: string;
    covered: boolean;
    paymentReceipt: Photo;
}

function DashboardReservationCard({
    id,
    courtName,
    customerName,
    customerPhone,
    customerEmail,
    reservationDate,
    startTime,
    endTime,
    covered,
    paymentReceipt,
}: DashboardReservationCardProps) {
    console.log("🚀 ~ DashboardReservationCard ~ paymentReceipt:", paymentReceipt)
    const dateDisplay = useMemo(() => {
        return dayjs(reservationDate).format('MMMM D, YYYY');
    }, [reservationDate]);

    const timeDisplay = useMemo(() => {
        const startTimeDisplay = militaryTimeToAmPmTime(startTime);
        const endTimeDisplay = militaryTimeToAmPmTime(endTime);
        return `${startTimeDisplay} - ${endTimeDisplay}`;
    }, [startTime, endTime]);

    const Icon = courtTypeIconParser(covered);
    const courtTypeLabel = courtTypeLabelParser(covered);

    return (
        <Card.Root key={id}>
            <Card.Header>
                <Card.Title>
                    <HStack gap={1}>
                        <LuUser />
                        <Text margin={0}>{customerName}</Text>
                    </HStack>
                </Card.Title>
                <Card.Description>
                    <DetailWithIcon icon={<LuPhone color="black" />} label={customerPhone} textProps={{ color: 'black' }} />
                    <DetailWithIcon icon={<LuMail color="black" />} label={customerEmail} textProps={{ color: 'black' }} />
                </Card.Description>
            </Card.Header>
            <Card.Body>
                <Heading size="md" color="gray.800">
                    Reservation Details
                </Heading>
                <VStack align="stretch" gap={2}>
                    <DetailWithIcon icon={<LuGrid2X2 color="black" />} label={courtName} textProps={{ color: 'black' }} />
                    <DetailWithIcon icon={<Icon color="black" />} label={courtTypeLabel} textProps={{ color: 'black' }} />
                    <DetailWithIcon icon={<LuCalendar color="black" />} label={dateDisplay} textProps={{ color: 'black' }} />
                    <DetailWithIcon icon={<LuClock color="black" />} label={timeDisplay} textProps={{ color: 'black' }} />
                    <DetailWithIcon
                        icon={<LuExternalLink color="black" />}
                        label={
                            <Text as="span">
                                <ChakraLink href={paymentReceipt.url} target="_blank">View Payment Receipt</ChakraLink>
                            </Text>
                        }
                        textProps={{ color: 'black', fontStyle: 'italic' }}
                    />
                </VStack>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
                <Button variant="solid" colorPalette="green" size="xs">
                    <LuCheck /> Confirm
                </Button>
            </Card.Footer>
        </Card.Root>
    );
}

export default DashboardReservationCard;
