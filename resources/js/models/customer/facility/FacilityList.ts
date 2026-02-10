import type Photo from '../../shared/Photo';

interface FacilityList {
    id: string;
    name: string;
    courtTypes: string;
    coverPhoto: Photo | null;
    profilePhoto: Photo | null;
    openingTime: string;
    closingTime: string;
    availableSlots: string[];
    city: string;
    address: string;
    numberOfCourts: number;
}

export default FacilityList;
