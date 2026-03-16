import { Container, Field, HStack, NativeSelect } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import invoke from '@/actions/App/Http/Directory/Controllers/ListingController';

interface Item {
    value: string | number | null;
    label: string;
}

interface Filters extends PageProps {
    cities: Item[];
    courtTypes: Item[];
    numberOfCourts: Item[];
}

function DirectorySearchBar() {
    const { props } = usePage<Filters>();

    const params = new URLSearchParams(window.location.search);

    const { data, submit, setData } = useForm({
        city: params.get('city') || '',
        courtType: params.get('courtType') || '',
        numberOfCourts: params.get('numberOfCourts') || '',
    });

    useEffect(() => {
        submit(invoke(), {
            method: 'get',
            reset: ['listings'],
            preserveState: true,
        });
    }, [data]);

    return (
        <Container p={4} shadow="2xl" borderRadius={12} backgroundColor="white" flex="1">
            <form action="">
                <HStack alignItems="flex-end" flexWrap={{
                    base: 'wrap',
                    md: 'nowrap',
                }} gap={4}>
                    <Field.Root>
                        <Field.Label>City</Field.Label>
                        <NativeSelect.Root>
                            <NativeSelect.Field value={data.city} onChange={(e) => setData('city', e.currentTarget.value)}>
                                {props.cities.map((city) => (
                                    <option key={city.value ?? ''} value={city.value ?? ''}>
                                        {city.label}
                                    </option>
                                ))}
                            </NativeSelect.Field>
                            <NativeSelect.Indicator />
                        </NativeSelect.Root>
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Court Type</Field.Label>
                        <NativeSelect.Root>
                            <NativeSelect.Field value={data.courtType} onChange={(e) => setData('courtType', e.currentTarget.value)}>
                                {props.courtTypes.map((courtType) => (
                                    <option key={courtType.value ?? ''} value={courtType.value ?? ''}>
                                        {courtType.label}
                                    </option>
                                ))}
                            </NativeSelect.Field>
                            <NativeSelect.Indicator />
                        </NativeSelect.Root>
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Number of Courts</Field.Label>
                        <NativeSelect.Root>
                            <NativeSelect.Field value={data.numberOfCourts} onChange={(e) => setData('numberOfCourts', e.currentTarget.value)}>
                                {props.numberOfCourts.map((number) => (
                                    <option key={number.value ?? ''} value={number.value ?? ''}>
                                        {number.label}
                                    </option>
                                ))}
                            </NativeSelect.Field>
                            <NativeSelect.Indicator />
                        </NativeSelect.Root>
                    </Field.Root>
                </HStack>
            </form>
        </Container>
    );
}

export default DirectorySearchBar;
