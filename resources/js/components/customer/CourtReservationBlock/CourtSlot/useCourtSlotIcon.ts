import { useMemo } from 'react';
import type { IconType } from 'react-icons/lib';
import { LuCheck, LuCircle, LuX } from 'react-icons/lu';
import type { CourtSlotState } from './types';

const useCourtSlotIcon = (state: CourtSlotState): IconType => {
    const Icon = useMemo(() => {
        if (state === 'available') return LuCircle;
        if (state === 'selected') return LuCheck;

        return LuX;
    }, [state]);

    return Icon;
};

export default useCourtSlotIcon;
