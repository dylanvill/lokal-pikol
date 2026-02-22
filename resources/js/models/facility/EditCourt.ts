import type CourtPhoto from './CourtPhoto';
import type CourtPricing from './CourtPricing';

interface EditCourt {
    id: string;
    name: string;
    covered: boolean;
    photos: CourtPhoto[];
    courtPricings: CourtPricing[];
}

export default EditCourt;
