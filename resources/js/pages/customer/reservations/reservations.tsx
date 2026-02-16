import ReservationCard from '../../../components/customer/ReservationCard';
import DefaultPageLayout from '../../../layouts/DefaultPageLayout';

function ReservationsPage() {
    return (
        <DefaultPageLayout title="My Reservations">
            <ReservationCard />
        </DefaultPageLayout>
    );
}

export default ReservationsPage;
