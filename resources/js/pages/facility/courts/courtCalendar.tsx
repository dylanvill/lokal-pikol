import { usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import CourtCalendar, { type CourtCalendarPageProps } from '../../../components/facility/CourtCalendar';
import FacilityPageHeader from '../../../components/facility/FacilityPageHeader';
import FacilityLayout from '../../../layouts/facility/FacilityLayout';

function CourtCalendarPage() {
    const { props } = usePage<CourtCalendarPageProps>();

    const month = dayjs(props.date).format('MMMM');
    const title = `${month} schedule for ${props.court.name}`;

    return (
        <FacilityLayout>
            <FacilityPageHeader
                title={title}
                description="Monitor monthly court activities with a comprehensive view of reservations, block bookings, and availability."
            />
            <CourtCalendar />
        </FacilityLayout>
    );
}

export default CourtCalendarPage;
