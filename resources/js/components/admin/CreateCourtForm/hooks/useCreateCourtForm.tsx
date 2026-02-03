import{ useState } from 'react';

export interface CreateFormData {
    name: string;
    type: 'outdoor' | 'indoor';
    photos: File[];
    slots: string[];
}

function useCreateCourtForm() {
    const [createFormData, setCreateFormData] = useState<Partial<CreateFormData>>({});

    return {
        createFormData,
        setCreateFormData
    };
}

export default useCreateCourtForm;
