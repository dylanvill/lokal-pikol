import { CheckboxCard, CheckboxGroup, Field, Fieldset, Icon, SimpleGrid, useStepsContext } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { LuCloudMoon, LuCloudSun, LuMoonStar, LuSun } from 'react-icons/lu';
import { z } from 'zod';
import CtaButtonContainer from './CtaButtonContainer';
import NextButton from './NextButton';
import PreviousButton from './PreviousButton';
import StepContentContainer from './StepContentContainer';

const items = [
    { value: '00:00', title: '12:00 AM', icon: <LuCloudMoon /> },
    { value: '01:00', title: '1:00 AM', icon: <LuCloudMoon /> },
    { value: '02:00', title: '2:00 AM', icon: <LuCloudMoon /> },
    { value: '03:00', title: '3:00 AM', icon: <LuCloudMoon /> },
    { value: '04:00', title: '4:00 AM', icon: <LuCloudMoon /> },
    { value: '05:00', title: '5:00 AM', icon: <LuCloudMoon /> },
    { value: '06:00', title: '6:00 AM', icon: <LuCloudSun /> },
    { value: '07:00', title: '7:00 AM', icon: <LuCloudSun /> },
    { value: '08:00', title: '8:00 AM', icon: <LuCloudSun /> },
    { value: '09:00', title: '9:00 AM', icon: <LuCloudSun /> },
    { value: '10:00', title: '10:00 AM', icon: <LuCloudSun /> },
    { value: '11:00', title: '11:00 AM', icon: <LuSun /> },
    { value: '12:00', title: '12:00 PM', icon: <LuSun /> },
    { value: '13:00', title: '1:00 PM', icon: <LuSun /> },
    { value: '14:00', title: '2:00 PM', icon: <LuSun /> },
    { value: '15:00', title: '3:00 PM', icon: <LuSun /> },
    { value: '16:00', title: '4:00 PM', icon: <LuSun /> },
    { value: '17:00', title: '5:00 PM', icon: <LuSun /> },
    { value: '18:00', title: '6:00 PM', icon: <LuMoonStar /> },
    { value: '19:00', title: '7:00 PM', icon: <LuMoonStar /> },
    { value: '20:00', title: '8:00 PM', icon: <LuMoonStar /> },
    { value: '21:00', title: '9:00 PM', icon: <LuMoonStar /> },
    { value: '22:00', title: '10:00 PM', icon: <LuMoonStar /> },
    { value: '23:00', title: '11:00 PM', icon: <LuMoonStar /> },
];

const timeSchema = z.object({
    timeSlots: z
        .array(z.string())
        .min(1, 'Please select at least one time slot')
        .refine((slots) => slots.every((slot) => items.some((item) => item.value === slot)), 'Invalid time slot selected'),
});

export type TimeFormData = z.infer<typeof timeSchema>;

export interface TimeStepContentProps {
    onTimeSlotsSubmitted: (slots: string[]) => void;
}

function TimeStepContent({ onTimeSlotsSubmitted }: TimeStepContentProps) {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<TimeFormData>({
        resolver: zodResolver(timeSchema),
        defaultValues: {
            timeSlots: [],
        },
    });

    const { goToNextStep } = useStepsContext();

    const onSubmit = (data: TimeFormData) => {
        onTimeSlotsSubmitted(data.timeSlots);
        goToNextStep();
    };

    return (
        <StepContentContainer
            index={2}
            title="Available Time Slots"
            description="Select the time slots when your court will be available for bookings."
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Fieldset.Root invalid={!!errors.timeSlots}>
                    <Controller
                        name="timeSlots"
                        control={control}
                        render={({ field }) => (
                            <CheckboxGroup value={field.value} onValueChange={field.onChange}>
                                <SimpleGrid columns={4} gap={4}>
                                    {items.map((item) => (
                                        <CheckboxCard.Root key={item.value} value={item.value}>
                                            <CheckboxCard.HiddenInput />
                                            <CheckboxCard.Control>
                                                <CheckboxCard.Label display="flex" flexDirection="column">
                                                    <Icon fontSize="2xl" color="fg.subtle">
                                                        {item.icon}
                                                    </Icon>
                                                    {item.title}
                                                </CheckboxCard.Label>
                                            </CheckboxCard.Control>
                                        </CheckboxCard.Root>
                                    ))}
                                </SimpleGrid>
                            </CheckboxGroup>
                        )}
                    />
                    {errors.timeSlots && <Field.ErrorText>{errors.timeSlots.message}</Field.ErrorText>}
                </Fieldset.Root>
                <CtaButtonContainer renderPrevious={<PreviousButton />} renderNext={<NextButton type="submit" disabled={!isValid} />} />
            </form>
        </StepContentContainer>
    );
}

export default TimeStepContent;
