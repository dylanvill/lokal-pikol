import { Container, VStack } from '@chakra-ui/react';
import PaymentBreakdown from '../../../components/customer/ReservationReview/PaymentBreakdown';
import PaymentUpload from '../../../components/customer/ReservationReview/PaymentUpload';
import ReservationDetails from '../../../components/customer/ReservationReview/ReservationDetails';
import ReservationNotice from '../../../components/customer/ReservationReview/ReservationNotice';
import DefaultPageLayout from '../../../layouts/DefaultPageLayout';

function ReservePage() {
    return (
        <DefaultPageLayout title="Facility Name">
            <Container maxW="7xl" px={4} py={4}>
                <VStack gap={6} align="stretch">
                    <ReservationNotice />
                    <ReservationDetails />
                    <PaymentBreakdown />
                    <PaymentUpload />
                </VStack>
            </Container>
        </DefaultPageLayout>
    );
}

export default ReservePage;
