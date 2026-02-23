import { Card, Stack, VStack } from '@chakra-ui/react';
import useFacility from '../../../../lib/hooks/useFacility';
import CardHeading from '../../../customer/ReservationReview/CardHeading';
import InfoAlert from '../../../shared/Alert/InfoAlert';
import DetailItem from '../../../shared/DetailItem';

export interface CustomerDetailsProps {
    name: string;
    phone: string;
    email: string;
    label: string | null;
}

function CustomerDetails({ name, phone, email, label }: CustomerDetailsProps) {
    const { facility } = useFacility();

    const internalBooking = label && email === facility.email;

    return (
        <Card.Root>
            <Card.Body>
                <CardHeading text="Customer Details" />
                {internalBooking ? (
                    <InfoAlert title="Internal Booking" description={`This reservation was made internally by the facility. Label added: ${label}`} />
                ) : (
                    <Stack gap={6}>
                        <VStack align="start" gap={4}>
                            <DetailItem label="Name" value={name} />
                            <DetailItem label="Phone Number" value={phone} />
                            <DetailItem label="Email" value={email} />
                        </VStack>
                    </Stack>
                )}
            </Card.Body>
        </Card.Root>
    );
}

export default CustomerDetails;
