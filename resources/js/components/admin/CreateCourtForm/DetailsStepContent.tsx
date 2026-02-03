import { Field, HStack, RadioGroup, VStack } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import AppFormInput from '../../app/AppFormInput';
import AppFormLabel from '../../app/AppFormLabel';
import StepContentContainer from './StepContentContainer';

const items = [
    { label: 'Outdoor', value: 'outdoor' },
    { label: 'Indoor', value: 'indoor' },
];

function DetailsStepContent() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <StepContentContainer key={0} index={0} title="Name and Type">
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap={4}>
                    <Field.Root>
                        <AppFormLabel>Name</AppFormLabel>
                        <AppFormInput type="name" {...register('name')} />
                    </Field.Root>
                    <Field.Root>
                        <AppFormLabel>Type</AppFormLabel>
                        <RadioGroup.Root defaultValue="1">
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
                    </Field.Root>
                </VStack>
            </form>
        </StepContentContainer>
    );
}

export default DetailsStepContent;
