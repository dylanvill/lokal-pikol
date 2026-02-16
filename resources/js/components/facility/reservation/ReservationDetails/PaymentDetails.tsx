import { Card, HStack, Separator, Text, VStack, Image, AspectRatio } from '@chakra-ui/react';
import CardHeading from '../../../customer/ReservationReview/CardHeading';
import PaymentItem from '../../../customer/ReservationReview/PaymentItem';

function PaymentDetails() {
    // Static payment data for now
    const hourlyFees = [
        { startTime: '2:00 PM', endTime: '3:00 PM', price: 100000 },
        { startTime: '3:00 PM', endTime: '4:00 PM', price: 100000 }
    ];
    
    const serviceFee = 15000;
    const totalFees = hourlyFees.reduce((total, fee) => total + fee.price, 0) + serviceFee;
    
    const currencyFormatter = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(amount);
    };

    return (
        <Card.Root>
            <Card.Body>
                <CardHeading text="Payment Details" />
                <VStack gap={4}>
                    {/* Receipt Screenshot */}
                    <AspectRatio ratio={3 / 4} width="full" maxW="300px">
                        <Image
                            src="https://picsum.photos/300/400?random=receipt"
                            alt="Payment Receipt"
                            borderRadius="md"
                            objectFit="cover"
                        />
                    </AspectRatio>
                    
                    {/* Payment Breakdown */}
                    <VStack gap={2} width="full">
                        {hourlyFees.map((fee, index) => (
                            <PaymentItem 
                                key={index}
                                label={`${fee.startTime} - ${fee.endTime}`} 
                                amount={fee.price} 
                            />
                        ))}
                        <PaymentItem label="Service Fee" amount={serviceFee} />
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
