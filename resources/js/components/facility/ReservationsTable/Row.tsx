import { Badge, Button, Table, Text, Link as ChakraLink } from '@chakra-ui/react';
import { Link, router } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { LuArrowRight, LuCheck, LuExternalLink } from 'react-icons/lu';
import militaryTimeToAmPmTime from '../../../helpers/militaryTimeToAmPmTime';
import statusColorParser from '../../../helpers/statusColorParser';
import type ReservationStatus from '../../../models/customer/reservation/ReservationStatus';
import type Photo from '../../../models/shared/Photo';

export interface RowProps {
    id: string;
    courtName: string;
    customerName: string;
    reservationDate: string;
    startTime: string;
    endTime: string;
    status: ReservationStatus;
    paymentReceipt: Photo | null;
    requestedAt: string;
}

function Row({ id, courtName, customerName, reservationDate, startTime, endTime, status, paymentReceipt, requestedAt }: RowProps) {
    const hasPaymentReceipt = !!paymentReceipt?.url;

    const statusColor = statusColorParser(status);

    const timeDisplay = useMemo(() => {
        const startTimeDisplay = militaryTimeToAmPmTime(startTime);
        const endTimeDisplay = militaryTimeToAmPmTime(endTime);
        return `${startTimeDisplay} - ${endTimeDisplay}`;
    }, [startTime, endTime]);

    const requestedAtDisplay = useMemo(() => {
        return dayjs(requestedAt).format('MMMM D, YYYY h:mm A');
    }, [requestedAt]);

    const reservationDateDisplay = useMemo(() => {
        return dayjs(reservationDate).format('MMMM D, YYYY');
    }, [reservationDate]);

    const onConfirmClicked = (id: string) => {
        router.post(`/facility/reservations/${id}/confirm`);
    };

    return (
        <Table.Row key={id}>
            <Table.Cell>
                <Text fontWeight="medium">{courtName}</Text>
            </Table.Cell>
            <Table.Cell>
                <Text fontWeight="medium">{customerName}</Text>
            </Table.Cell>
            <Table.Cell>
                <Text>{reservationDateDisplay}</Text>
            </Table.Cell>
            <Table.Cell>
                <Text>{timeDisplay}</Text>
            </Table.Cell>
            <Table.Cell>
                <Badge colorPalette={statusColor} textTransform="capitalize">
                    {status}
                </Badge>
            </Table.Cell>
            <Table.Cell>
                {paymentReceipt ? (
                    <ChakraLink href={paymentReceipt?.url ?? ''} target="_blank">
                        View Receipt <LuExternalLink />
                    </ChakraLink>
                ) : (
                    <Text fontSize="sm" color="gray.400">
                        N/A
                    </Text>
                )}
            </Table.Cell>
            <Table.Cell>
                <Text fontSize="sm" color="gray.600">
                    {requestedAtDisplay}
                </Text>
            </Table.Cell>
            <Table.Cell>
                {status === 'on hold' && hasPaymentReceipt ? (
                    <Button size="xs" colorPalette="green" onClick={() => onConfirmClicked(id)}>
                        <LuCheck />
                        Confirm
                    </Button>
                ) : (
                    <Text fontSize="sm" color="gray.400">
                        N/A
                    </Text>
                )}
            </Table.Cell>
            <Table.Cell>
                <Link href={`/facility/reservations/${id}`}>
                    <Button size="sm" variant="ghost">
                        Full Details
                        <LuArrowRight className="w-4 h-4" />
                    </Button>
                </Link>
            </Table.Cell>
        </Table.Row>
    );
}

export default Row;
