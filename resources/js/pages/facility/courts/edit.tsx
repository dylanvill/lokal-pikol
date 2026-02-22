import { type PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import FacilityPageHeader from '../../../components/facility/FacilityPageHeader';
import FacilityLayout from '../../../layouts/facility/FacilityLayout';
import type EditCourt from '../../../models/facility/EditCourt';

interface EditCourtPageProps extends PageProps {
    court: EditCourt;
}

function EditCourtPage() {
    const page = usePage<EditCourtPageProps>();

    const court = page.props.court;

    return (
        <FacilityLayout>
            <FacilityPageHeader title={`Edit ${court.name}`} description="Update your court details" />
        </FacilityLayout>
    );
}

export default EditCourtPage;
