import { VStack, Container, Heading } from '@chakra-ui/react';
import ReservationsTable from '../../components/facility/ReservationsTable';
import FacilityLayout from '../../layouts/facility/FacilityLayout';

function ReservationsPage() {
    return (
        <FacilityLayout>
            <Container maxW="8xl" py={8}>
                <VStack align="flex-start" gap={6}>
                    <Heading size="lg">Court Reservations Management</Heading>
                    <ReservationsTable />
                </VStack>
            </Container>
        </FacilityLayout>
    );
}

export default ReservationsPage;
