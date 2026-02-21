import { Button, HStack } from '@chakra-ui/react';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { LuCheck } from 'react-icons/lu';
import type ReservationStatus from '../../../../models/customer/reservation/ReservationStatus';
import type Photo from '../../../../models/shared/Photo';
import { Tooltip } from '../../../ui/Tooltip';
import CancelReservationAction from './CancelReservationAction';

interface ReservationActionsProps {
    id: string;
    status: ReservationStatus;
    paymentReceipt: Photo | null;
}

function ReservationActions({ id, status, paymentReceipt }: ReservationActionsProps) {
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
                <Tooltip content={!paymentReceipt ? 'Payment receipt required to confirm reservation' : ''}>
                    <Button colorPalette="green" disabled={!paymentReceipt || loading} onClick={handleConfirmed} loading={loading}>
                        Confirm <LuCheck />
                    </Button>
                </Tooltip>
            ) : null}
            {isStatusCancellable && <CancelReservationAction id={id} />}
        </HStack>
    );
}

export default ReservationActions;
