import React from 'react';
import FacilityPageHeader from '../../../components/facility/FacilityPageHeader';
import FacilityLayout from '../../../layouts/facility/FacilityLayout';

function BlockBookingsPage() {
    return (
        <FacilityLayout>
            <FacilityPageHeader title="Block Bookings" description="Manage your block bookings here." />
        </FacilityLayout>
    );
}

export default BlockBookingsPage;
