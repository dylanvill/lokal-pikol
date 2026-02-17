import { SimpleGrid } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { LuCalendar } from 'react-icons/lu';
import ReservationCard from '../../../components/customer/ReservationCard';
import Empty from '../../../components/shared/Empty';
import DefaultPageLayout from '../../../layouts/DefaultPageLayout';
import type Reservation from '../../../models/customer/reservation/Reservation';

interface ReservationPageProps extends PageProps {
    reservations: Reservation[];
}

function ReservationsPage() {
    const { props } = usePage<ReservationPageProps>();

    const reservations = props.reservations || [];

    return (
        <DefaultPageLayout title="My Reservations">
            {reservations.length === 0 && (
                <Empty icon={<LuCalendar />} title="No Reservations" description="You have no reservations at the moment." />
            )}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={4} >
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
        </DefaultPageLayout>
    );
}

export default ReservationsPage;
