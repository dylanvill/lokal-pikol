import { Field, HStack, RadioGroup, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import AppFormInput from '../../app/AppFormInput';
import AppFormLabel from '../../app/AppFormLabel';
import CtaButtonContainer from './CtaButtonContainer';
import NextButton from './NextButton';
import StepContentContainer from './StepContentContainer';

const items = [
    { label: 'Outdoor', value: 'outdoor' },
    { label: 'Indoor', value: 'indoor' },
];

const detailsSchema = z.object({
    name: z.string().min(1, 'Name is required').min(3, 'Name must be at least 3 characters'),
    type: z.enum(['outdoor', 'indoor']),
});

export type DetailsFormData = z.infer<typeof detailsSchema>;

export interface DetailsStepContentProps {
    onDetailsSubmitted: (data: DetailsFormData) => void;
}

function DetailsStepContent({ onDetailsSubmitted }: DetailsStepContentProps) {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<DetailsFormData>({
        resolver: zodResolver(detailsSchema),
    });

    const onSubmit = (data: DetailsFormData) => {
        onDetailsSubmitted(data);
    };

    return (
        <StepContentContainer key={0} index={0} title="Name and Type">
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap={4}>
                    <Field.Root invalid={!!errors.name}>
                        <AppFormLabel>Name</AppFormLabel>
                        <AppFormInput type="text" {...register('name')} required />
                        {errors.name && <Field.ErrorText>{errors.name.message}</Field.ErrorText>}
                    </Field.Root>
                    <Field.Root invalid={!!errors.type}>
                        <AppFormLabel>Type</AppFormLabel>
                        <Controller
                            name="type"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup.Root
                                    name={field.name}
                                    value={field.value}
                                    required
                                    onValueChange={({ value }) => {
                                        field.onChange(value);
                                    }}
                                >
                                    <HStack gap={4}>
                                        {items.map((item) => (
                                            <RadioGroup.Item key={item.value} value={item.value}>
                                                <RadioGroup.ItemHiddenInput onBlur={field.onBlur} />
                                                <RadioGroup.ItemIndicator />
                                                <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                                            </RadioGroup.Item>
                                        ))}
                                    </HStack>
                                </RadioGroup.Root>
                            )}
                        />
                        {errors.type && <Field.ErrorText>{errors.type.message}</Field.ErrorText>}
                    </Field.Root>
                </VStack>
                <CtaButtonContainer renderNext={<NextButton type="submit" disabled={!isValid} />} />
            </form>
        </StepContentContainer>
    );
}

export default DetailsStepContent;
