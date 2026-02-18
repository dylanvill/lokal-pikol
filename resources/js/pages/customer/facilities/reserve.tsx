import { VStack } from '@chakra-ui/react';
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
            <VStack gap={6} align="stretch">
                <ReservationNotice />
                <ReservationDetails
                    courtPhotos={reservation.court.photos}
                    facilityName={reservation.facility.name}
                    courtName={reservation.court.name}
                    city={reservation.facility.city}
                    address={reservation.facility.address}
                    reservationDate={reservation.reservationDate}
                    reservedSlots={reservation.slots}
                    courtSlots={reservation.court.slots}
                    covered={reservation.court.covered}
                />
                <PaymentBreakdown reservation={reservation} />
                <PaymentUpload reservation={reservation} />
            </VStack>
        </DefaultPageLayout>
    );
}

export default ReservePage;
