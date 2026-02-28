import type Photo from '../../shared/Photo';

interface Facility {
    id: string;
    name: string;
    address: string;
    description: string;
    city: string;
    email: string;
    phone: string;
    googleMapsUrl: string;
    openingTime: string;
    closingTime: string;
    profilePhoto: Photo;
    coverPhoto: Photo;
    paymentQrCode: Photo;
}

export default Facility;
