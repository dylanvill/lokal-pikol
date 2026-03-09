import { Combobox, Field, Portal, useFilter, useListCollection } from '@chakra-ui/react';
import { type useForm } from '@inertiajs/react';
import React from 'react';

const cities = [
    {
        label: 'Dumaguete',
        value: 'Dumaguete',
    },
    {
        label: 'Sibulan',
        value: 'Sibulan',
    },
    {
        label: 'Tanjay',
        value: 'Tanjay',
    },
    {
        label: 'Bais',
        value: 'Bais',
    },
    {
        label: 'Zamboanguita',
        value: 'Zamboanguita',
    },
    {
        label: 'Amlan',
        value: 'Amlan',
    },
    {
        label: 'Ayungon',
        value: 'Ayungon',
    },
    {
        label: 'Bacong',
        value: 'Bacong',
    },
    {
        label: 'Bindoy',
        value: 'Bindoy',
    },
    {
        label: 'Canlaon',
        value: 'Canlaon',
    },
    {
        label: 'Dauin',
        value: 'Dauin',
    },
    {
        label: 'Guihulngan',
        value: 'Guihulngan',
    },
    {
        label: 'Jimalalud',
        value: 'Jimalalud',
    },
    {
        label: 'La Libertad',
        value: 'La Libertad',
    },
    {
        label: 'Mabinay',
        value: 'Mabinay',
    },
    {
        label: 'Manjuyod',
        value: 'Manjuyod',
    },
    {
        label: 'Pamplona',
        value: 'Pamplona',
    },
    {
        label: 'San Jose',
        value: 'San Jose',
    },
    {
        label: 'Santa Catalina',
        value: 'Santa Catalina',
    },
    {
        label: 'Siaton',
        value: 'Siaton',
    },
    {
        label: 'Tayasan',
        value: 'Tayasan',
    },
    {
        label: 'Valencia',
        value: 'Valencia',
    },
    {
        label: 'Vallehermoso',
        value: 'Vallehermoso',
    },
];

function CitySection({ form }: { form: ReturnType<typeof useForm> }) {
    const { contains } = useFilter({ sensitivity: 'base' });

    const { collection, filter } = useListCollection({
        initialItems: cities,
        filter: contains,
    });
    return (
        <Combobox.Root
            collection={collection}
            onInputValueChange={(e) => filter(e.inputValue)}
            value={form.data.city ? [form.data.city] : []}
            onValueChange={(e) => form.setData('city', e.value[0] || '')}
            onBlur={() => form.validate('city')}
            invalid={!!form.errors.city}
            required
            disabled={form.processing}
        >
            <Combobox.Label>City</Combobox.Label>
            <Combobox.Control>
                <Combobox.Input placeholder="Type to search" />
                <Combobox.IndicatorGroup>
                    <Combobox.ClearTrigger />
                    <Combobox.Trigger />
                </Combobox.IndicatorGroup>
            </Combobox.Control>
            <Field.Root invalid={!!form.errors.city}>
                <Field.ErrorText>{form.errors.city}</Field.ErrorText>
            </Field.Root>
            <Portal>
                <Combobox.Positioner>
                    <Combobox.Content>
                        <Combobox.Empty>No results found</Combobox.Empty>
                        {collection.items.map((item) => (
                            <Combobox.Item item={item} key={item.value}>
                                {item.label}
                                <Combobox.ItemIndicator />
                            </Combobox.Item>
                        ))}
                    </Combobox.Content>
                </Combobox.Positioner>
            </Portal>
        </Combobox.Root>
    );
}

export default CitySection;
