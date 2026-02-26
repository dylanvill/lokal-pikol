import { Button, Container, Field, Flex, Input, NativeSelect } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import { LuSearch } from 'react-icons/lu';

function SearchBar() {
    const currentDate = dayjs().format('YYYY-MM-DD');

    const { data, setData, get, processing } = useForm({
        city: '',
        date: currentDate,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        get('/', {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <Container bg="white" borderRadius={16} borderColor="gray.200" p={{ base: 4, md: 4 }} shadow="sm" colorPalette="blue">
            <form onSubmit={handleSubmit}>
                <Flex gap={4} alignItems="flex-end" flexDirection={{ base: 'column', md: 'row' }}>
                    <Field.Root>
                        <Field.Label>City</Field.Label>
                        <NativeSelect.Root>
                            <NativeSelect.Field value={data.city} onChange={(e) => setData('city', e.target.value)} name="city">
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
                        <Input type="date" name="date" value={data.date} min={currentDate} onChange={(e) => setData('date', e.target.value)} />
                    </Field.Root>
                    <Button
                        type="submit"
                        gridColumn={{
                            base: '2/2',
                            lg: 'auto',
                        }}
                        disabled={processing}
                        loading={processing}
                    >
                        <LuSearch />
                        Search
                    </Button>
                </Flex>
            </form>
        </Container>
    );
}

export default SearchBar;
