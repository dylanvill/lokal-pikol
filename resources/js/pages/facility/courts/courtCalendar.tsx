import { usePage } from '@inertiajs/react';
import CourtCalendar, { type CourtCalendarPageProps } from '../../../components/facility/CourtCalendar';
import FacilityPageHeader from '../../../components/facility/FacilityPageHeader';
import FacilityLayout from '../../../layouts/facility/FacilityLayout';

function CourtCalendarPage() {
    const { props } = usePage<CourtCalendarPageProps>();
    return (
        <FacilityLayout>
            <FacilityPageHeader title={props.court.courtName} description="Viewing calendar for this court. Currently showing February." />
            <CourtCalendar />
        </FacilityLayout>
    );
}

export default CourtCalendarPage;
