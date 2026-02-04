import { Box, Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import DashboardCourtCard from '../../components/client/DashboardCourtCard';
import DashboardHeaderCard from '../../components/client/DashboardHeaderCard';
import ClientLayout from '../../layouts/client/ClientLayout';

function Dashboard() {
    // Static data
    const clientName = 'Premium Sports Center';
    const reservationRequestsCount = 3;
    const currentDate = '2026-02-04';

    const courts = [
        {
            id: 1,
            name: 'Court 1',
            covered: true,
            slots: [
                { id: 1, time: '08:00:00', isBooked: false },
                { id: 2, time: '09:00:00', isBooked: true },
                { id: 3, time: '10:00:00', isBooked: false },
                { id: 4, time: '11:00:00', isBooked: true },
                { id: 5, time: '12:00:00', isBooked: false },
                { id: 6, time: '13:00:00', isBooked: false },
                { id: 7, time: '14:00:00', isBooked: true },
                { id: 8, time: '15:00:00', isBooked: false },
            ],
        },
        {
            id: 2,
            name: 'Court 2',
            covered: false,
            slots: [
                { id: 9, time: '08:00:00', isBooked: true },
                { id: 10, time: '09:00:00', isBooked: true },
                { id: 11, time: '10:00:00', isBooked: false },
                { id: 12, time: '11:00:00', isBooked: false },
                { id: 13, time: '12:00:00', isBooked: true },
                { id: 14, time: '13:00:00', isBooked: false },
                { id: 15, time: '14:00:00', isBooked: false },
                { id: 16, time: '15:00:00', isBooked: true },
            ],
        },
        {
            id: 3,
            name: 'Court 3',
            covered: true,
            slots: [
                { id: 17, time: '08:00:00', isBooked: false },
                { id: 18, time: '09:00:00', isBooked: false },
                { id: 19, time: '10:00:00', isBooked: false },
                { id: 20, time: '11:00:00', isBooked: true },
                { id: 21, time: '12:00:00', isBooked: true },
                { id: 22, time: '13:00:00', isBooked: true },
                { id: 23, time: '14:00:00', isBooked: false },
                { id: 24, time: '15:00:00', isBooked: false },
            ],
        },
    ];

    return (
        <ClientLayout>
            <VStack gap={8} align="stretch">
                {/* Header with Welcome and Compact Reservations */}
                <DashboardHeaderCard clientName={clientName} currentDate={currentDate} reservationRequestsCount={reservationRequestsCount} />

                {/* Courts Section */}
                <Box>
                    <Heading size="md" mb={4}>
                        Your Courts
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                        {courts.map((court) => (
                            <DashboardCourtCard
                                key={court.id}
                                id={court.id}
                                name={court.name}
                                covered={court.covered ? 'covered' : 'outdoor'}
                                slots={court.slots}
                            />
                        ))}
                    </SimpleGrid>
                </Box>
            </VStack>
        </ClientLayout>
    );
}

export default Dashboard;
