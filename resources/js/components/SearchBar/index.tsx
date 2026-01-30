import { Box, Button, Field, Grid } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LuSearch } from 'react-icons/lu';
import { z } from 'zod';
import AppFormInput from '../app/AppFormInput';
import AppFormLabel from '../app/AppFormLabel';
import AppSelect from '../app/AppSelect';

const searchSchema = z.object({
    city: z.string().min(1, 'City is required'),
    date: z.string().min(1, 'Date is required'),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().min(1, 'End time is required'),
});

type SearchFormData = z.infer<typeof searchSchema>;

// Helper functions to get default values
const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

const getNextHourString = () => {
    const now = new Date();
    const nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0);
    return nextHour.toTimeString().slice(0, 5);
};

const getHourAfterNextString = () => {
    const now = new Date();
    const hourAfterNext = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 2, 0);
    return hourAfterNext.toTimeString().slice(0, 5);
};

function SearchBar() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SearchFormData>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            city: '1', // Dumaguete
            date: getTodayString(),
            startTime: getNextHourString(),
            endTime: getHourAfterNextString(),
        },
    });

    const onSubmit = (data: SearchFormData) => {
        console.log('Search data:', data);
        // Handle form submission here
    };

    const todayString = getTodayString();
    const nextHourString = getNextHourString();
    const hourAfterNextString = getHourAfterNextString();

    return (
        <Box bg="white" borderRadius={16} borderColor="gray.200" p={{ base: 4, md: 4 }} shadow="sm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid gap={4} alignItems="flex-end" gridTemplateColumns={{ base: '1fr 1fr', md: '1fr 1fr 1fr 1fr auto' }}>
                    <Field.Root>
                        <AppFormLabel>City</AppFormLabel>
                        <AppSelect {...register('city')}>
                            <option value="1">Dumaguete</option>
                            <option value="2">Valencia</option>
                            <option value="3">Bacong</option>
                        </AppSelect>
                    </Field.Root>
                    <Field.Root>
                        <AppFormLabel>Date</AppFormLabel>
                        <AppFormInput type="date" min={todayString} {...register('date')} />
                    </Field.Root>
                    <Field.Root>
                        <AppFormLabel>Start Time</AppFormLabel>
                        <AppFormInput type="time" min={nextHourString} {...register('startTime')} />
                    </Field.Root>
                    <Field.Root>
                        <AppFormLabel>End Time</AppFormLabel>
                        <AppFormInput type="time" min={hourAfterNextString} {...register('endTime')} />
                    </Field.Root>
                    <Button
                        type="submit"
                        gridColumn={{
                            base: '2/2',
                            lg: 'auto',
                        }}
                    >
                        <LuSearch />
                        Search
                    </Button>
                </Grid>
            </form>
        </Box>
    );
}

export default SearchBar;
