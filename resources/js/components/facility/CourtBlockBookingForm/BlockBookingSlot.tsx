import { Badge, CheckboxCard, Field, type CheckboxCardCheckedChangeDetails } from '@chakra-ui/react';
import { type SetDataAction } from '@inertiajs/react';
import militaryTimeToAmPmTime from '../../../helpers/militaryTimeToAmPmTime';

interface BlockBookingSlotProps {
    slots: string[];
    setSlots: SetDataAction<{ slots: string[] }>;
    startTime: string;
    endTime: string;
    disabled?: boolean;
    name: string | null;
}

function BlockBookingSlot({ slots, setSlots, startTime, endTime, disabled, name }: BlockBookingSlotProps) {
    const value = `${startTime}-${endTime}`;
    const isChecked = slots.includes(value);

    const handleCheckedChange = (details: CheckboxCardCheckedChangeDetails) => {
        if (details.checked) {
            const normalizedSlots = [...slots, value];
            console.log('🚀 ~ handleCheckedChange ~ normalizedSlots:', normalizedSlots);
            setSlots('slots', normalizedSlots);
        } else {
            const normalizedSlots = slots.filter((slot) => slot !== value);
            console.log('🚀 ~ unchecked ~ normalizedSlots:', normalizedSlots);
            setSlots('slots', normalizedSlots);
        }
    };

    return (
        <Field.Root width="full">
            <CheckboxCard.Root
                key={value}
                value={value}
                disabled={disabled}
                colorPalette="green"
                variant="solid"
                name="slots[]"
                checked={isChecked}
                onCheckedChange={handleCheckedChange}
                width="full"
                {...(disabled && { pointerEvents: 'none', backgroundColor: 'red.200' })}
            >
                <CheckboxCard.HiddenInput value={value} />
                <CheckboxCard.Control>
                    <CheckboxCard.Content>
                        <CheckboxCard.Label>{`${militaryTimeToAmPmTime(startTime)} - ${militaryTimeToAmPmTime(endTime)}`}</CheckboxCard.Label>
                    </CheckboxCard.Content>
                </CheckboxCard.Control>
                <CheckboxCard.Addon>
                    {!disabled ? <Badge colorPalette="green">Available</Badge> : <Badge colorPalette="orange">{name}</Badge>}
                </CheckboxCard.Addon>
            </CheckboxCard.Root>
        </Field.Root>
    );
}

export default BlockBookingSlot;
