import type Photo from '../../shared/Photo';

interface Facility {
    id: string;
    name: string;
    address: string;
    city: string;
    email: string;
    phone: string;
    googleMapsUrl: string;
    profilePhoto: Photo;
}

export default Facility;
