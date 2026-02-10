import { Box, Button, Separator } from '@chakra-ui/react';
import { type FormDataConvertible } from '@inertiajs/core';
import { Form } from '@inertiajs/react';
import DetailsStepContent from './DetailsStepContent';
import PhotosStepContent from './PhotosStepContent';
import TimeStepContent from './TimeStepContent';

function CreateCourtForm() {
    const handleTransform = (data: Record<string, FormDataConvertible>): Record<string, FormDataConvertible> => {
        console.log('🚀 ~ handleTransform ~ data:', data);

        return data
    };
    return (
        <Box colorPalette="blue" backgroundColor="white" p={8} borderRadius={12} shadow="md">
            <Form method="post" action="/facility/courts/create" resetOnSuccess transform={handleTransform}>
                {({ processing }) => (
                    <Box gap={8} display="flex" flexDirection="column">
                        <DetailsStepContent />
                        <Separator />
                        <PhotosStepContent />
                        <Separator />
                        <TimeStepContent />
                        <Button type="submit" colorScheme="blue" mt={4} disabled={processing} loading={processing}>
                            Create Court
                        </Button>
                    </Box>
                )}
            </Form>
        </Box>
    );
}

export default CreateCourtForm;
