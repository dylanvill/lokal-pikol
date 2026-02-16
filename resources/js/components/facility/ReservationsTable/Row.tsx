import { Badge, Button, Table, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { LuArrowRight, LuCheck } from 'react-icons/lu';
import militaryTimeToAmPmTime from '../../../helpers/militaryTimeToAmPmTime';
import statusColorParser from '../../../helpers/statusColorParser';
import type ReservationStatus from '../../../models/customer/reservation/ReservationStatus';

export interface RowProps {
    id: string;
    courtName: string;
    date: string;
    startTime: string;
    endTime: string;
    status: ReservationStatus;
    paymentReceipt: string;
    requestedAt: string;
}

function Row({ id, courtName, date, startTime, endTime, status, paymentReceipt, requestedAt }: RowProps) {
    const statusColor = statusColorParser(status);

    const timeDisplay = useMemo(() => {
        const startTimeDisplay = militaryTimeToAmPmTime(startTime);
        const endTimeDisplay = militaryTimeToAmPmTime(endTime);
        return `${startTimeDisplay} - ${endTimeDisplay}`;
    }, [startTime, endTime]);

    const requestedAtDisplay = useMemo(() => {
        return dayjs(requestedAt).format('MMMM D, YYYY h:mm A');
    }, [requestedAt]);

    return (
        <Table.Row key={id}>
            <Table.Cell>
                <Text fontWeight="medium">{courtName}</Text>
            </Table.Cell>
            <Table.Cell>
                <Text>{date}</Text>
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
                <Text>Receipt here</Text>
            </Table.Cell>
            <Table.Cell>
                <Text fontSize="sm" color="gray.600">
                    {requestedAtDisplay}
                </Text>
            </Table.Cell>
            <Table.Cell>
                {status === 'pending' && (
                    <Button size="sm" colorPalette="green">
                        <LuCheck />
                        Approve
                    </Button>
                )}
                {status !== 'pending' && (
                    <Text fontSize="sm" color="gray.400">
                        N/A
                    </Text>
                )}
            </Table.Cell>
            <Table.Cell>
                <Button size="sm" variant="ghost">
                    Full Details
                    <LuArrowRight className="w-4 h-4" />
                </Button>
            </Table.Cell>
        </Table.Row>
    );
}

export default Row;
