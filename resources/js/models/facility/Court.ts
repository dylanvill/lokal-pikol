import type CourtPhoto from './CourtPhoto';
import type CourtPricing from './CourtPricing';

interface Court {
    id: string;
    name: string;
    covered: boolean;
    photos: CourtPhoto[];
    courtPricings: CourtPricing[];
}

export default Court;
