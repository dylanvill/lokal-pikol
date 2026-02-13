import { Container } from '@chakra-ui/react';
import ReservationForm from '../../../components/customer/ReservationForm';
import DefaultPageLayout from '../../../layouts/DefaultPageLayout';

function ReservePage() {
    return (
        <DefaultPageLayout title="Facility Name">
            <Container maxW="7xl" px={4} py={4}>
                <ReservationForm />
            </Container>
        </DefaultPageLayout>
    );
}

export default ReservePage;
