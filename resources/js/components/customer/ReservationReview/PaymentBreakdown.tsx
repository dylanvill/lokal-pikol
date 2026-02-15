import { Card, HStack, Separator, Text, VStack } from '@chakra-ui/react';
import currencyFormatter from '../../../helpers/currencyFormatter';
import militaryTimeToAmPmTime from '../../../helpers/militaryTimeToAmPmTime';
import type Reservation from '../../../models/customer/reservation/Reservation';
import CardHeading from './CardHeading';
import PaymentItem from './PaymentItem';

export interface PaymentBreakdownProps {
    reservation: Reservation; // Replace with actual Reservation type when available
}

function PaymentBreakdown({ reservation }: PaymentBreakdownProps) {
    const hourlyFees = reservation.fees.hourlyFees.map((fee) => ({
        ...fee,
        startTime: militaryTimeToAmPmTime(fee.startTime),
        endTime: militaryTimeToAmPmTime(fee.endTime),
    }));

    const totalFees = reservation.fees.hourlyFees.reduce((total, fee) => total + fee.price, 0) + reservation.fees.serviceFee;

    return (
        <Card.Root>
            <Card.Body>
                <CardHeading text="Payment Breakdown" />
                <VStack gap={2}>
                    {hourlyFees.map((fee) => (
                        <PaymentItem label={`${fee.startTime} - ${fee.endTime}`} amount={fee.price} />
                    ))}
                    <PaymentItem label="Service Fee" amount={reservation.fees.serviceFee} />
                    <Separator width="full" />
                    <HStack justify="space-between" width="full">
                        <Text fontWeight="bold" fontSize="lg">
                            Total
                        </Text>
                        <Text fontWeight="bold" fontSize="lg">
                            {currencyFormatter(totalFees)}
                        </Text>
                    </HStack>
                </VStack>
            </Card.Body>
        </Card.Root>
    );
}

export default PaymentBreakdown;
