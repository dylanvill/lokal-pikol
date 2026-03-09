import { Field, Heading, RadioCard, SimpleGrid } from '@chakra-ui/react';
import { type useForm } from '@inertiajs/react';

const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function NumberOfCourtsSection({ form }: { form: ReturnType<typeof useForm> }) {
    return (
        <>
            <RadioCard.Root name='numberOfCourts' value={form.data.numberOfCourts} onValueChange={(e) => form.setData('numberOfCourts', e.value)} size="sm" variant="solid" invalid={!!form.errors.numberOfCourts} >
                <RadioCard.Label><span style={{ color: 'red' }}>*</span> Number of courts</RadioCard.Label>
                <Field.Root invalid={!!form.errors.numberOfCourts}>
                    <Field.HelperText marginBottom={2}>Select the total number of pickleball courts available at your facility.</Field.HelperText>
                    <Field.ErrorText>{form.errors.numberOfCourts}</Field.ErrorText>
                </Field.Root>
                <SimpleGrid columns={{ base: 5 }} gap={4}>
                    {options.map((option) => (
                        <RadioCard.Item
                            key={option}
                            value={option.toString()}
                            flex={1}
                            justifyContent="center"
                            alignItems="center"
                            padding={2}
                            borderWidth={1}
                            borderColor="gray.200"
                            borderRadius={8}
                        >
                            <RadioCard.ItemHiddenInput />
                            <RadioCard.ItemControl>
                                <RadioCard.ItemText fontFamily="mono" padding={0}>
                                    <Heading>{option}</Heading>
                                </RadioCard.ItemText>
                            </RadioCard.ItemControl>
                        </RadioCard.Item>
                    ))}
                </SimpleGrid>
            </RadioCard.Root>
            <Field.Root></Field.Root>
        </>
    );
}

export default NumberOfCourtsSection;
