// Type equivalent for App\Http\Directory\Resources\ListingResource
import type Photo from '../../shared/models/Photo';
import type FacilityCourtType from './FacilityCourtType';
import type SocialLink from './SocialLink';

interface ListingItem {
    id: string;
    name: string;
    profilePhoto: Photo;
    coverPhoto: Photo;
    courtType: FacilityCourtType;
    numberOfCourts: number;
    email: string | null;
    phone: string | null;
    address: string;
    city: string;
    googleMapsUrl: string | null;
    bookingUrl: string | null;
    openingTime: string | null;
    closingTime: string | null;
    socialLinks: SocialLink[];
}

export default ListingItem;
