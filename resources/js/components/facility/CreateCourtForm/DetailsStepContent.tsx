import { Field, HStack, RadioGroup, VStack } from '@chakra-ui/react';
import { useFormContext } from '@inertiajs/react';
import { LuFileText } from 'react-icons/lu';
import AppFormInput from '../../app/AppFormInput';
import AppFormLabel from '../../app/AppFormLabel';
import SectionContainer from './SectionContainer';

const items = [
    { label: 'Outdoor', value: 'outdoor' },
    { label: 'Indoor', value: 'indoor' },
];

function DetailsStepContent() {
    const form = useFormContext();
    const errors = form!.errors;

    return (
        <SectionContainer
            renderIcon={() => <LuFileText size={24} />}
            title="Name and Type"
            description="Assign your court a name and specify its type for customers to see."
        >
            <VStack gap={4}>
                <Field.Root invalid={!!errors.name}>
                    <AppFormLabel>Name</AppFormLabel>
                    <AppFormInput type="text" name="name" />
                    <Field.ErrorText>{errors.type}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.type}>
                    <AppFormLabel>Type</AppFormLabel>
                    <RadioGroup.Root name="type" invalid={!!errors.type}>
                        <HStack gap={4}>
                            {items.map((item) => (
                                <RadioGroup.Item key={item.value} value={item.value}>
                                    <RadioGroup.ItemHiddenInput />
                                    <RadioGroup.ItemIndicator />
                                    <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                                </RadioGroup.Item>
                            ))}
                        </HStack>
                    </RadioGroup.Root>
                    <Field.ErrorText>{errors.type}</Field.ErrorText>
                </Field.Root>
            </VStack>
        </SectionContainer>
    );
}

export default DetailsStepContent;
