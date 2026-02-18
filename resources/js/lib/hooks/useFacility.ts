import { type PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import useAuth from './useAuth';

interface Facility {
    id: string;
    name: string;
    address: string;
    email: string;
    city: string;
    phone: string;
    googleMapsUrl: string;
    openingTime: string;
    closingTime: string;
}

interface FacilityPageProps extends PageProps {
    auth: {
        facility: Facility;
    };
}

const useFacility = () => {
    const { props } = usePage<FacilityPageProps>();
    const { isLoggedIn } = useAuth();

    return {
        isLoggedIn,
        facility: props.auth.facility,
    };
};

export default useFacility;
