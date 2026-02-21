import { Box, Card, SimpleGrid, VStack } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { LuCalendar } from 'react-icons/lu';
import DashboardHeaderCard from '../../components/facility/DashboardHeaderCard';
import DashboardReservationCard from '../../components/facility/DashboardReservationCard';
import FacilityPageHeader from '../../components/facility/FacilityPageHeader';
import SuccessAlert from '../../components/shared/Alert/SuccessAlert';
import Empty from '../../components/shared/Empty';
import FacilityLayout from '../../layouts/facility/FacilityLayout';
import type ReservationDashboardItem from '../../models/facility/reservation/ReservationDashboardItem';

export interface DashboardPageProps extends PageProps {
    reservations: ReservationDashboardItem[];
}

function DashboardPage() {
    const { props, flash } = usePage<DashboardPageProps>();

    const reservations = props.reservations || [];
    const success = flash?.success as string;

    return (
        <FacilityLayout>
            <DashboardHeaderCard />
            <Card.Root>
                <Card.Body>
                    <VStack gap={8} align="stretch">
                        <Box>
                            <FacilityPageHeader title="Reservations" description="These court reservations need your review and approval" />
                            {success && (
                                <Box marginBottom={4}>
                                    <SuccessAlert title="Reservation Confirmed" description={success} />
                                </Box>
                            )}
                            {reservations.length === 0 && (
                                <Empty
                                    icon={<LuCalendar />}
                                    title="No Reservations"
                                    description="There are currently no reservations that require your attention."
                                />
                            )}
                            <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4, '2xl': 5 }} gap={4}>
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
                            </SimpleGrid>
                        </Box>
                    </VStack>
                </Card.Body>
            </Card.Root>
        </FacilityLayout>
    );
}

export default DashboardPage;
