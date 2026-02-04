import { Box, Button, Separator } from '@chakra-ui/react';
import { Form } from '@inertiajs/react';
import DetailsStepContent from './DetailsStepContent';
import PhotosStepContent from './PhotosStepContent';
import TimeStepContent from './TimeStepContent';

function CreateCourtForm() {
    return (
        <Box colorPalette="blue" backgroundColor="white" p={8} borderRadius={12} shadow="md">
            <Form method="post" action="/admin/courts/create" resetOnSuccess>
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
