import { Box, Button, Separator, Steps, VStack } from '@chakra-ui/react';
import { Form } from '@inertiajs/react';
import { LuFileText, LuCamera, LuClock, LuEye } from 'react-icons/lu';
import DetailsStepContent from './DetailsStepContent';
import PhotosStepContent from './PhotosStepContent';
import TimeStepContent from './TimeStepContent';

const steps = [
    {
        index: 0,
        icon: <LuFileText />,
        description: 'Name and Type',
    },
    {
        index: 1,
        icon: <LuCamera />,
        description: 'Photos',
    },
    {
        index: 2,
        icon: <LuClock />,
        description: 'Slots',
    },
    {
        index: 3,
        icon: <LuEye />,
        description: 'Review',
    },
];

export interface CreateFormData {
    name: string;
    type: 'outdoor' | 'indoor' | '';
    photos: File[];
    slots: string[];
}

function CreateCourtForm() {
    const handleTransform = (data) => {
        console.log('🚀 ~ handleTransform ~ data:', data);
        return data;
    };
    return (
        <Steps.Root defaultStep={0} colorPalette="blue" backgroundColor="white" p={8} borderRadius={12} shadow="md" count={steps.length} size="sm">
            <Form method="post" action="/admin/courts/create" resetOnSuccess transform={handleTransform}>
                {({ errors }) => (
                    <Box gap={8} display="flex" flexDirection="column">
                        <pre>{JSON.stringify(errors, null, 2)}</pre>
                        <DetailsStepContent />
                        <Separator />
                        <PhotosStepContent />
                        <Separator />
                        <TimeStepContent />
                        <Button type="submit" colorScheme="blue" mt={4}>
                            Create Court
                        </Button>
                    </Box>
                )}
            </Form>
        </Steps.Root>
    );
}

export default CreateCourtForm;
