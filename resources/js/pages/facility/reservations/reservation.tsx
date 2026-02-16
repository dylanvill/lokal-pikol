import { Container, VStack } from '@chakra-ui/react';
import CourtDetails from '../../../components/facility/reservation/ReservationDetails/CourtDetails';
import CustomerDetails from '../../../components/facility/reservation/ReservationDetails/CustomerDetails';
import PaymentDetails from '../../../components/facility/reservation/ReservationDetails/PaymentDetails';
import ReservationDetails from '../../../components/facility/reservation/ReservationDetails/ReservationDetails';
import FacilityLayout from '../../../layouts/facility/FacilityLayout';

function ReservationPage() {
    return (
        <FacilityLayout>
            <Container>
                <VStack alignItems="stretch" gap={4}>
                    <CustomerDetails />
                    <CourtDetails />
                    <PaymentDetails />
                    <ReservationDetails />
                </VStack>
            </Container>
        </FacilityLayout>
    );
}

export default ReservationPage;
