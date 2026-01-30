import { Box, Button, Field, Grid } from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';
import AppFormInput from '../app/AppFormInput';
import AppFormLabel from '../app/AppFormLabel';
import AppSelect from '../app/AppSelect';
import type { SearchFormData } from './useSearchBarForm';
import useSearchBarForm from './useSearchBarForm';

function SearchBar() {
    const { register, handleSubmit } = useSearchBarForm();

    const onSubmit = (data: SearchFormData) => {
        console.log('Search data:', data);
        // Handle form submission here
    };

    return (
        <Box bg="white" borderRadius={16} borderColor="gray.200" p={{ base: 4, md: 4 }} shadow="sm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid gap={4} alignItems="flex-end" gridTemplateColumns={{ base: '1fr 1fr', md: '1fr 1fr 1fr 1fr auto' }}>
                    <Field.Root>
                        <AppFormLabel>City</AppFormLabel>
                        <AppSelect {...register('city')}>
                            <option value="Dumaguete">Dumaguete</option>
                            <option value="Sibulan">Sibulan</option>
                            <option value="Valencia">Valencia</option>
                            <option value="Bacong">Bacong</option>
                        </AppSelect>
                    </Field.Root>
                    <Field.Root>
                        <AppFormLabel>Date</AppFormLabel>
                        <AppFormInput type="date" {...register('date')} />
                    </Field.Root>
                    <Field.Root>
                        <AppFormLabel>Start Time</AppFormLabel>
                        <AppFormInput type="time" {...register('startTime')} />
                    </Field.Root>
                    <Field.Root>
                        <AppFormLabel>End Time</AppFormLabel>
                        <AppFormInput type="time" {...register('endTime')} />
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
