import { Badge, CheckboxCard, Field, Float } from '@chakra-ui/react';
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
}

function CourtSlotSection({ courtId, startTime, endTime, price, isAvailable }: CourtSlotProps) {
    const timeDisplay = useMemo(() => {
        return {
            startTime: militaryTimeToAmPmTime(startTime),
            endTime: militaryTimeToAmPmTime(endTime),
        };
    }, [startTime, endTime]);

    const formattedPrice = currencyFormatter(price);

    return (
        <Field.Root width="full">
            <CheckboxCard.Root
                key={`${courtId}-${startTime}-${endTime}`}
                name="slots[]"
                variant="solid"
                colorPalette="green"
                width="full"
                size="sm"
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
        // <Badge
        //     {...style}
        //     size="lg"
        //     onClick={internalState === 'reserved' ? undefined : () => handleClicked(courtId, startTime, price)}
        //     _hover={{ cursor: internalState === 'reserved' ? 'default' : 'pointer' }}
        //     fontFamily="mono"
        //     fontWeight="bold"
        // >
        //     <Icon />
        //     {startTime} - {endTime}
        // </Badge>
    );
}

export default CourtSlotSection;
