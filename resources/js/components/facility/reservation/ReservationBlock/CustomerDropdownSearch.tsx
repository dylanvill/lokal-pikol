import { Combobox, HStack, Portal, Span, Spinner, Text, useListCollection } from '@chakra-ui/react';
import { router } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import type CustomerSearchItem from '../../../../models/facility/reservation/CustomerSearchItem';

interface UserDropdownSearchProps {
    customers: CustomerSearchItem[];
    form: any; // Replace with the actual type of your form if available
}

function CustomerDropdownSearch({ customers, form }: UserDropdownSearchProps) {
    const [loading, setLoading] = useState(false);

    const { collection, set } = useListCollection<CustomerSearchItem>({
        initialItems: [],
        itemToString: (item) => item.name,
        itemToValue: (item) => item.name,
    });

    const handleInputChanged = (value: string) => {
        router.get(
            '/facility/reservations/create',
            { search: value },
            {
                preserveState: true,
                replace: true,
                preserveUrl: true,
                preserveScroll: true,
                onStart: () => setLoading(true),
                onFinish: () => setLoading(false),
            },
        );
    };

    useEffect(() => {
        set(customers);
        return () => {
            set([]);
        };
    }, [customers]);

    const debouncedHandleInputChanged = useCallback(debounce(handleInputChanged, 500), []);

    // Simple debounce function
    function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
        let timeoutId: NodeJS.Timeout;
        return ((...args: Parameters<T>) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        }) as T;
    }

    const handleValueChange = (value: any) => {
        form.setData('customer', value.items[0].id);
    };

    return (
        <Combobox.Root
            collection={collection}
            placeholder="Example: C-3PO"
            onValueChange={(e) => handleValueChange(e)}
            onInputValueChange={(e) => debouncedHandleInputChanged(e.inputValue)}
            positioning={{ sameWidth: false, placement: 'bottom-start' }}
            value={[form.data.customer?.id]}
            multiple={false}
            invalid={!!form.errors.customer}
            required
        >
            <Combobox.Label>Search customer</Combobox.Label>

            <Combobox.Control>
                <Combobox.Input placeholder="Type to search" />
                <Combobox.IndicatorGroup>
                    <Combobox.ClearTrigger />
                    <Combobox.Trigger />
                </Combobox.IndicatorGroup>
            </Combobox.Control>
            {form.errors.customer && (
                <Text color="red" fontSize="xs">
                    {form.errors.customer}
                </Text>
            )}

            <Portal>
                <Combobox.Positioner>
                    <Combobox.Content minW="sm">
                        {loading ? (
                            <HStack p="2">
                                <Spinner size="xs" borderWidth="1px" />
                                <Span>Searching customers...</Span>
                            </HStack>
                        ) : null}
                        {collection.items?.map((character) => (
                            <Combobox.Item key={character.id} item={character}>
                                <HStack justify="space-between" textStyle="sm">
                                    <Span fontWeight="medium" truncate>
                                        {character.name}
                                    </Span>
                                    <Span color="fg.muted" truncate>
                                        {character.email}
                                    </Span>
                                </HStack>
                                <Combobox.ItemIndicator />
                            </Combobox.Item>
                        ))}
                    </Combobox.Content>
                </Combobox.Positioner>
            </Portal>
        </Combobox.Root>
    );
}

export default CustomerDropdownSearch;
