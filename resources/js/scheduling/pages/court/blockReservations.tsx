import { Button, Flex} from '@chakra-ui/react';
import CourtBlockReservationSection from '../../components/court/CourtBlockReservationSection';
import SchedulingLayout from '../../layouts/SchedulingLayout';
import type CourtBlockReservation from '../../models/CourtBlockReservation';
import type SchedulingPageProps from '../../types/SchedulingPageProps';
import { LuPlus } from 'react-icons/lu';
import { Link } from '@inertiajs/react';

interface BlockReservationsPageProps extends SchedulingPageProps {
    courts: CourtBlockReservation[];
}

function BlockReservationsPage({ courts }: BlockReservationsPageProps) {
    return (
        <SchedulingLayout title="Block reservations">
            <Flex justify="space-between" align="center">
                <Link>
                    <Button colorPalette="blue" size="sm">
                        <LuPlus />
                        Create Block Booking
                    </Button>
                </Link>
            </Flex>
            {courts.map((court) => (
                <CourtBlockReservationSection id={court.id} name={court.name} blockReservations={court.blockReservations} />
            ))}
        </SchedulingLayout>
    );
}

export default BlockReservationsPage;
