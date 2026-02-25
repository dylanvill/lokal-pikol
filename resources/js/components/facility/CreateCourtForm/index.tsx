import { Box, Button, Flex, Separator } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { LuPlus } from 'react-icons/lu';
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
        form.transform((data) => {
            return {
                ...data,
                endTime: data.endTime.map((time) => time === "00:00" ? "24:00" : time),
            };
        });
        form.post('/facility/courts/create', {
            preserveScroll: true,
        });
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
                        <Flex justifyContent="flex-end">
                            <Button type="submit" colorPalette="blue" size="sm" mt={4} disabled={form.processing} loading={form.processing}>
                                Create Court <LuPlus />
                            </Button>
                        </Flex>
                    </Box>
                </form>
            </CreateCourtFormContext.Provider>
        </Box>
    );
}

export default CreateCourtForm;
