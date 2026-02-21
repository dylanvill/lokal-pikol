import { type InertiaFormProps } from '@inertiajs/react';
import { createContext } from 'react';

const CreateCourtFormContext = createContext<
    InertiaFormProps<{
        name: string;
        type: string;
        photos: File[];
        startTime: string[];
        endTime: string[];
        rate: string[];
    }>
>(
    {} as InertiaFormProps<{
        name: string;
        type: string;
        photos: File[];
        startTime: string[];
        endTime: string[];
        rate: string[];
    }>,
);

export default CreateCourtFormContext;
