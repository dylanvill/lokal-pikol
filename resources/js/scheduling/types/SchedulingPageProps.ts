import { type PageProps } from '@inertiajs/core';
import { type UuidString } from './String';

interface FacilityAdmin {
    id: UuidString;
    email: string;
    firstName: string;
    lastName: string;
}

interface Facility {
    id: UuidString;
    name: string;
    city: string;
}

interface SchedulingPageProps extends PageProps {
    name: string;
    auth: null;
    facilityAdmin: FacilityAdmin;
    facility: Facility;
}

export default SchedulingPageProps;
