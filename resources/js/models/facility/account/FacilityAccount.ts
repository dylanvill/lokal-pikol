import type Photo from '../../shared/Photo';

interface FacilityAccount {
    id: string;
    name: string;
    description: string;
    address: string;
    city: string;
    email: string;
    phone: string;
    googleMapsUrl: string;
    profilePhoto: Photo;
    coverPhoto: Photo;
    openingTime: string;
    closingTime: string;
    paymentQrCode: Photo;
}

export default FacilityAccount;
