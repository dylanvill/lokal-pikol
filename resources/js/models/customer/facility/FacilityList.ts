import type CourtSlot from '../../shared/CourtSlot';
import type Photo from '../../shared/Photo';

interface FacilityList {
    id: string;
    name: string;
    courtType: "Covered" | "Outdoor" | "Covered & Outdoor";
    coverPhoto: Photo | null;
    profilePhoto: Photo | null;
    openingTime: string;
    closingTime: string;
    availableSlots: CourtSlot[];
    city: string;
    address: string;
    numberOfCourts: number;
}

export default FacilityList;
