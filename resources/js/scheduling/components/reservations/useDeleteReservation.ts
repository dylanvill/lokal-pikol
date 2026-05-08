import { useForm } from '@inertiajs/react';
import { toaster } from '../../../shared/components/ui/toaster';

const SUCCESS_MESSAGE_KEY = 'delete-reservation-success';

function useDeleteReservation(onSuccess: () => void) {
    const { delete: submit, processing } = useForm({});

    const handleDelete = (url: string) => {
        submit(url, {
            onSuccess: (page) => {
                const message = page.flash?.[SUCCESS_MESSAGE_KEY];
                if (typeof message === 'string') {
                    toaster.create({ title: message, type: 'info', duration: 5000 });
                }
                onSuccess();
            },
        });
    };

    return { handleDelete, processing };
}

export default useDeleteReservation;
