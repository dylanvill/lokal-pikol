import CourtBlockReservationSection from '../../components/court/CourtBlockReservationSection';
import SchedulingLayout from '../../layouts/SchedulingLayout';
import type CourtBlockReservation from '../../models/CourtBlockReservation';
import type SchedulingPageProps from '../../types/SchedulingPageProps';

interface BlockReservationsPageProps extends SchedulingPageProps {
    courts: CourtBlockReservation[];
}

function BlockReservationsPage({ courts }: BlockReservationsPageProps) {
    return (
        <SchedulingLayout title="Block reservations">
            {courts.map((court) => (
                <CourtBlockReservationSection id={court.id} name={court.name} blockReservations={court.blockReservations} />
            ))}
        </SchedulingLayout>
    );
}

export default BlockReservationsPage;
