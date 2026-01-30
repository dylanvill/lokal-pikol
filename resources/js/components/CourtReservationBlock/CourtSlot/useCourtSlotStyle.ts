import type { BadgeProps } from '@chakra-ui/react';
import { useMemo } from 'react';
import type { CourtSlotState } from './types';

export type SlotStyle = Pick<BadgeProps, 'colorPalette' | 'variant'>;

const paletteParser = (state: CourtSlotState): SlotStyle['colorPalette'] => {
    switch (state) {
        case 'available':
        case 'selected':
            return 'green';
        default:
            return 'red';
    }
};

const variantParser = (state: CourtSlotState): SlotStyle['variant'] => {
    switch (state) {
        case 'selected':
            return 'solid';
        default:
            return 'subtle';
    }
};

const useCourtSlotStyle = (state: CourtSlotState): SlotStyle => {
    const style = useMemo((): SlotStyle => {
        return { colorPalette: paletteParser(state), variant: variantParser(state) };
    }, [state]);

    return style;
};

export default useCourtSlotStyle;
