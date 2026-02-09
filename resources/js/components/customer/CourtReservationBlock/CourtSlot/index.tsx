import { Badge } from '@chakra-ui/react';
import { useState } from 'react';
import type { CourtSlotState } from './types';
import useCourtSlotIcon from './useCourtSlotIcon';
import useCourtSlotStyle from './useCourtSlotStyle';

export interface CourtSlotProps {
    id: number;
    state: CourtSlotState;
    label: string;
    onSlotSelected: (slotId: number) => void;
    onSlotDeselected: (slotId: number) => void;
}

function CourtSlot({ id, state, label, onSlotSelected, onSlotDeselected }: CourtSlotProps) {
    const [internalState, setInternalState] = useState(state);

    const style = useCourtSlotStyle(internalState);
    const Icon = useCourtSlotIcon(internalState);

    const handleClicked = (id: number) => {
        if (internalState === 'available') {
            setInternalState('selected');
            onSlotSelected(id);
        } else if (internalState === 'selected') {
            setInternalState('available');
            onSlotDeselected(id);
        }
    };

    return (
        <Badge
            {...style}
            size="lg"
            onClick={internalState === 'reserved' ? undefined : () => handleClicked(id)}
            _hover={{ cursor: internalState === 'reserved' ? 'default' : 'pointer' }}
            fontFamily="mono"
            fontWeight="bold"
        >
            <Icon />
            {label}
        </Badge>
    );
}

export default CourtSlot;
