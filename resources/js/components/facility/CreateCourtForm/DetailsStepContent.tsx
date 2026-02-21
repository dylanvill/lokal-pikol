import { Field, HStack, Input, RadioGroup, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { LuFileText } from 'react-icons/lu';
import CreateCourtFormContext from './context';
import SectionContainer from './SectionContainer';

const items = [
    { label: 'Outdoor', value: 'outdoor' },
    { label: 'Indoor', value: 'indoor' },
];

function DetailsStepContent() {
    const form = useContext(CreateCourtFormContext);
    const errors = form!.errors;

    return (
        <SectionContainer
            renderIcon={() => <LuFileText size={24} />}
            title="Name and Type"
            description="Assign your court a name and specify its type for customers to see."
        >
            <VStack gap={4}>
                <Field.Root invalid={!!form.errors.name}>
                    <Field.Label>Name</Field.Label>
                    <Input type="text" name="name" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} />
                    <Field.ErrorText>{form.errors.name}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!form.errors.type}>
                    <Field.Label>Type</Field.Label>
                    <RadioGroup.Root
                        name="type"
                        invalid={!!form.errors.type}
                        value={form.data.type}
                        onValueChange={(value) => form.setData('type', value.value!)}
                    >
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
