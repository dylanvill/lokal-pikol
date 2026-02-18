import { Box, VStack } from '@chakra-ui/react';
import DashboardHeaderCard from '../../components/facility/DashboardHeaderCard';
import DashboardReservationCard from '../../components/facility/DashboardReservationCard';
import FacilityPageHeader from '../../components/facility/FacilityPageHeader';
import FacilityLayout from '../../layouts/facility/FacilityLayout';
import type ReservationDashboardItem from '../../models/facility/reservation/ReservationDashboardItem';

export interface DashboardPageProps {
    reservations: ReservationDashboardItem[];
}

function DashboardPage({ reservations }: DashboardPageProps) {
    return (
        <FacilityLayout>
            <VStack gap={8} align="stretch">
                <DashboardHeaderCard />
                <Box>
                    <FacilityPageHeader title="Reservations" description="These court reservations need your review and approval" />
                    {reservations.map((reservation) => (
                        <DashboardReservationCard
                            key={reservation.id}
                            id={reservation.id}
                            courtName={reservation.courtName}
                            customerName={reservation.customerName}
                            customerPhone={reservation.customerPhone}
                            customerEmail={reservation.customerEmail}
                            reservationDate={reservation.reservationDate}
                            startTime={reservation.startTime}
                            endTime={reservation.endTime}
                            covered={reservation.covered}
                            paymentReceipt={reservation.paymentReceipt}
                        />
                    ))}
                </Box>
            </VStack>
        </FacilityLayout>
    );
}

export default DashboardPage;
