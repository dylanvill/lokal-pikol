import { Container, VStack } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import PaymentBreakdown from '../../../components/customer/ReservationReview/PaymentBreakdown';
import PaymentUpload from '../../../components/customer/ReservationReview/PaymentUpload';
import ReservationDetails from '../../../components/customer/ReservationReview/ReservationDetails';
import ReservationNotice from '../../../components/customer/ReservationReview/ReservationNotice';
import DefaultPageLayout from '../../../layouts/DefaultPageLayout';
import type Reservation from '../../../models/customer/reservation/Reservation';

export interface ReservePageProps extends PageProps {
    reservation: Reservation;
}

function ReservePage() {
    const page = usePage<ReservePageProps>();
    const { reservation } = page.props;

    return (
        <DefaultPageLayout title="Facility Name">
            <Container maxW="7xl" px={4} py={4}>
                <VStack gap={6} align="stretch">
                    <ReservationNotice />
                    <ReservationDetails reservation={reservation} />
                    <PaymentBreakdown reservation={reservation} />
                    <PaymentUpload reservation={reservation} />
                </VStack>
            </Container>
        </DefaultPageLayout>
    );
}

export default ReservePage;
