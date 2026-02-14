import { Card, HStack, Separator, Text, VStack } from '@chakra-ui/react';
import currencyFormatter from '../../../helpers/currencyFormatter';
import CardHeading from './CardHeading';
import PaymentItem from './PaymentItem';

function PaymentBreakdown() {
    return (
        <Card.Root>
            <Card.Body>
                <CardHeading text="Payment Breakdown" />
                <VStack gap={3}>
                    <PaymentItem label="Court Fee (2 hours)" amount={800} />
                    <PaymentItem label="Service Fee" amount={15} />
                    <Separator width="full" />
                    <HStack justify="space-between" width="full">
                        <Text fontWeight="bold" fontSize="lg">
                            Total
                        </Text>
                        <Text fontWeight="bold" fontSize="lg">
                        {currencyFormatter(815)}
                        </Text>
                    </HStack>
                </VStack>
            </Card.Body>
        </Card.Root>
    );
}

export default PaymentBreakdown;
