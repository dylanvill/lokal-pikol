import type Photo from '../shared/Photo';
import type ListingItemCourtType from './ListingItemCourtType';
import type SocialLink from './SocialLink';

interface ListingItem {
    id: string;
    name: string;
    profilePhoto: Photo;
    coverPhoto: Photo;
    courtType: ListingItemCourtType;
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
