import { Field, RadioCard, SimpleGrid } from '@chakra-ui/react';
import { type useForm } from '@inertiajs/react';
import { LuCheckCheck, LuHouse, LuSun } from 'react-icons/lu';

const options = [
    {
        value: 'Covered',
        icon: <LuHouse size={24} />,
    },
    {
        value: 'Outdoor',
        icon: <LuSun size={24} />,
    },
    {
        value: 'Covered and Outdoor',
        icon: <LuCheckCheck size={24} />,
    },
];

function CourtTypesSection({ form }: { form: ReturnType<typeof useForm> }) {
    return (
        <>
            <RadioCard.Root
                name="courtType"
                value={form.data.courtType}
                onValueChange={(e) => form.setData('courtType', e.value)}
                size="sm"
                variant="solid"
                disabled={form.processing}
                invalid={!!form.errors.courtType}
            >
                <RadioCard.Label><span style={{ color: 'red' }}>*</span> Court types</RadioCard.Label>
                <Field.Root>
                    <Field.HelperText marginBottom={2}>
                        Help players find the perfect court setup - specify whether your courts are covered, outdoor, or both
                    </Field.HelperText>
                </Field.Root>
                <SimpleGrid columns={{ base: 3 }} gap={4}>
                    {options.map((option) => (
                        <RadioCard.Item
                            key={option.value}
                            value={option.value}
                            flex={1}
                            justifyContent="center"
                            alignItems="center"
                            borderWidth={1}
                            borderColor="gray.200"
                            borderRadius={8}
                        >
                            <RadioCard.ItemHiddenInput />
                            <RadioCard.ItemControl width="100%" height="100%" alignItems="center">
                                <RadioCard.ItemContent alignItems="center" justifyContent="center" gap={2}>
                                    {option.icon}
                                    <RadioCard.ItemText padding={0} textAlign="center">
                                        {option.value}
                                    </RadioCard.ItemText>
                                </RadioCard.ItemContent>
                            </RadioCard.ItemControl>
                        </RadioCard.Item>
                    ))}
                </SimpleGrid>
            </RadioCard.Root>
            <Field.Root></Field.Root>
        </>
    );
}

export default CourtTypesSection;
