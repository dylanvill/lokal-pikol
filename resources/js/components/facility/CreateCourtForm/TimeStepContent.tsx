import { Button, Field, HStack, Input, VStack } from '@chakra-ui/react';
import { useFormContext } from '@inertiajs/react';
import { useState } from 'react';
import { LuClock, LuMinus, LuPlus } from 'react-icons/lu';
import SectionContainer from './SectionContainer';

interface TimeSlot {
    startTime: string;
    endTime: string;
    rate: string;
}

function TimeStepContent() {
    const form = useFormContext();
    const errors = form!.errors;

    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([{ startTime: '', endTime: '', rate: '' }]);

    const addTimeSlot = () => {
        setTimeSlots([...timeSlots, { startTime: '', endTime: '', rate: '' }]);
    };

    const removeTimeSlot = (index: number) => {
        if (timeSlots.length > 1) {
            setTimeSlots(timeSlots.filter((_, i) => i !== index));
        }
    };

    const updateTimeSlot = (index: number, field: keyof Omit<TimeSlot, 'id'>, value: string) => {
        setTimeSlots(timeSlots.map((slot, i) => (i === index ? { ...slot, [field]: value } : slot)));
    };

    return (
        <SectionContainer
            renderIcon={() => <LuClock size={24} />}
            title="Schedules and Rates"
            description="Set the available time slots and their corresponding rates for the court."
        >
            <VStack gap={4} align="stretch">
                {timeSlots.map((slot, index) => (
                    <HStack alignItems="flex-start">
                        <Field.Root invalid={!!errors[`startTime.${index}`]}>
                            <Field.Label>Start Time</Field.Label>
                            <Input
                                type="time"
                                name="startTime[]"
                                value={slot.startTime}
                                onChange={(e) => updateTimeSlot(index, 'startTime', e.target.value)}
                            />
                            <Field.ErrorText>{errors[`startTime.${index}`]}</Field.ErrorText>
                        </Field.Root>
                        <Field.Root invalid={!!errors[`endTime.${index}`]}>
                            <Field.Label>End Time</Field.Label>
                            <Input
                                type="time"
                                name="endTime[]"
                                value={slot.endTime}
                                onChange={(e) => updateTimeSlot(index, 'endTime', e.target.value)}
                            />
                            <Field.ErrorText>{errors[`endTime.${index}`]}</Field.ErrorText>
                        </Field.Root>
                        <Field.Root invalid={!!errors[`rate.${index}`]}>
                            <Field.Label>Rate</Field.Label>
                            <Input
                                type="number"
                                name="rate[]"
                                placeholder="xxx.xx"
                                value={slot.rate}
                                onChange={(e) => updateTimeSlot(index, 'rate', e.target.value)}
                            />
                            <Field.ErrorText>{errors[`rate.${index}`]}</Field.ErrorText>
                        </Field.Root>
                        {timeSlots.length > 1 && (
                            <Button marginTop={7} variant="ghost" type="button" size="sm" onClick={() => removeTimeSlot(index)} colorPalette="red">
                                <LuMinus />
                            </Button>
                        )}
                    </HStack>
                ))}
                <Button variant="outline" onClick={addTimeSlot} alignSelf="flex-start">
                    <LuPlus />
                    Add Time Slot
                </Button>
            </VStack>
        </SectionContainer>
    );
}

export default TimeStepContent;
