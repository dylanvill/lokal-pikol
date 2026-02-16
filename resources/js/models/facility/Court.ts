import type CourtSlot from '../shared/CourtSlot';
import type CourtPhoto from './CourtPhoto';
import type CourtPricing from './CourtPricing';

interface Court {
    id: string;
    name: string;
    covered: boolean;
    photos: CourtPhoto[];
    courtPricings: CourtPricing[];
    slots: CourtSlot[];
}

export default Court;
