import { Box, Button, Separator } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import CreateCourtFormContext from './context';
import DetailsStepContent from './DetailsStepContent';
import PhotosStepContent from './PhotosStepContent';
import TimeStepContent from './TimeStepContent';

function CreateCourtForm() {
    const form = useForm({
        name: '',
        type: '',
        photos: [] as File[],
        startTime: [] as string[],
        endTime: [] as string[],
        rate: [] as string[],
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/facility/courts/create');
    };

    return (
        <Box colorPalette="blue" backgroundColor="white" p={8} borderRadius={12} shadow="md">
            <CreateCourtFormContext.Provider value={form}>
                <form onSubmit={onSubmit}>
                    <Box gap={8} display="flex" flexDirection="column">
                        <DetailsStepContent />
                        <Separator />
                        <PhotosStepContent />
                        <Separator />
                        <TimeStepContent />
                        <Button type="submit" colorScheme="blue" mt={4} disabled={form.processing} loading={form.processing}>
                            Create Court
                        </Button>
                    </Box>
                </form>
            </CreateCourtFormContext.Provider>
        </Box>
    );
}

export default CreateCourtForm;
