import { Heading, SimpleGrid } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { InfiniteScroll, usePage } from '@inertiajs/react';
import { LuCalendar } from 'react-icons/lu';
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

    const reservations = props.reservations.data || [];

    const success = flash.success as string | undefined;

    return (
        <DefaultPageLayout title="My Reservations">
            <BackNavigationBase href="/" label='Home' />
            <Heading mb={6}>Reservations</Heading>
            {success && <SuccessAlert title="Receipt uploaded" description={success} />}
            {reservations.length === 0 && (
                <Empty icon={<LuCalendar />} title="No Reservations" description="You have no reservations at the moment." />
            )}
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
