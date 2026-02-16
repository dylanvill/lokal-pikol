import { Container, VStack } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import CourtDetails from '../../../components/facility/reservation/ReservationDetails/CourtDetails';
import CustomerDetails from '../../../components/facility/reservation/ReservationDetails/CustomerDetails';
import PaymentDetails from '../../../components/facility/reservation/ReservationDetails/PaymentDetails';
import ReservationActions from '../../../components/facility/reservation/ReservationDetails/ReservationActions';
import ReservationDetails from '../../../components/facility/reservation/ReservationDetails/ReservationDetails';
import FacilityLayout from '../../../layouts/facility/FacilityLayout';
import type Reservation from '../../../models/facility/reservation/Reservation';

interface ReservationPageProps extends PageProps {
    reservation: Reservation;
}

function ReservationPage() {
    const { props } = usePage<ReservationPageProps>();

    const reservation = props.reservation;

    return (
        <FacilityLayout>
            <Container>
                <VStack alignItems="stretch" gap={4}>
                    <CustomerDetails name={reservation.customer.fullName} phone={reservation.customer.phone} email={reservation.customer.email} />
                    <CourtDetails courtName={reservation.court.name} covered={reservation.court.covered} photos={reservation.court.photos} />
                    <PaymentDetails fees={reservation.fees} paymentReceipt={reservation.paymentReceipt} />
                    <ReservationDetails
                        date={reservation.reservationDate}
                        reservedSlots={reservation.slots}
                        courtSlots={reservation.court.slots}
                        status={reservation.status}
                    />
                    <ReservationActions status={reservation.status} paymentReceipt={reservation.paymentReceipt} />
                </VStack>
            </Container>
        </FacilityLayout>
    );
}

export default ReservationPage;
