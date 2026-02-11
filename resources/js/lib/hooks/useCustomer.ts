import { usePage } from '@inertiajs/react';
import useAuth from './useAuth';

const useCustomer = () => {
    const { props } = usePage();
    const { isLoggedIn } = useAuth();

    return {
        isLoggedIn,
        customer: props.auth?.customer || null,
    };
};

export default useCustomer;
