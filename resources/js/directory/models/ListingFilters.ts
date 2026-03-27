// Type equivalent for App\Http\Directory\Requests\ListingRequest
import type FacilityCourtType from "./FacilityCourtType";

interface ListingFilters {
    city: string | null;
    courtType: FacilityCourtType | null;
    numberOfCourts: number | null;
}

export default ListingFilters;