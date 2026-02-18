import { Stack } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { useMemo } from 'react';
import FacilityReservationInfoCard from '../../../components/customer/FacilityReservationInfoCard';
import ReservationDetails from '../../../components/customer/ReservationReview/ReservationDetails';
import DangerAlert from '../../../components/shared/Alert/DangerAlert';
import InfoAlert from '../../../components/shared/Alert/InfoAlert';
import SuccessAlert from '../../../components/shared/Alert/SuccessAlert';
import militaryTimeToAmPmTime from '../../../helpers/militaryTimeToAmPmTime';
import DefaultPageLayout from '../../../layouts/DefaultPageLayout';
import type Reservation from '../../../models/customer/reservation/Reservation';

export interface ReservationPageProps extends PageProps {
    reservation: Reservation;
}
function ReservationPage() {
    const page = usePage<ReservationPageProps>();
    const { reservation } = page.props;

    const AlertRender = useMemo(() => {
        switch (reservation.status) {
            case 'confirmed':
                return <SuccessAlert title="Reservation Confirmed!" description="Your court is reserved and ready for you. See you on the court!" />;
            case 'pending':
                return <InfoAlert title="Reservation Pending" description="Your reservation is pending. Please wait for confirmation." />;
            case 'cancelled':
                return <DangerAlert title="Reservation Cancelled" description="Your reservation has been cancelled." />;
            default:
                return null;
        }
    }, [reservation.status]);

    const openingTime = militaryTimeToAmPmTime(reservation.facility.openingTime);
    const closingTime = militaryTimeToAmPmTime(reservation.facility.closingTime);

    return (
        <DefaultPageLayout title="Reservation">
            <Stack gap={6}>
                {AlertRender}
                <ReservationDetails
                    courtPhotos={reservation.court.photos}
                    facilityName={reservation.facility.name}
                    courtName={reservation.court.name}
                    city={reservation.facility.city}
                    address={reservation.facility.address}
                    reservationDate={reservation.reservationDate}
                    reservedSlots={reservation.slots}
                    courtSlots={reservation.court.slots}
                    covered={reservation.court.covered}
                />
                <FacilityReservationInfoCard
                    name={reservation.facility.name}
                    email={reservation.facility.email}
                    phone={reservation.facility.phone}
                    city={reservation.facility.city}
                    address={reservation.facility.address}
                    operatingHours={`${openingTime} - ${closingTime}`}
                />
            </Stack>
        </DefaultPageLayout>
    );
}

export default ReservationPage;
