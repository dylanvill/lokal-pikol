import { VStack } from '@chakra-ui/react';
import { Form } from '@inertiajs/react';
import PaymentBreakdown from './PaymentBreakdown';
import PaymentUpload from './PaymentUpload';
import ReservationDetails from './ReservationDetails';
import ReservationNotice from './ReservationNotice';

function ReservationForm() {
    return (
        <Form method="post" action="/reservations">
            <VStack gap={6} align="stretch">
                <ReservationNotice />
                <ReservationDetails />
                <PaymentBreakdown />
                <PaymentUpload />
            </VStack>
        </Form>
    );
}

export default ReservationForm;
