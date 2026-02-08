import { Box, Button, Field, Grid, Input, NativeSelect } from '@chakra-ui/react';
import { Form } from '@inertiajs/react';
import dayjs from 'dayjs';
import { LuSearch } from 'react-icons/lu';

function SearchBar() {
    const currentDate = dayjs().format('YYYY-MM-DD');
    const nextHour = dayjs().add(1, 'hour').format('HH:00');
    const endHour = dayjs().add(3, 'hour').format('HH:00');

    return (
        <Box bg="white" borderRadius={16} borderColor="gray.200" p={{ base: 4, md: 4 }} shadow="sm">
            <Form method="get" action="/search">
                <Grid gap={4} alignItems="flex-end" gridTemplateColumns={{ base: '1fr 1fr', md: '1fr 1fr 1fr 1fr auto' }}>
                    <Field.Root>
                        <Field.Label>City</Field.Label>
                        <NativeSelect.Root>
                            <NativeSelect.Field defaultValue="Dumaguete" name="city">
                                <option value="Dumaguete">Dumaguete</option>
                                <option value="Sibulan">Sibulan</option>
                                <option value="Valencia">Valencia</option>
                                <option value="Bacong">Bacong</option>
                            </NativeSelect.Field>
                            <NativeSelect.Indicator />
                        </NativeSelect.Root>
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Date</Field.Label>
                        <Input type="date" name="date" defaultValue={currentDate} />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Start Time</Field.Label>
                        <Input type="time" name="startTime" defaultValue={nextHour} />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>End Time</Field.Label>
                        <Input type="time" name="endTime" defaultValue={endHour} />
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
            </Form>
        </Box>
    );
}

export default SearchBar;
