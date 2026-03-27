import { type IconType } from 'react-icons/lib';
import { LuHouse, LuSun, LuCheckCheck } from 'react-icons/lu';
import type FacilityCourtType from '../models/FacilityCourtType';

export const FacilityCourtTypeIconParser = (courtType: FacilityCourtType): IconType => {
    switch (courtType) {
        case 'Outdoor':
            return LuSun;
        case 'Covered':
            return LuHouse;
        case 'Covered and Outdoor':
        default:
            return LuCheckCheck;
    }
};

export default FacilityCourtTypeIconParser;
