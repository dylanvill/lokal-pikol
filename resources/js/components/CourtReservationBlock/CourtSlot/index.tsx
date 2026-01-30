import { Badge } from '@chakra-ui/react';
import type { CourtSlotState } from './types';
import useCourtSlotIcon from './useCourtSlotIcon';
import useCourtSlotStyle from './useCourtSlotStyle';

export interface CourtSlotProps {
    id: number;
    onClick: (id: number, state: CourtSlotState) => void;
    state: CourtSlotState;
    label: string;
}

function CourtSlot({ id, onClick, state, label }: CourtSlotProps) {
    const style = useCourtSlotStyle(state);
    const Icon = useCourtSlotIcon(state);

    return (
        <Badge
            {...style}
            size="lg"
            onClick={state === 'reserved' ? undefined : () => onClick(id, state)}
            _hover={{ cursor: state === 'reserved' ? 'default' : 'pointer' }}
        >
            <Icon />
            {label}
        </Badge>
    );
}

export default CourtSlot;
