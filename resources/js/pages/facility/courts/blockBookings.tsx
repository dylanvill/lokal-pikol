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
                description="Create recurring schedules for open play sessions, events, and maintenance windows."
            />
            {props.courts.map((court) => (
                <CourtBlockBookingSection
                    key={court.id}
                    id={court.id}
                    name={court.name}
                    covered={court.covered}
                    blockBookings={court.blockBookings}
                />
            ))}
        </FacilityLayout>
    );
}

export default BlockBookingsPage;
