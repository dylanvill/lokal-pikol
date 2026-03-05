import { Button, HStack } from '@chakra-ui/react';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { LuCheck } from 'react-icons/lu';
import type ReservationStatus from '../../../../models/customer/reservation/ReservationStatus';
import CancelReservationAction from './CancelReservationAction';

interface ReservationActionsProps {
    id: string;
    status: ReservationStatus;
}

function ReservationActions({ id, status }: ReservationActionsProps) {
    const isStatusCancellable = status === 'pending' || status === 'confirmed';

    const [loading, setLoading] = useState(false);

    const handleConfirmed = () => {
        router.post(`/facility/reservations/${id}/confirm`, undefined, {
            onStart: () => setLoading(true),
            onFinish: () => setLoading(false),
        });
    };

    return (
        <HStack alignItems="flex-end" justifyContent="flex-end">
            {status === 'pending' ? (
                <Button colorPalette="green" disabled={loading} onClick={handleConfirmed} loading={loading}>
                    Confirm <LuCheck />
                </Button>
            ) : null}
            {isStatusCancellable && <CancelReservationAction id={id} />}
        </HStack>
    );
}

export default ReservationActions;
