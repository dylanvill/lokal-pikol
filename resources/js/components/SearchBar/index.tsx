import { Box, Button, Field, Grid } from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';
import AppFormInput from '../app/AppFormInput';
import AppFormLabel from '../app/AppFormLabel';
import AppSelect from '../app/AppSelect';

function SearchBar() {
    return (
        <Box bg="white" borderRadius={16} borderColor="gray.200" p={{ base: 4, md: 4 }} shadow="sm">
            <Grid gap={4} alignItems="flex-end" gridTemplateColumns={{ base: '1fr 1fr', md: '1fr 1fr 1fr 1fr auto' }}>
                <Field.Root>
                    <AppFormLabel>City</AppFormLabel>
                    <AppSelect>
                        <option value="1">Dumaguete</option>
                        <option value="2">Valencia</option>
                        <option value="3">Bacong</option>
                    </AppSelect>
                </Field.Root>
                <Field.Root>
                    <AppFormLabel>Date</AppFormLabel>
                    <AppFormInput type="date" />
                </Field.Root>
                <Field.Root>
                    <AppFormLabel>Start Time</AppFormLabel>
                    <AppFormInput type="time" />
                </Field.Root>
                <Field.Root>
                    <AppFormLabel>End Time</AppFormLabel>
                    <AppFormInput type="time" />
                </Field.Root>
                <Button
                    gridColumn={{
                        base: '2/2',
                        lg: 'auto',
                    }}
                >
                    <LuSearch />
                    Search
                </Button>
            </Grid>
        </Box>
    );
}

export default SearchBar;
