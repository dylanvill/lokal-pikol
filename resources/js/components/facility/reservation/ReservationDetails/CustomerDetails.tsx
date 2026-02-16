import { Card, Stack, VStack } from '@chakra-ui/react';
import CardHeading from '../../../customer/ReservationReview/CardHeading';
import DetailItem from '../../../shared/DetailItem';

export interface CustomerDetailsProps {
    name: string;
    phone: string;
    email: string;
}

function CustomerDetails({ name, phone, email }: CustomerDetailsProps) {
    return (
        <Card.Root>
            <Card.Body>
                <CardHeading text="Customer Details" />
                <Stack gap={6}>
                    <VStack align="start" gap={4}>
                        <DetailItem label="Name" value={name} />
                        <DetailItem label="Phone Number" value={phone} />
                        <DetailItem label="Email" value={email} />
                    </VStack>
                </Stack>
            </Card.Body>
        </Card.Root>
    );
}

export default CustomerDetails;
