import { Box, Heading, SimpleGrid, Tabs, Text } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { InfiniteScroll, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { LuCalendar, LuCalendarCheck, LuHistory } from 'react-icons/lu';
import ReservationCard from '../../../components/customer/ReservationCard';
import SuccessAlert from '../../../components/shared/Alert/SuccessAlert';
import BackNavigationBase from '../../../components/shared/BackNavigationBase';
import Empty from '../../../components/shared/Empty';
import DefaultPageLayout from '../../../layouts/DefaultPageLayout';
import type Reservation from '../../../models/customer/reservation/Reservation';
import type PaginatedData from '../../../models/shared/Pagination';

interface ReservationPageProps extends PageProps {
    reservations: PaginatedData<Reservation>;
}

function ReservationsPage() {
    const { props, flash } = usePage<ReservationPageProps>();

    const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');

    const reservations = props.reservations.data || [];
    const total = props.reservations.meta.total || 0;

    const success = flash.success as string | undefined;

    const handleTabChanged = (value: 'active' | 'past') => {
        router.get(
            '/reservations',
            { type: value, page: 1 },
            {
                preserveState: true,
                reset: ['reservations'],
            },
        );
        setActiveTab(value);
    };

    return (
        <DefaultPageLayout title="My Reservations">
            <Box mb={8}>
                <BackNavigationBase href="/" label="Home" />
                <Heading>Active Reservations</Heading>
                <Text color="gray.600">Here are your court reservations. Click on a reservation to view details or manage your booking.</Text>
            </Box>
            {success && (
                <Box marginBottom={4}>
                    <SuccessAlert title="Receipt uploaded" description={success} />
                </Box>
            )}
            {reservations.length === 0 && (
                <Empty icon={<LuCalendar />} title="No Reservations" description="You have no reservations at the moment." />
            )}
            <Box marginBottom={8}>
                <Tabs.Root
                    variant="enclosed"
                    value={activeTab}
                    onValueChange={(value) => handleTabChanged(value.value as 'active' | 'past')}
                    marginBottom={2}
                >
                    <Tabs.List>
                        <Tabs.Trigger value="active">
                            <LuCalendarCheck /> Active Reservations
                        </Tabs.Trigger>
                        <Tabs.Trigger value="past">
                            <LuHistory /> Past Reservations
                        </Tabs.Trigger>
                    </Tabs.List>
                </Tabs.Root>
                <Text fontSize="sm">Showing {total} reservations</Text>
            </Box>
            <InfiniteScroll data="reservations">
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={4}>
                    {reservations.map((reservation) => (
                        <ReservationCard
                            key={reservation.id}
                            id={reservation.id}
                            facilityName={reservation.facility.name}
                            city={reservation.facility.city}
                            address={reservation.facility.address}
                            covered={reservation.court.covered}
                            date={reservation.reservationDate}
                            startTime={reservation.startTime}
                            endTime={reservation.endTime}
                            status={reservation.status}
                            courtImageUrl={reservation.court.photos[0].url}
                            courtName={reservation.court.name}
                        />
                    ))}
                </SimpleGrid>
            </InfiniteScroll>
        </DefaultPageLayout>
    );
}

export default ReservationsPage;
