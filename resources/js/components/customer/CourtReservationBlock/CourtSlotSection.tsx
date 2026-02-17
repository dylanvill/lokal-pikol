import { Badge, CheckboxCard, Field, Float, type CheckboxCardCheckedChangeDetails } from '@chakra-ui/react';
import { type InertiaFormProps } from '@inertiajs/react';
import { useMemo } from 'react';
import { LuX } from 'react-icons/lu';
import currencyFormatter from '../../../helpers/currencyFormatter';
import militaryTimeToAmPmTime from '../../../helpers/militaryTimeToAmPmTime';

export interface CourtSlotProps {
    courtId: string;
    startTime: string;
    endTime: string;
    price: number;
    isAvailable: boolean;
    form: InertiaFormProps<{ slots: string[] }>;
}

function CourtSlotSection({ courtId, startTime, endTime, price, isAvailable, form }: CourtSlotProps) {
    const timeDisplay = useMemo(() => {
        return {
            startTime: militaryTimeToAmPmTime(startTime),
            endTime: militaryTimeToAmPmTime(endTime),
        };
    }, [startTime, endTime]);

    const formattedPrice = currencyFormatter(price);

    const handleSelectionChanged = (details: CheckboxCardCheckedChangeDetails) => {
        if (details.checked) {
            form.setData('slots', [...form.data.slots, `${startTime}-${endTime}`]);
        } else {
            form.setData(
                'slots',
                form.data.slots.filter((slot) => slot !== `${startTime}-${endTime}`),
            );
        }
    };

    const isChecked = form.data.slots.includes(`${startTime}-${endTime}`);

    return (
        <Field.Root width="full">
            <CheckboxCard.Root
                key={`${courtId}-${startTime}-${endTime}`}
                name="slots[]"
                variant="solid"
                colorPalette="green"
                width="full"
                size="sm"
                checked={isChecked}
                onCheckedChange={handleSelectionChanged}
                disabled={!isAvailable}
                {...(!isAvailable && { pointerEvents: 'none', backgroundColor: 'red.200' })}
            >
                {!isAvailable && (
                    <Float placement="top-start">
                        <Badge colorPalette="red" backgroundColor="red.400" size="xs">
                            <LuX color="white" />
                        </Badge>
                    </Float>
                )}
                <CheckboxCard.HiddenInput value={`${startTime}-${endTime}`} />
                <CheckboxCard.Control>
                    <CheckboxCard.Content>
                        <CheckboxCard.Label fontSize="md">{`${timeDisplay.startTime} - ${timeDisplay.endTime}`}</CheckboxCard.Label>
                        <CheckboxCard.Description fontSize="sm">{formattedPrice}</CheckboxCard.Description>
                    </CheckboxCard.Content>
                </CheckboxCard.Control>
            </CheckboxCard.Root>
        </Field.Root>
    );
}

export default CourtSlotSection;
