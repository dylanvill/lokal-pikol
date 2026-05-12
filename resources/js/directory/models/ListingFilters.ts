// Type equivalent for App\Http\Directory\Requests\ListingRequest
import type FacilityCourtType from "./FacilityCourtType";

interface ListingFilters {
    city: string | null;
    courtType: FacilityCourtType | null;
    numberOfCourts: number | null;
    sort: 'name' | 'numberOfCourts' | 'popularity' | null;
}

export default ListingFilters;