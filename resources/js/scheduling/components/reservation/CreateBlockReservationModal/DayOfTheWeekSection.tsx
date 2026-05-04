import { Field, RadioCard, Wrap } from '@chakra-ui/react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface DayOfTheWeekSectionProps {
    value: string;
    onChange: (day: string) => void;
}

function DayOfTheWeekSection({ value, onChange }: DayOfTheWeekSectionProps) {
    return (
        <RadioCard.Root
            value={value}
            onValueChange={(e) => e.value && onChange(e.value)}
            colorPalette="blue"
            size="sm"
        >
            <Field.Root>
                <Field.Label>Day of the week</Field.Label>
                <Wrap gap={2} mt={1}>
                    {DAYS.map((day) => (
                        <RadioCard.Item key={day} value={day}>
                            <RadioCard.ItemHiddenInput />
                            <RadioCard.ItemControl>
                                <RadioCard.ItemText>{day}</RadioCard.ItemText>
                                <RadioCard.ItemIndicator />
                            </RadioCard.ItemControl>
                        </RadioCard.Item>
                    ))}
                </Wrap>
            </Field.Root>
        </RadioCard.Root>
    );
}

export default DayOfTheWeekSection;
