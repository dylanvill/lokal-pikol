import { type IconType } from 'react-icons/lib';
import { LuHouse, LuSun, LuCheckCheck } from 'react-icons/lu';
import type ListingItemCourtType from '../../models/directory/ListingItemCourtType';

export const listingItemCourtTypeIconParser = (courtType: ListingItemCourtType): IconType => {
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

export default listingItemCourtTypeIconParser;
