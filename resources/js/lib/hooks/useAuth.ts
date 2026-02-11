import { usePage } from '@inertiajs/react';

const useAuth = () => {
    const { props } = usePage();

    return {
        isLoggedIn: props.auth !== null,
    };
};

export default useAuth;
