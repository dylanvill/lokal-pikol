import { Button, Field, HStack, Input, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { LuClock, LuMinus, LuPlus } from 'react-icons/lu';
import SectionContainer from './SectionContainer';

interface TimeSlot {
    startTime: string;
    endTime: string;
    rate: string;
}

function TimeStepContent() {
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
                    <Field.Root key={index}>
                        <Field.Label>Time Slot {index + 1}</Field.Label>
                        <HStack>
                            <Input
                                type="time"
                                name="startTime[]"
                                value={slot.startTime}
                                onChange={(e) => updateTimeSlot(index, 'startTime', e.target.value)}
                            />
                            <Input
                                type="time"
                                name="endTime[]"
                                value={slot.endTime}
                                onChange={(e) => updateTimeSlot(index, 'endTime', e.target.value)}
                            />
                            <Input
                                type="number"
                                name="rate[]"
                                placeholder="xxx.xx"
                                value={slot.rate}
                                onChange={(e) => updateTimeSlot(index, 'rate', e.target.value)}
                            />
                            {timeSlots.length > 1 && (
                                <Button variant="ghost" size="sm" onClick={() => removeTimeSlot(index)} colorPalette="red">
                                    <LuMinus />
                                </Button>
                            )}
                        </HStack>
                    </Field.Root>
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
