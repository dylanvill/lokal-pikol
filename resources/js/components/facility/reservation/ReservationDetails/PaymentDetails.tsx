import { Card, HStack, Separator, Text, VStack, Image, Box } from '@chakra-ui/react';
import { LuFileQuestion } from 'react-icons/lu';
import currencyFormatter from '../../../../helpers/currencyFormatter';
import militaryTimeToAmPmTime from '../../../../helpers/militaryTimeToAmPmTime';
import type Photo from '../../../../models/shared/Photo';
import type ReservationFees from '../../../../models/shared/ReservationFees';
import CardHeading from '../../../customer/ReservationReview/CardHeading';
import PaymentItem from '../../../customer/ReservationReview/PaymentItem';
import Empty from '../../../shared/Empty';

export interface PaymentDetailsProps {
    fees: ReservationFees;
    paymentReceipt: Photo | null;
}

function PaymentDetails({ fees, paymentReceipt }: PaymentDetailsProps) {
    const totalFees = fees.hourlyFees.reduce((total, fee) => total + fee.price, 0) + fees.serviceFee;

    const hourlyFees = fees.hourlyFees.map((fee) => ({
        ...fee,
        startTime: militaryTimeToAmPmTime(fee.startTime),
        endTime: militaryTimeToAmPmTime(fee.endTime),
    }));

    return (
        <Card.Root>
            <Card.Body>
                <CardHeading text="Payment Details" />
                <VStack gap={4}>
                    {/* Receipt Screenshot */}
                    {paymentReceipt ? (
                        <Box>
                            <Image src={paymentReceipt.url} alt="Payment Receipt" borderRadius="md" objectFit="cover" />
                        </Box>
                    ) : (
                        <Empty
                            icon={<LuFileQuestion />}
                            title="Receipt unavailable"
                            description="The customer hasn't uploaded a payment receipt. A preview of the receipt will be displayed here once the user uploads it."
                        />
                    )}

                    {/* Payment Breakdown */}
                    <VStack gap={2} width="full">
                        {hourlyFees.map((fee, index) => (
                            <PaymentItem key={index} label={`${fee.startTime} - ${fee.endTime}`} amount={fee.price} />
                        ))}
                        <PaymentItem label="Service Fee" amount={fees.serviceFee} />
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
                </VStack>
            </Card.Body>
        </Card.Root>
    );
}

export default PaymentDetails;
