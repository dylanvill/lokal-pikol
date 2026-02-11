import { Badge } from '@chakra-ui/react';
import { useState } from 'react';
import useCourtSlotIcon from './useCourtSlotIcon';
import useCourtSlotStyle from './useCourtSlotStyle';

export interface CourtSlotProps {
    courtId: string;
    label: string;
}

function CourtSlotSection({ courtId, label, onSlotSelected, onSlotDeselected }: CourtSlotProps) {
    const [internalState, setInternalState] = useState('available');

    const style = useCourtSlotStyle(internalState);
    const Icon = useCourtSlotIcon(internalState);

    const handleClicked = (id: number) => {
        if (internalState === 'available') {
            setInternalState('selected');
        } else if (internalState === 'selected') {
            setInternalState('available');
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

export default CourtSlotSection;
