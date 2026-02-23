import { type PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
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
            <FacilityPageHeader title="Block Bookings" description="Manage your block bookings here." />
        </FacilityLayout>
    );
}

export default BlockBookingsPage;
