import { Container } from '@chakra-ui/react';
import CourtBlockBookingForm from '../../../components/facility/CourtBlockBookingForm';
import FacilityPageHeader from '../../../components/facility/FacilityPageHeader';
import FacilityLayout from '../../../layouts/facility/FacilityLayout';

function CreateBlockBookingPage() {
    return (
        <FacilityLayout>
            <Container maxWidth="4xl">
                <FacilityPageHeader
                    title="Create Block Booking"
                    description="Reserve recurring time slots for open play sessions, special events, or maintenance periods."
                />
                <CourtBlockBookingForm />
            </Container>
        </FacilityLayout>
    );
}

export default CreateBlockBookingPage;
