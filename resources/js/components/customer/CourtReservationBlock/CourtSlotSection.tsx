import { Badge, Box, CheckboxCard, Field, VStack, type CheckboxCardCheckedChangeDetails } from '@chakra-ui/react';
import { type InertiaFormProps } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import currencyFormatter from '../../../helpers/currencyFormatter';
import militaryTimeToAmPmTime from '../../../helpers/militaryTimeToAmPmTime';

export interface CourtSlotProps {
    courtId: string;
    startTime: string;
    endTime: string;
    price: number;
    isAvailable: boolean;
    form: InertiaFormProps<{ slots: string[] }>;
    date: string;
}

function CourtSlotSection({ courtId, startTime, endTime, price, isAvailable, form, date }: CourtSlotProps) {
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
    const isInThePast = useMemo(() => {
        const time = dayjs(`${date} ${startTime}`);
        return time.isBefore(dayjs());
    }, [date, startTime]);

    const isNotSelectable = !isAvailable || isInThePast;

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
                disabled={isNotSelectable}
                {...(!isAvailable && { pointerEvents: 'none', backgroundColor: 'red.200' })}
            >
                <CheckboxCard.HiddenInput value={`${startTime}-${endTime}`} />
                <CheckboxCard.Control>
                    <CheckboxCard.Content>
                        <CheckboxCard.Label fontSize="md">{`${timeDisplay.startTime} - ${timeDisplay.endTime}`}</CheckboxCard.Label>
                        <VStack alignItems="stretch" width="full">
                            <CheckboxCard.Description fontSize="sm">{formattedPrice}</CheckboxCard.Description>
                            <Box justifyContent="flex-end" display="flex">
                                <Badge alignSelf="flex-end" colorPalette={isAvailable ? 'green' : 'orange'}>
                                    {isAvailable ? 'Available' : 'Unavailable'}
                                </Badge>
                            </Box>
                        </VStack>
                    </CheckboxCard.Content>
                </CheckboxCard.Control>
            </CheckboxCard.Root>
        </Field.Root>
    );
}

export default CourtSlotSection;
