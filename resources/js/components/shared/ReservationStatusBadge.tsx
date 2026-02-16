import { Badge } from '@chakra-ui/react';

import statusColorParser from '../../helpers/statusColorParser';
import type ReservationStatus from '../../models/customer/reservation/ReservationStatus'

export interface StatusBadgeProps {
    status: ReservationStatus;
    size?: 'xs' | 'sm' | 'md' | 'lg';
}

function ReservationStatusBadge({ status, size }: StatusBadgeProps) {
    const colorPalette = statusColorParser(status);

    return (
        <Badge size={size || 'sm'} colorPalette={colorPalette}>
            {status.toUpperCase()}
        </Badge>
    );
}

export default ReservationStatusBadge;
