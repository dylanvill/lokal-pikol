import { VStack } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import CourtBlockBookingSection from '../../../components/facility/CourtBlockBookingSection';
import FacilityPageHeader from '../../../components/facility/FacilityPageHeader';
import FacilityLayout from '../../../layouts/facility/FacilityLayout';
import type CourtBlockBooking from '../../../models/facility/CourtBlockBooking';

interface BlockBookingsPageProps extends PageProps {
    courts: CourtBlockBooking[];
}

function BlockBookingsPage() {
    const { props } = usePage<BlockBookingsPageProps>();

    return (
        <FacilityLayout>
            <FacilityPageHeader
                title="Block Bookings"
                description="Block court slots for recurring facility events like open play sessions. Blocked slots won't be available for regular player reservations."
            />
            <VStack gap={12} alignItems="stretch">
                {props.courts.map((court) => (
                    <CourtBlockBookingSection
                        key={court.id}
                        id={court.id}
                        name={court.name}
                        covered={court.covered}
                        blockBookings={court.blockBookings}
                    />
                ))}
            </VStack>
        </FacilityLayout>
    );
}

export default BlockBookingsPage;
