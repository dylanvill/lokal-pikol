import type ListingItemCourtType from "./ListingItemCourtType";

interface ListingFilters {
    city: string | null;
    courtType: ListingItemCourtType | null;
    numberOfCourts: number | null;
}

export default ListingFilters;