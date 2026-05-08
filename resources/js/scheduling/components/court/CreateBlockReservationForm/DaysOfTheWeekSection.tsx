import { CheckboxCard, CheckboxGroup, Fieldset, SimpleGrid } from '@chakra-ui/react';
import { memo } from 'react';
import { type CreateBlockReservationFormInterface, type DayOfTheWeek } from './types';

const DAYS: DayOfTheWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export interface DaysOfTheWeekSectionProps {
    selectedDays: CreateBlockReservationFormInterface['days'];
    onCheckChanged: (checked: boolean, day: DayOfTheWeek) => void;
}

function DaysOfTheWeekSection({ selectedDays, onCheckChanged }: DaysOfTheWeekSectionProps) {
    console.log("Day of the week section rendering");
    return (
        <Fieldset.Root>
            <CheckboxGroup>
                <Fieldset.Legend>Day of the week</Fieldset.Legend>
                <SimpleGrid columns={3} gap={4} width="full">
                    {DAYS.map((day) => (
                        <CheckboxCard.Root
                            key={day}
                            value={day}
                            checked={selectedDays.includes(day)}
                            onCheckedChange={(details) => onCheckChanged(details.checked as boolean, day)}
                            size="sm"
                            colorPalette="blue"
                            variant="solid"
                        >
                            <CheckboxCard.HiddenInput />
                            <CheckboxCard.Control>
                                <CheckboxCard.Label>{day}</CheckboxCard.Label>
                            </CheckboxCard.Control>
                        </CheckboxCard.Root>
                    ))}
                </SimpleGrid>
            </CheckboxGroup>
        </Fieldset.Root>
    );
}

export default memo(DaysOfTheWeekSection);
