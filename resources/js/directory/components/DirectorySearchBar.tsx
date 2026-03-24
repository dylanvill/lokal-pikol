import { Container, Field, HStack, NativeSelect } from '@chakra-ui/react';
import { type PageProps } from '@inertiajs/core';
import { usePage, router } from '@inertiajs/react';
import invoke from '@/actions/App/Http/Directory/Controllers/ListingController';

interface Item {
    value: string | number | null;
    label: string;
}

interface ListingPageProps extends PageProps {
    cities: Item[];
    courtTypes: Item[];
    numberOfCourts: Item[];
    filters: {
        city: string | null;
        courtType: string | null;
        numberOfCourts: string | null;
    };
}

function DirectorySearchBar() {
    const { props } = usePage<ListingPageProps>();

    const handleFilterChanged = (filterKey: keyof typeof props.filters, value: string) => {
        router.get(
            invoke(),
            {
                ...props.filters,
                [filterKey]: value || null,
            },
            {
                reset: ['listings', 'filters'],
                preserveState: true,
            },
        );
    };

    return (
        <Container p={4} shadow="2xl" borderRadius={12} backgroundColor="white" flex="1">
            <form action="">
                <HStack
                    alignItems="flex-end"
                    flexWrap={{
                        base: 'wrap',
                        md: 'nowrap',
                    }}
                    gap={4}
                >
                    <Field.Root>
                        <Field.Label>City</Field.Label>
                        <NativeSelect.Root>
                            <NativeSelect.Field value={props.filters.city || ''} onChange={(e) => handleFilterChanged('city', e.currentTarget.value)}>
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
                            <NativeSelect.Field
                                value={props.filters.courtType || ''}
                                onChange={(e) => handleFilterChanged('courtType', e.currentTarget.value)}
                            >
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
                            <NativeSelect.Field
                                value={props.filters.numberOfCourts || ''}
                                onChange={(e) => handleFilterChanged('numberOfCourts', e.currentTarget.value)}
                            >
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
