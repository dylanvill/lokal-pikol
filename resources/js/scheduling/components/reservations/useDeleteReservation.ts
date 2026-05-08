import { useForm } from '@inertiajs/react';

function useDeleteReservation(onSuccess: () => void) {
    const { delete: submit, processing } = useForm({});

    const handleDelete = (url: string) => {
        submit(url, { onSuccess });
    };

    return { handleDelete, processing };
}

export default useDeleteReservation;
