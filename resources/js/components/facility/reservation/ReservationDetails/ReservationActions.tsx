import { Button, HStack } from '@chakra-ui/react';
import React from 'react';
import { LuCheck, LuX } from 'react-icons/lu';
import type ReservationStatus from '../../../../models/customer/reservation/ReservationStatus';
import type Photo from '../../../../models/shared/Photo';
import { Tooltip } from '../../../ui/Tooltip';

interface ReservationActionsProps {
    status: ReservationStatus;
    paymentReceipt: Photo | null;
}

function ReservationActions({ status, paymentReceipt }: ReservationActionsProps) {
    const isStatusCancellable = status === 'pending' || status === 'confirmed';

    return (
        <HStack alignItems="flex-end" justifyContent="flex-end">
            {status === 'pending' || status === "on hold" && (
                <Tooltip content={!paymentReceipt ? 'Payment receipt required to confirm reservation' : ''}>
                    <Button colorPalette="green" disabled={!paymentReceipt}>
                        Confirm <LuCheck />
                    </Button>
                </Tooltip>
            )}
            {isStatusCancellable && (
                <Button colorPalette="red">
                    Cancel <LuX />
                </Button>
            )}
        </HStack>
    );
}

export default ReservationActions;
