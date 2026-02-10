import type Photo from '../../shared/Photo';

interface FacilityList {
    id: string;
    name: string;
    coverPhoto: Photo | null;
    profilePhoto: Photo | null;
    address: string;
    numberOfCourts: number;
    courtTypes: string[];
    city: string;
}

export default FacilityList;
