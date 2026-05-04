import { HStack } from '@chakra-ui/react';
import { usePage } from '@inertiajs/react';
import CreateBlockReservationModal from '../../components/reservation/CreateBlockReservationModal';
import SchedulingLayout from '../../layouts/SchedulingLayout';
import type Court from '../../models/Court';
import type SchedulingPageProps from '../../types/SchedulingPageProps';

interface BlockReservationsPageProps extends SchedulingPageProps {
    courts: Court[];
}

function BlockReservationsPage() {
    const { courts } = usePage<BlockReservationsPageProps>().props;

    return (
        <SchedulingLayout title="Block reservations">
            <HStack justify="flex-end">
                <CreateBlockReservationModal courts={courts} />
            </HStack>
        </SchedulingLayout>
    );
}

export default BlockReservationsPage;
