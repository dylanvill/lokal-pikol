import { Editable } from '@chakra-ui/react';
import { type useForm } from '@inertiajs/react';
import { LuPencil } from 'react-icons/lu';

function TitleSection({ form }: { form: ReturnType<typeof useForm> }) {
    return (
        <Editable.Root
            value={form.data.name}
            onValueChange={(e) => form.setData('name', e.value)}
            textAlign="start"
            defaultValue="Click to edit"
            marginTop={4}
            marginBottom={12}
            required
            disabled={form.processing}
            placeholder="Facility Name"
        >
            <LuPencil />
            <Editable.Preview fontSize="3xl" width="full" fontWeight="medium" lineHeight={1.25} />
            <Editable.Input fontSize="3xl" width="full" fontWeight="medium" />
        </Editable.Root>
    );
}

export default TitleSection;
