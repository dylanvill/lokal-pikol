import { Box, Button, Field, Grid, Input, NativeSelect } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import { LuSearch } from 'react-icons/lu';

function SearchBar() {
    const currentDate = dayjs().format('YYYY-MM-DD');
    const nextHour = dayjs().add(1, 'hour').format('HH:00');
    const endHour = dayjs().add(3, 'hour').format('HH:00');

    const form = useForm({
        city: '',
        date: currentDate,
        startTime: nextHour,
        endTime: endHour,
    });

    const minEndTime = form.data.startTime ? dayjs(form.data.startTime, 'HH:mm').add(1, 'hour').format('HH:mm') : nextHour;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.get('/', {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <Box bg="white" borderRadius={16} borderColor="gray.200" p={{ base: 4, md: 4 }} shadow="sm" colorPalette="blue">
            <form onSubmit={handleSubmit}>
                <Grid gap={4} alignItems="flex-end" gridTemplateColumns={{ base: '1fr 1fr', md: '1fr 1fr 1fr 1fr auto' }}>
                    <Field.Root>
                        <Field.Label>City</Field.Label>
                        <NativeSelect.Root>
                            <NativeSelect.Field value={form.data.city} onChange={(e) => form.setData('city', e.target.value)} name="city">
                                <option value="">Anywhere</option>
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
                        <Input type="date" name="date" value={form.data.date} min={currentDate} onChange={(e) => form.setData('date', e.target.value)} />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Start Time</Field.Label>
                        <Input type="time" name="startTime" value={form.data.startTime} min={nextHour} onChange={(e) => form.setData('startTime', e.target.value)} />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>End Time</Field.Label>
                        <Input type="time" name="endTime" value={form.data.endTime} min={minEndTime} onChange={(e) => form.setData('endTime', e.target.value)} />
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
