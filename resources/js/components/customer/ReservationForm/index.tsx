import { Box, Button, Card, Field, Heading, Text, FileUpload, VStack } from '@chakra-ui/react';
import { Form } from '@inertiajs/react';
import { HiUpload } from 'react-icons/hi';
import PaymentBreakdown from './PaymentBreakdown';
import ReservationDetails from './ReservationDetails';
import ReservationNotice from './ReservationNotice';
import PaymentUpload from './PaymentUpload';

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
