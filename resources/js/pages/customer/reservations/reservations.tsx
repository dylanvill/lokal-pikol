import { Container } from '@chakra-ui/react';
import DefaultPageLayout from '../../../layouts/DefaultPageLayout';

function ReservationsPage() {
    return (
        <DefaultPageLayout title="My Reservations">
            <Container maxW="7xl" px={4} py={4}></Container>
        </DefaultPageLayout>
    );
}

export default ReservationsPage;
