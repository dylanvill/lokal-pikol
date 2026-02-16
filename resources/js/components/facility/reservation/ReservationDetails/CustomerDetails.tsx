import { Card, Stack, VStack } from '@chakra-ui/react';
import CardHeading from '../../../customer/ReservationReview/CardHeading';
import DetailItem from '../../../shared/DetailItem';

function CustomerDetails() {
    return (
        <Card.Root>
            <Card.Body>
                <CardHeading text="Customer Details" />
                <Stack gap={6}>
                    <VStack align="start" gap={4}>
                        <DetailItem label="Name" value="John Smith" />
                        <DetailItem label="Phone Number" value="+62 812 3456 7890" />
                        <DetailItem label="Email" value="john.smith@email.com" />
                    </VStack>
                </Stack>
            </Card.Body>
        </Card.Root>
    );
}

export default CustomerDetails;