import { type PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import useAuth from './useAuth';

interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    fullName: string;
}

interface CustomerPageProps extends PageProps {
    auth: {
        customer: Customer | null;
    };
}

const useCustomer = () => {
    const { props } = usePage<CustomerPageProps>();
    const { isLoggedIn } = useAuth();

    return {
        isLoggedIn,
        customer: props.auth?.customer || null,
    };
};

export default useCustomer;
