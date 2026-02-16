import { Button, HStack } from '@chakra-ui/react';
import { LuCheck } from 'react-icons/lu';
import type ReservationStatus from '../../../../models/customer/reservation/ReservationStatus';
import type Photo from '../../../../models/shared/Photo';
import { Tooltip } from '../../../ui/Tooltip';
import CancelCampaignAction from './CancelCampaignAction';

interface ReservationActionsProps {
    id: string;
    status: ReservationStatus;
    paymentReceipt: Photo | null;
}

function ReservationActions({ id, status, paymentReceipt }: ReservationActionsProps) {
    const isStatusCancellable = status === 'pending' || status === 'confirmed';

    return (
        <HStack alignItems="flex-end" justifyContent="flex-end">
            {status === 'pending' ||
                (status === 'on hold' && (
                    <Tooltip content={!paymentReceipt ? 'Payment receipt required to confirm reservation' : ''}>
                        <Button colorPalette="green" disabled={!paymentReceipt}>
                            Confirm <LuCheck />
                        </Button>
                    </Tooltip>
                ))}
            {isStatusCancellable && <CancelCampaignAction id={id} />}
        </HStack>
    );
}

export default ReservationActions;
